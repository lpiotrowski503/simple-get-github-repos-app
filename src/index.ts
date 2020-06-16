import { IRepos } from "./interfaces/repos.interface";
import { log } from "./helpers/debug";
import { Repos } from "./components/repos/repos";
import { Http } from "./helpers/http";
import { Store } from "./helpers/store";
/**
 * Store instance
 */
let store = new Store();
/**
 * Store state
 */
let state: IRepos[];
/**
 * Test app working fine
 */
log("ready");
/**
 * Adding custow elements
 */
customElements.define("repos-element", Repos);
/**
 * Get user repos
 */
Http.getUserData("https://api.github.com/users/devballteam/repos").then(
  (data: IRepos[]) => {
    store.updateState(data);
    state = store.getState();
    console.log(state);
  }
);
