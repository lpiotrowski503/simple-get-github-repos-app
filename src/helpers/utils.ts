export class Utils {
  /**
   * Method for mapping with simle way
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
              <td>${item.description}</td>
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
}
