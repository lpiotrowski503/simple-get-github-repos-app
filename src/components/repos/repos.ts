export class Repos extends HTMLElement {
  constructor() {
    super();

    const template = (document.getElementById("repos-element") as any).content;
    const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
      template.cloneNode(true)
    );
  }
}
