import { IReposResponse, IRepos } from "../../interfaces/repos.interface";
import { Http } from "../../helpers/http";
import { Event } from "../../helpers/event";
import { Utils } from "../../helpers/utils";
/**
 * Repos Web Custom Component Class
 */
export class Repos extends HTMLElement {
  private _shadowAttached: boolean = false;
  /**
   * User name variable
   */
  private _userName: string = "";
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
      this._userName = event.user;
      this._onGetUserRepos(this._userName);
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
    Http.get(`https://api.github.com/users/${user}/repos`).then(
      (repos: IReposResponse[]) => {
        if (repos.length) {
          this._prepareReposData(repos);
          this._createUserRepoElement();
        } else {
          console.log(`Cannot find "${user}" user`);
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
  }
  /**
   * Method for attach first element to shadow
   *
   * @param template
   */
  private _attachFirstElement(template: HTMLElement): void {
    this._shadowAttached = true;
    this._elements.push(this._userName);
    this.attachShadow({ mode: "open" }).appendChild(template);
  }
  /**
   * Method for attach next element to shadow
   *
   * @param template
   */
  private _attachNextElement(template: HTMLElement): void {
    this._elements.push(this._userName);
    this.shadowRoot?.appendChild(template);
  }
  /**
   * Method for create repos element
   */
  private _createUserRepoElement(): void {
    this._createUserRepoElementStrategy(
      Utils.buildTemplate(this._userName, this._repos)
    );
  }
  /**
   * Method for decided way to create repos element
   *
   * @param template
   */
  private _createUserRepoElementStrategy(template: HTMLElement): void {
    let checkShadowIsAttached = this._shadowAttached;
    let checkReposIsUnique = this._elements.filter(
      (item) => item === this._userName
    ).length;

    if (checkShadowIsAttached) {
      if (checkReposIsUnique) {
        console.log("User just exist !");
      } else {
        this._attachNextElement(template);
      }
    } else {
      this._attachFirstElement(template);
    }
  }
}
