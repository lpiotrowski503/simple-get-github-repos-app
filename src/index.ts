import { log } from "./helpers/debug";
import { Repos } from "./components/repos/repos";

log("hello");

customElements.define("repos-element", Repos);
