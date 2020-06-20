import { Event } from "./event";
import { IRepos } from "../interfaces/repos.interface";

/**
 * Utils class for reusable logic
 */
export class Utils {
  /**
   * Method for mapping with simple way
   *
   * @param inputArray
   * @param args
   */
  static mapResponse(inputArray: any[], args: string[]): any[] {
    return inputArray.map(
      (item): Object => {
        let output = {};
        args.forEach((arg: string): void => {
          output[arg.toString()] = item[arg.toString()];
        });
        return output;
      }
    );
  }
  /**
   * Method for Build Table from header and body inputs
   *
   * @param header
   * @param body
   */
  static buildTable(header: string[], body: any[]): HTMLTableElement {
    let view = {
      tr: document.createElement("tr"),
      table: document.createElement("table"),
      tableHead: document.createElement("thead"),
      tableBody: document.createElement("tbody"),
    };

    header.forEach((th) => {
      view.tr.innerHTML += `<th>${th}</th>`;
    });

    body.forEach((item) => {
      view.tableBody.innerHTML += `
            <tr>
              <td>${item.name}</td>
              <td>${item.description ? item.description : ""}</td>
              <td>${new Date(item.updated_at).toLocaleString(
                navigator.language,
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              )}</td>
              <td>${item.git_url}</td>
            </tr>
          `;
    });

    view.tableHead.appendChild(view.tr);
    view.table.appendChild(view.tableHead);
    view.table.appendChild(view.tableBody);

    return view.table;
  }
  /**
   * Method for Build Template from userName and repos Array
   *
   * @param userName
   * @param repos
   */
  static buildTemplate(userName: string, repos: IRepos[]): HTMLElement {
    let view = {
      template: document.createElement("repos"),
      header: document.createElement("header"),
      article: document.createElement("article"),
      collapseButton: document.createElement("button"),
      removeButton: document.createElement("button"),
    };
    view.template.innerHTML = `
    <link rel="stylesheet" href="/assets/styles/repos.css">
    `;
    view.header.innerHTML = `<h2>${userName}</h2>`;

    view.collapseButton.innerHTML = `<img src='/assets/icons/drop-down.svg'>`;
    view.collapseButton.addEventListener("click", function (
      event: MouseEvent
    ): void {
      this.classList.contains("collapsed")
        ? this.classList.remove("collapsed")
        : this.classList.add("collapsed");

      Event.emit("COLLAPSE", { id: userName });
    });

    view.removeButton.innerHTML = `<img src='/assets/icons/remove.svg'>`;
    view.removeButton.addEventListener("click", function (
      event: MouseEvent
    ): void {
      Event.emit("REMOVE", { id: userName, element: view.template });
    });

    view.template.setAttribute("class", "repos");
    view.template.setAttribute("data-user", userName);
    view.template.setAttribute("data-update", "2019-05-01");

    view.article.setAttribute("id", `article-${userName}`);

    view.header.appendChild(view.collapseButton);
    view.header.appendChild(view.removeButton);
    view.article.appendChild(
      Utils.buildTable(["name", "description", "updated at", "git url"], repos)
    );

    view.template.appendChild(view.header);
    view.template.appendChild(view.article);

    return view.template;
  }
}
