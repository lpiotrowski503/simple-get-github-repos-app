import {
  IReposResponse,
  IRepos,
  IFormData,
} from "../../interfaces/repos.interface";
import { Http } from "../../helpers/http";
import { Event } from "../../helpers/event";
import { Utils } from "../../helpers/utils";
/**
 * Repos Web Custom Component Class
 */
export class Repos extends HTMLElement {
  private _shadowAttached: boolean = false;
  private _formData: IFormData = {
    userName: "",
    updated: "",
    id() {
      return `${this.userName}-${this.updated}`.replace(/\./g, "-");
    },
  };
  /**
   * User repos variable
   */
  private _repos: IRepos[] = [];
  /**
   * Attached element names to the shadow
   */
  private _elements: string[] = [];

  constructor() {
    super();
    /**
     * Custom event listener for stream from data from add user form to create repos element
     */
    Event.on("CREATE USER REPOS", (event: any): void => {
      this._formData = { ...this._formData, ...event };
      this._onGetUserRepos(this._formData.userName);
    });
    /**
     * Custom event listener for show hide repos list
     */
    Event.on("COLLAPSE", (event: any): void => {
      let table = this.shadowRoot?.querySelector(`#article-${event.id}`);
      table?.classList.contains("open")
        ? table.classList.remove("open")
        : table?.classList.add("open");
    });
    /**
     * Custom event listener for remove user repos
     */
    Event.on("REMOVE", (event: any): void => {
      this.shadowRoot?.removeChild(event.element);
      this._elements = this._elements.filter(
        (item: string) => item !== event.id
      );
    });
  }
  /**
   * Method for send request for get user repos
   *
   * @param user
   */
  private _onGetUserRepos(user: string): void {
    Http.get(`https://api.github.com/users/${user}/repos?sort=updated`).then(
      (repos: IReposResponse[]) => {
        if (repos.length) {
          this._prepareReposData(repos);
          this._createUserRepoElement();
        } else {
          Event.emit("MESSENGER", {
            message: `Cannot find "${user}" user`,
          });
        }
      }
    );
  }
  /**
   * Method for filtering response to view requirements
   *
   * @param repos
   */
  private _prepareReposData(repos: IReposResponse[]): void {
    this._repos = Utils.mapResponse(repos, [
      "name",
      "description",
      "updated_at",
      "git_url",
    ]);

    this._repos = this._repos.filter((item: any): boolean => {
      const filterUpdate = new Date(this._formData.updated).getTime();
      const itemUpdated = new Date(item.updated_at).getTime();
      return filterUpdate < itemUpdated;
    });
  }
  /**
   * Method for attach first element to shadow
   *
   * @param template
   */
  private _attachFirstElement(template: HTMLElement): void {
    this._shadowAttached = true;
    this._elements.push(this._formData.id.bind(this._formData)());
    this.attachShadow({ mode: "open" }).appendChild(template);
  }
  /**
   * Method for attach next element to shadow
   *
   * @param template
   */
  private _attachNextElement(template: HTMLElement): void {
    this._elements.push(this._formData.id.bind(this._formData)());
    this.shadowRoot?.appendChild(template);
  }
  /**
   * Method for create repos element
   */
  private _createUserRepoElement(): void {
    if (this._repos.length) {
      this._createUserRepoElementStrategy(
        Utils.buildTemplate(this._formData, this._repos)
      );
    } else {
      Event.emit("MESSENGER", {
        message: `No repos after ${this._formData.updated}`,
      });
    }
  }
  /**
   * Method for decided way to create repos element
   *
   * @param template
   */
  private _createUserRepoElementStrategy(template: HTMLElement): void {
    let checkShadowIsAttached = this._shadowAttached;
    let checkReposIsUnique = this._elements.filter(
      (item) => item === this._formData.id.bind(this._formData)()
    ).length;

    if (checkShadowIsAttached) {
      if (checkReposIsUnique) {
        Event.emit("MESSENGER", {
          message: "User just exist!",
        });
      } else {
        this._attachNextElement(template);
      }
    } else {
      this._attachFirstElement(template);
    }
  }
}
