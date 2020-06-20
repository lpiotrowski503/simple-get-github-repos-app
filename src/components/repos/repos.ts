import { IReposResponse, IRepos } from "../../interfaces/repos.interface";
import { Http } from "../../helpers/http";
import { Event } from "../../helpers/event";
import { Utils } from "../../helpers/utils";

export class Repos extends HTMLElement {
  private _repos: IRepos[] = [];
  private _elements: string[] = [];
  private _userName: string = "";

  constructor() {
    super();

    Event.on("CREATE USER REPOS", (event: any): void => {
      this._userName = event.user;
      this._onGetUserRepos(this._userName);
      // this._setUserNameAttribute(this._userName);
    });

    Event.on("COLLAPSE", (event: any): void => {
      let table = this.shadowRoot?.querySelector(`#article-${event.id}`);
      table?.classList.contains("open")
        ? table.classList.remove("open")
        : table?.classList.add("open");
    });
  }

  // static get observedAttributes() {
  //   return ["data-user", "data-update"];
  // }

  // get dataUser() {
  //   return this.getAttribute("data-user");
  // }

  // set dataUser(value: any) {
  //   this.setAttribute("data-user", value);
  // }

  // get dataUpdate() {
  //   return this.getAttribute("data-update");
  // }

  // set dataUpdate(value: any) {
  //   this.setAttribute("data-update", value);
  // }

  // attributeChangedCallback(name, oldValue, newValue) {}

  // connectedCallback() {}

  // disconnectedCallback() {}

  // private _setUserNameAttribute(user: string): void {
  //   this.dataUser = user;
  // }

  private _onGetUserRepos(user: string): void {
    Http.getUserData(`https://api.github.com/users/${user}/repos`).then(
      (repos: IReposResponse[]) => {
        if (repos.length) {
          this._prepareReposData(repos);
          this._createUserRepoElement();
        }
      }
    );
  }

  private _prepareReposData(repos): void {
    this._repos = Utils.mapResponse(repos, [
      "name",
      "description",
      "updated_at",
      "git_url",
    ]);
  }

  private _createUserRepoElement(): void {
    let template = document.createElement("repos");
    let header = document.createElement("header");
    let article = document.createElement("article");
    let button = document.createElement("button");
    template.innerHTML = `
    <link rel="stylesheet" href="/assets/styles/repos.css">
    `;
    header.innerHTML = `<h2>${this._userName}</h2>`;
    button.innerHTML = `<img src='/assets/icons/drop-down.svg'>`;
    button.id = this._userName;

    button.addEventListener("click", function (event: MouseEvent): void {
      this.classList.contains("collapsed")
        ? this.classList.remove("collapsed")
        : this.classList.add("collapsed");

      Event.emit("COLLAPSE", { id: this.id });
    });

    template.setAttribute("class", "repos");
    template.setAttribute("data-user", this._userName);
    template.setAttribute("data-update", "2019-05-01");

    article.setAttribute("id", `article-${this._userName}`);

    header.appendChild(button);
    article.appendChild(
      Utils.buildTable(
        ["name", "description", "updated at", "git url"],
        this._repos
      )
    );
    template.appendChild(header);
    template.appendChild(article);

    if (this._elements.length) {
      if (this._elements.filter((item) => item === this._userName).length) {
        console.log("User just exist !");
      } else {
        this._elements.push(this._userName);
        this.shadowRoot?.appendChild(template);
      }
    } else {
      this._elements.push(this._userName);
      this.attachShadow({ mode: "open" }).appendChild(template);
    }
  }
}
