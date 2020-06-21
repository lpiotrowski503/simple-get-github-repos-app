import { Repos } from "./components/repos/repos";
import { AddUserForm } from "./views/add-user-form/add-user-form";
import { Messenger } from "./views/messenger/messenger";
/**
 * Window ready
 *
 * @param e
 */
window.onload = (e: Event) => {
  /**
   * Adding custow elements
   */
  customElements.define("repos-element", Repos);
  /**
   * Add user form template instance
   */
  new AddUserForm();
  /**
   * Messenger instance
   */
  new Messenger();
};
