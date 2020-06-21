import { Event } from "../../helpers/event";

export class Messenger {
  constructor() {
    this.onSubmit();
    this.init();
  }

  private init() {
    Event.on("MESSENGER", (event) => {
      document.querySelector("#messenger-root")?.classList.add("open");
      let message = document.querySelector("#messenger-message");
      if (message) message.innerHTML = event.message;
    });
  }

  public onSubmit(): void {
    document
      .querySelector("#messenger-close")
      ?.addEventListener("click", () => {
        document.querySelector("#messenger-root")?.classList.remove("open");
      });
  }
}
