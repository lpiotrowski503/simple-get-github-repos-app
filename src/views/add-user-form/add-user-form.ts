import { Assert } from "../../helpers/assert";
import { Utils } from "../../helpers/utils";
import { Event } from "../../helpers/event";

export class AddUserForm {
  constructor() {
    this.onSubmit();
  }

  public onSubmit(): void {
    const userDataInput = document.querySelector(
      "#add-user-repos__user"
    ) as any;

    const updatedInput = document.querySelector(
      "#add-user-repos__updated"
    ) as any;

    document
      .querySelector("#add-user-repos__submit")
      ?.addEventListener("click", (e) => {
        e.preventDefault();

        const checkCorrectValues =
          userDataInput.value &&
          updatedInput.value &&
          Assert.try(() => new Date(updatedInput.value).getTime()) &&
          !isNaN(new Date(updatedInput.value).getTime());

        if (checkCorrectValues) {
          Event.emit("CREATE USER REPOS", {
            userName: userDataInput.value,
            updated: Utils.buildDateString(updatedInput.value),
          });
        } else {
          Event.emit("MESSENGER", {
            message: "Please read correct user and update inputs",
          });
        }
      });
  }
}
