import { Event } from "../helpers/event";

export class AddUserForm {
  constructor() {
    this.onSubmit();
  }

  public onSubmit(): void {
    const userDataInput = document.querySelector(
      "#add-user-repos__user"
    ) as any;

    const updateInput = document.querySelector(
      "#add-user-repos__update"
    ) as any;

    const btn = document.querySelector("#add-user-repos__submit") as any;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      Event.emit("CREATE USER REPOS", { user: userDataInput.value });
    });
  }
}
