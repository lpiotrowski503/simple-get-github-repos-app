import { Repos } from "./components/repos/repos";
import { AddUserForm } from "./views/add-user-form";

window.onload = (e) => {
  /**
   * Adding custow elements
   */
  customElements.define("repos-element", Repos);
  /**
   * Add user form template instance
   */
  const addUserForm = new AddUserForm();
};
