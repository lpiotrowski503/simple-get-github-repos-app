/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/repos/repos.ts":
/*!***************************************!*\
  !*** ./src/components/repos/repos.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Repos = void 0;
const http_1 = __webpack_require__(/*! ../../helpers/http */ "./src/helpers/http.ts");
const event_1 = __webpack_require__(/*! ../../helpers/event */ "./src/helpers/event.ts");
const utils_1 = __webpack_require__(/*! ../../helpers/utils */ "./src/helpers/utils.ts");
/**
 * Repos Web Custom Component Class
 */
class Repos extends HTMLElement {
    constructor() {
        super();
        this._shadowAttached = false;
        /**
         * User name variable
         */
        this._userName = "";
        /**
         * User repos variable
         */
        this._repos = [];
        /**
         * Attached element names to the shadow
         */
        this._elements = [];
        /**
         * Custom event listener for stream from data from add user form to create repos element
         */
        event_1.Event.on("CREATE USER REPOS", (event) => {
            this._userName = event.user;
            this._onGetUserRepos(this._userName);
        });
        /**
         * Custom event listener for show hide repos list
         */
        event_1.Event.on("COLLAPSE", (event) => {
            var _a;
            let table = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`#article-${event.id}`);
            (table === null || table === void 0 ? void 0 : table.classList.contains("open")) ? table.classList.remove("open")
                : table === null || table === void 0 ? void 0 : table.classList.add("open");
        });
        /**
         * Custom event listener for remove user repos
         */
        event_1.Event.on("REMOVE", (event) => {
            var _a;
            (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.removeChild(event.element);
            this._elements = this._elements.filter((item) => item !== event.id);
        });
    }
    /**
     * Method for send request for get user repos
     *
     * @param user
     */
    _onGetUserRepos(user) {
        http_1.Http.get(`https://api.github.com/users/${user}/repos`).then((repos) => {
            if (repos.length) {
                this._prepareReposData(repos);
                this._createUserRepoElement();
            }
            else {
                console.log(`Cannot find "${user}" user`);
            }
        });
    }
    /**
     * Method for filtering response to view requirements
     *
     * @param repos
     */
    _prepareReposData(repos) {
        this._repos = utils_1.Utils.mapResponse(repos, [
            "name",
            "description",
            "updated_at",
            "git_url",
        ]);
    }
    /**
     * Method for attach first element to shadow
     *
     * @param template
     */
    _attachFirstElement(template) {
        this._shadowAttached = true;
        this._elements.push(this._userName);
        this.attachShadow({ mode: "open" }).appendChild(template);
    }
    /**
     * Method for attach next element to shadow
     *
     * @param template
     */
    _attachNextElement(template) {
        var _a;
        this._elements.push(this._userName);
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(template);
    }
    /**
     * Method for create repos element
     */
    _createUserRepoElement() {
        this._createUserRepoElementStrategy(utils_1.Utils.buildTemplate(this._userName, this._repos));
    }
    /**
     * Method for decided way to create repos element
     *
     * @param template
     */
    _createUserRepoElementStrategy(template) {
        let checkShadowIsAttached = this._shadowAttached;
        let checkReposIsUnique = this._elements.filter((item) => item === this._userName).length;
        if (checkShadowIsAttached) {
            if (checkReposIsUnique) {
                console.log("User just exist !");
            }
            else {
                this._attachNextElement(template);
            }
        }
        else {
            this._attachFirstElement(template);
        }
    }
}
exports.Repos = Repos;


/***/ }),

/***/ "./src/helpers/error-handler.ts":
/*!**************************************!*\
  !*** ./src/helpers/error-handler.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHundler = void 0;
class ErrorHundler {
    static printError(error) {
        throw new Error(error);
    }
}
exports.ErrorHundler = ErrorHundler;


/***/ }),

/***/ "./src/helpers/event.ts":
/*!******************************!*\
  !*** ./src/helpers/event.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
/**
 * Event class for create and listening custom events simple way
 */
class Event {
    /**
     * Method for emit custom event
     *
     * @param chanel
     * @param value
     */
    static emit(chanel, value) {
        window.dispatchEvent(new CustomEvent(chanel, {
            detail: value ? value : {},
        }));
    }
    /**
     * Method for create custom event listener
     *
     * @param chanel
     * @param callback
     */
    static on(chanel, callback) {
        window.addEventListener(chanel, (event) => {
            callback(event.detail);
        });
    }
}
exports.Event = Event;


/***/ }),

/***/ "./src/helpers/http.ts":
/*!*****************************!*\
  !*** ./src/helpers/http.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Http = void 0;
const error_handler_1 = __webpack_require__(/*! ./error-handler */ "./src/helpers/error-handler.ts");
/**
 * Http class for send request and catch error in one place
 */
class Http {
    static get(url) {
        return fetch(url)
            .then((response) => response.json())
            .catch((error) => error_handler_1.ErrorHundler.printError(error));
    }
}
exports.Http = Http;


/***/ }),

/***/ "./src/helpers/utils.ts":
/*!******************************!*\
  !*** ./src/helpers/utils.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const event_1 = __webpack_require__(/*! ./event */ "./src/helpers/event.ts");
/**
 * Utils class for reusable logic
 */
class Utils {
    /**
     * Method for mapping with simple way
     *
     * @param inputArray
     * @param args
     */
    static mapResponse(inputArray, args) {
        return inputArray.map((item) => {
            let output = {};
            args.forEach((arg) => {
                output[arg.toString()] = item[arg.toString()];
            });
            return output;
        });
    }
    /**
     * Method for Build Table from header and body inputs
     *
     * @param header
     * @param body
     */
    static buildTable(header, body) {
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
              <td>${new Date(item.updated_at).toLocaleString(navigator.language, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })}</td>
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
    static buildTemplate(userName, repos) {
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
        view.collapseButton.addEventListener("click", function (event) {
            this.classList.contains("collapsed")
                ? this.classList.remove("collapsed")
                : this.classList.add("collapsed");
            event_1.Event.emit("COLLAPSE", { id: userName });
        });
        view.removeButton.innerHTML = `<img src='/assets/icons/remove.svg'>`;
        view.removeButton.addEventListener("click", function (event) {
            event_1.Event.emit("REMOVE", { id: userName, element: view.template });
        });
        view.template.setAttribute("class", "repos");
        view.template.setAttribute("data-user", userName);
        view.template.setAttribute("data-update", "2019-05-01");
        view.article.setAttribute("id", `article-${userName}`);
        view.header.appendChild(view.collapseButton);
        view.header.appendChild(view.removeButton);
        view.article.appendChild(Utils.buildTable(["name", "description", "updated at", "git url"], repos));
        view.template.appendChild(view.header);
        view.template.appendChild(view.article);
        return view.template;
    }
}
exports.Utils = Utils;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const repos_1 = __webpack_require__(/*! ./components/repos/repos */ "./src/components/repos/repos.ts");
const add_user_form_1 = __webpack_require__(/*! ./views/add-user-form */ "./src/views/add-user-form.ts");
window.onload = (e) => {
    /**
     * Adding custow elements
     */
    customElements.define("repos-element", repos_1.Repos);
    /**
     * Add user form template instance
     */
    new add_user_form_1.AddUserForm();
};


/***/ }),

/***/ "./src/views/add-user-form.ts":
/*!************************************!*\
  !*** ./src/views/add-user-form.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserForm = void 0;
const event_1 = __webpack_require__(/*! ../helpers/event */ "./src/helpers/event.ts");
class AddUserForm {
    constructor() {
        this.onSubmit();
    }
    onSubmit() {
        const userDataInput = document.querySelector("#add-user-repos__user");
        const updateInput = document.querySelector("#add-user-repos__update");
        const btn = document.querySelector("#add-user-repos__submit");
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            event_1.Event.emit("CREATE USER REPOS", { user: userDataInput.value });
        });
    }
}
exports.AddUserForm = AddUserForm;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmVwb3MvcmVwb3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZXJyb3ItaGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy9ldmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy9odHRwLnRzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvYWRkLXVzZXItZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakZBLHNGQUEwQztBQUMxQyx5RkFBNEM7QUFDNUMseUZBQTRDO0FBQzVDOztHQUVHO0FBQ0gsTUFBYSxL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Q0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBbEhELHNCQWtIQzs7Ozs7Ozs7Ozs7Ozs7O0FDeEhELHVHQUFpRDtBQUNqRCx5R0FBb0Q7QUFFcEQsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3BCOztPQUVHO0lBQ0gsY0FBYyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsYUFBSyxDQUFDLENBQUM7SUFDOUM7O09BRUc7SUFDSCxJQUFJLDJCQUFXLEVBQUUsQ0FBQztBQUNwQixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaRixzRkFBeUM7QUFFekMsTUFBYSxXQUFXO0lBQ3RCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxRQUFRO1FBQ2IsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDMUMsdUJBQXVCLENBQ2pCLENBQUM7UUFFVCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN4Qyx5QkFBeUIsQ0FDbkIsQ0FBQztRQUVULE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQVEsQ0FBQztRQUNyRSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLGFBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFwQkQsa0NBb0JDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBJUmVwb3NSZXNwb25zZSwgSVJlcG9zIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvcmVwb3MuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9odHRwXCI7XHJcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvZXZlbnRcIjtcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi4vLi4vaGVscGVycy91dGlsc1wiO1xyXG4vKipcclxuICogUmVwb3MgV2ViIEN1c3RvbSBDb21wb25lbnQgQ2xhc3NcclxuICovXHJcbmV4cG9ydCBjbGFzcyBSZXBvcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBwcml2YXRlIF9zaGFkb3dBdHRhY2hlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIFVzZXIgbmFtZSB2YXJpYWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VzZXJOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gIC8qKlxyXG4gICAqIFVzZXIgcmVwb3MgdmFyaWFibGVcclxuICAgKi9cclxuICBwcml2YXRlIF9yZXBvczogSVJlcG9zW10gPSBbXTtcclxuICAvKipcclxuICAgKiBBdHRhY2hlZCBlbGVtZW50IG5hbWVzIHRvIHRoZSBzaGFkb3dcclxuICAgKi9cclxuICBwcml2YXRlIF9lbGVtZW50czogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDdXN0b20gZXZlbnQgbGlzdGVuZXIgZm9yIHN0cmVhbSBmcm9tIGRhdGEgZnJvbSBhZGQgdXNlciBmb3JtIHRvIGNyZWF0ZSByZXBvcyBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIEV2ZW50Lm9uKFwiQ1JFQVRFIFVTRVIgUkVQT1NcIiwgKGV2ZW50OiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgdGhpcy5fdXNlck5hbWUgPSBldmVudC51c2VyO1xyXG4gICAgICB0aGlzLl9vbkdldFVzZXJSZXBvcyh0aGlzLl91c2VyTmFtZSk7XHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogQ3VzdG9tIGV2ZW50IGxpc3RlbmVyIGZvciBzaG93IGhpZGUgcmVwb3MgbGlzdFxyXG4gICAgICovXHJcbiAgICBFdmVudC5vbihcIkNPTExBUFNFXCIsIChldmVudDogYW55KTogdm9pZCA9PiB7XHJcbiAgICAgIGxldCB0YWJsZSA9IHRoaXMuc2hhZG93Um9vdD8ucXVlcnlTZWxlY3RvcihgI2FydGljbGUtJHtldmVudC5pZH1gKTtcclxuICAgICAgdGFibGU/LmNsYXNzTGlzdC5jb250YWlucyhcIm9wZW5cIilcclxuICAgICAgICA/IHRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpXHJcbiAgICAgICAgOiB0YWJsZT8uY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogQ3VzdG9tIGV2ZW50IGxpc3RlbmVyIGZvciByZW1vdmUgdXNlciByZXBvc1xyXG4gICAgICovXHJcbiAgICBFdmVudC5vbihcIlJFTU9WRVwiLCAoZXZlbnQ6IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgICB0aGlzLnNoYWRvd1Jvb3Q/LnJlbW92ZUNoaWxkKGV2ZW50LmVsZW1lbnQpO1xyXG4gICAgICB0aGlzLl9lbGVtZW50cyA9IHRoaXMuX2VsZW1lbnRzLmZpbHRlcihcclxuICAgICAgICAoaXRlbTogc3RyaW5nKSA9PiBpdGVtICE9PSBldmVudC5pZFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3Igc2VuZCByZXF1ZXN0IGZvciBnZXQgdXNlciByZXBvc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXJcclxuICAgKi9cclxuICBwcml2YXRlIF9vbkdldFVzZXJSZXBvcyh1c2VyOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIEh0dHAuZ2V0KGBodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzLyR7dXNlcn0vcmVwb3NgKS50aGVuKFxyXG4gICAgICAocmVwb3M6IElSZXBvc1Jlc3BvbnNlW10pID0+IHtcclxuICAgICAgICBpZiAocmVwb3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLl9wcmVwYXJlUmVwb3NEYXRhKHJlcG9zKTtcclxuICAgICAgICAgIHRoaXMuX2NyZWF0ZVVzZXJSZXBvRWxlbWVudCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgQ2Fubm90IGZpbmQgXCIke3VzZXJ9XCIgdXNlcmApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIGZvciBmaWx0ZXJpbmcgcmVzcG9uc2UgdG8gdmlldyByZXF1aXJlbWVudHNcclxuICAgKlxyXG4gICAqIEBwYXJhbSByZXBvc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX3ByZXBhcmVSZXBvc0RhdGEocmVwb3M6IElSZXBvc1Jlc3BvbnNlW10pOiB2b2lkIHtcclxuICAgIHRoaXMuX3JlcG9zID0gVXRpbHMubWFwUmVzcG9uc2UocmVwb3MsIFtcclxuICAgICAgXCJuYW1lXCIsXHJcbiAgICAgIFwiZGVzY3JpcHRpb25cIixcclxuICAgICAgXCJ1cGRhdGVkX2F0XCIsXHJcbiAgICAgIFwiZ2l0X3VybFwiLFxyXG4gICAgXSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgYXR0YWNoIGZpcnN0IGVsZW1lbnQgdG8gc2hhZG93XHJcbiAgICpcclxuICAgKiBAcGFyYW0gdGVtcGxhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9hdHRhY2hGaXJzdEVsZW1lbnQodGVtcGxhdGU6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLl9zaGFkb3dBdHRhY2hlZCA9IHRydWU7XHJcbiAgICB0aGlzLl9lbGVtZW50cy5wdXNoKHRoaXMuX3VzZXJOYW1lKTtcclxuICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSkuYXBwZW5kQ2hpbGQodGVtcGxhdGUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBNZXRob2QgZm9yIGF0dGFjaCBuZXh0IGVsZW1lbnQgdG8gc2hhZG93XHJcbiAgICpcclxuICAgKiBAcGFyYW0gdGVtcGxhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9hdHRhY2hOZXh0RWxlbWVudCh0ZW1wbGF0ZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuX2VsZW1lbnRzLnB1c2godGhpcy5fdXNlck5hbWUpO1xyXG4gICAgdGhpcy5zaGFkb3dSb290Py5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgY3JlYXRlIHJlcG9zIGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIF9jcmVhdGVVc2VyUmVwb0VsZW1lbnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9jcmVhdGVVc2VyUmVwb0VsZW1lbnRTdHJhdGVneShcclxuICAgICAgVXRpbHMuYnVpbGRUZW1wbGF0ZSh0aGlzLl91c2VyTmFtZSwgdGhpcy5fcmVwb3MpXHJcbiAgICApO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBNZXRob2QgZm9yIGRlY2lkZWQgd2F5IHRvIGNyZWF0ZSByZXBvcyBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcGFyYW0gdGVtcGxhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9jcmVhdGVVc2VyUmVwb0VsZW1lbnRTdHJhdGVneSh0ZW1wbGF0ZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGxldCBjaGVja1NoYWRvd0lzQXR0YWNoZWQgPSB0aGlzLl9zaGFkb3dBdHRhY2hlZDtcclxuICAgIGxldCBjaGVja1JlcG9zSXNVbmlxdWUgPSB0aGlzLl9lbGVtZW50cy5maWx0ZXIoXHJcbiAgICAgIChpdGVtKSA9PiBpdGVtID09PSB0aGlzLl91c2VyTmFtZVxyXG4gICAgKS5sZW5ndGg7XHJcblxyXG4gICAgaWYgKGNoZWNrU2hhZG93SXNBdHRhY2hlZCkge1xyXG4gICAgICBpZiAoY2hlY2tSZXBvc0lzVW5pcXVlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJVc2VyIGp1c3QgZXhpc3QgIVwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9hdHRhY2hOZXh0RWxlbWVudCh0ZW1wbGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2F0dGFjaEZpcnN0RWxlbWVudCh0ZW1wbGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBFcnJvckh1bmRsZXIge1xyXG4gIHN0YXRpYyBwcmludEVycm9yKGVycm9yOiBhbnkpOiBhbnkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEV2ZW50IGNsYXNzIGZvciBjcmVhdGUgYW5kIGxpc3RlbmluZyBjdXN0b20gZXZlbnRzIHNpbXBsZSB3YXlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFdmVudCB7XHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIGZvciBlbWl0IGN1c3RvbSBldmVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNoYW5lbFxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBlbWl0KGNoYW5lbDogc3RyaW5nLCB2YWx1ZT86IGFueSk6IHZvaWQge1xyXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgIG5ldyBDdXN0b21FdmVudChjaGFuZWwsIHtcclxuICAgICAgICBkZXRhaWw6IHZhbHVlID8gdmFsdWUgOiB7fSxcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgY3JlYXRlIGN1c3RvbSBldmVudCBsaXN0ZW5lclxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNoYW5lbFxyXG4gICAqIEBwYXJhbSBjYWxsYmFja1xyXG4gICAqL1xyXG4gIHN0YXRpYyBvbihjaGFuZWw6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihjaGFuZWwsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIGNhbGxiYWNrKGV2ZW50LmRldGFpbCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXJyb3JIdW5kbGVyIH0gZnJvbSBcIi4vZXJyb3ItaGFuZGxlclwiO1xyXG4vKipcclxuICogSHR0cCBjbGFzcyBmb3Igc2VuZCByZXF1ZXN0IGFuZCBjYXRjaCBlcnJvciBpbiBvbmUgcGxhY2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBIdHRwIHtcclxuICBzdGF0aWMgZ2V0KHVybDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBmZXRjaCh1cmwpXHJcbiAgICAgIC50aGVuKChyZXNwb25zZTogYW55KSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4gRXJyb3JIdW5kbGVyLnByaW50RXJyb3IoZXJyb3IpKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi9ldmVudFwiO1xyXG5pbXBvcnQgeyBJUmVwb3MgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9yZXBvcy5pbnRlcmZhY2VcIjtcclxuXHJcbi8qKlxyXG4gKiBVdGlscyBjbGFzcyBmb3IgcmV1c2FibGUgbG9naWNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBVdGlscyB7XHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIGZvciBtYXBwaW5nIHdpdGggc2ltcGxlIHdheVxyXG4gICAqXHJcbiAgICogQHBhcmFtIGlucHV0QXJyYXlcclxuICAgKiBAcGFyYW0gYXJnc1xyXG4gICAqL1xyXG4gIHN0YXRpYyBtYXBSZXNwb25zZShpbnB1dEFycmF5OiBhbnlbXSwgYXJnczogc3RyaW5nW10pOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gaW5wdXRBcnJheS5tYXAoXHJcbiAgICAgIChpdGVtKTogT2JqZWN0ID0+IHtcclxuICAgICAgICBsZXQgb3V0cHV0ID0ge307XHJcbiAgICAgICAgYXJncy5mb3JFYWNoKChhcmc6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgb3V0cHV0W2FyZy50b1N0cmluZygpXSA9IGl0ZW1bYXJnLnRvU3RyaW5nKCldO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgQnVpbGQgVGFibGUgZnJvbSBoZWFkZXIgYW5kIGJvZHkgaW5wdXRzXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaGVhZGVyXHJcbiAgICogQHBhcmFtIGJvZHlcclxuICAgKi9cclxuICBzdGF0aWMgYnVpbGRUYWJsZShoZWFkZXI6IHN0cmluZ1tdLCBib2R5OiBhbnlbXSk6IEhUTUxUYWJsZUVsZW1lbnQge1xyXG4gICAgbGV0IHZpZXcgPSB7XHJcbiAgICAgIHRyOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIiksXHJcbiAgICAgIHRhYmxlOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiksXHJcbiAgICAgIHRhYmxlSGVhZDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoZWFkXCIpLFxyXG4gICAgICB0YWJsZUJvZHk6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKSxcclxuICAgIH07XHJcblxyXG4gICAgaGVhZGVyLmZvckVhY2goKHRoKSA9PiB7XHJcbiAgICAgIHZpZXcudHIuaW5uZXJIVE1MICs9IGA8dGg+JHt0aH08L3RoPmA7XHJcbiAgICB9KTtcclxuXHJcbiAgICBib2R5LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgdmlldy50YWJsZUJvZHkuaW5uZXJIVE1MICs9IGBcclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgIDx0ZD4ke2l0ZW0ubmFtZX08L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD4ke2l0ZW0uZGVzY3JpcHRpb24gPyBpdGVtLmRlc2NyaXB0aW9uIDogXCJcIn08L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD4ke25ldyBEYXRlKGl0ZW0udXBkYXRlZF9hdCkudG9Mb2NhbGVTdHJpbmcoXHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3IubGFuZ3VhZ2UsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGRheTogXCIyLWRpZ2l0XCIsXHJcbiAgICAgICAgICAgICAgICAgIG1vbnRoOiBcIjItZGlnaXRcIixcclxuICAgICAgICAgICAgICAgICAgeWVhcjogXCJudW1lcmljXCIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgKX08L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD4ke2l0ZW0uZ2l0X3VybH08L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgYDtcclxuICAgIH0pO1xyXG5cclxuICAgIHZpZXcudGFibGVIZWFkLmFwcGVuZENoaWxkKHZpZXcudHIpO1xyXG4gICAgdmlldy50YWJsZS5hcHBlbmRDaGlsZCh2aWV3LnRhYmxlSGVhZCk7XHJcbiAgICB2aWV3LnRhYmxlLmFwcGVuZENoaWxkKHZpZXcudGFibGVCb2R5KTtcclxuXHJcbiAgICByZXR1cm4gdmlldy50YWJsZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIGZvciBCdWlsZCBUZW1wbGF0ZSBmcm9tIHVzZXJOYW1lIGFuZCByZXBvcyBBcnJheVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXJOYW1lXHJcbiAgICogQHBhcmFtIHJlcG9zXHJcbiAgICovXHJcbiAgc3RhdGljIGJ1aWxkVGVtcGxhdGUodXNlck5hbWU6IHN0cmluZywgcmVwb3M6IElSZXBvc1tdKTogSFRNTEVsZW1lbnQge1xyXG4gICAgbGV0IHZpZXcgPSB7XHJcbiAgICAgIHRlbXBsYXRlOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicmVwb3NcIiksXHJcbiAgICAgIGhlYWRlcjogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKSxcclxuICAgICAgYXJ0aWNsZTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIiksXHJcbiAgICAgIGNvbGxhcHNlQnV0dG9uOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpLFxyXG4gICAgICByZW1vdmVCdXR0b246IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiksXHJcbiAgICB9O1xyXG4gICAgdmlldy50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXHJcbiAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9hc3NldHMvc3R5bGVzL3JlcG9zLmNzc1wiPlxyXG4gICAgYDtcclxuICAgIHZpZXcuaGVhZGVyLmlubmVySFRNTCA9IGA8aDI+JHt1c2VyTmFtZX08L2gyPmA7XHJcblxyXG4gICAgdmlldy5jb2xsYXBzZUJ1dHRvbi5pbm5lckhUTUwgPSBgPGltZyBzcmM9Jy9hc3NldHMvaWNvbnMvZHJvcC1kb3duLnN2Zyc+YDtcclxuICAgIHZpZXcuY29sbGFwc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChcclxuICAgICAgZXZlbnQ6IE1vdXNlRXZlbnRcclxuICAgICk6IHZvaWQge1xyXG4gICAgICB0aGlzLmNsYXNzTGlzdC5jb250YWlucyhcImNvbGxhcHNlZFwiKVxyXG4gICAgICAgID8gdGhpcy5jbGFzc0xpc3QucmVtb3ZlKFwiY29sbGFwc2VkXCIpXHJcbiAgICAgICAgOiB0aGlzLmNsYXNzTGlzdC5hZGQoXCJjb2xsYXBzZWRcIik7XHJcblxyXG4gICAgICBFdmVudC5lbWl0KFwiQ09MTEFQU0VcIiwgeyBpZDogdXNlck5hbWUgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2aWV3LnJlbW92ZUJ1dHRvbi5pbm5lckhUTUwgPSBgPGltZyBzcmM9Jy9hc3NldHMvaWNvbnMvcmVtb3ZlLnN2Zyc+YDtcclxuICAgIHZpZXcucmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoXHJcbiAgICAgIGV2ZW50OiBNb3VzZUV2ZW50XHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgRXZlbnQuZW1pdChcIlJFTU9WRVwiLCB7IGlkOiB1c2VyTmFtZSwgZWxlbWVudDogdmlldy50ZW1wbGF0ZSB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZpZXcudGVtcGxhdGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyZXBvc1wiKTtcclxuICAgIHZpZXcudGVtcGxhdGUuc2V0QXR0cmlidXRlKFwiZGF0YS11c2VyXCIsIHVzZXJOYW1lKTtcclxuICAgIHZpZXcudGVtcGxhdGUuc2V0QXR0cmlidXRlKFwiZGF0YS11cGRhdGVcIiwgXCIyMDE5LTA1LTAxXCIpO1xyXG5cclxuICAgIHZpZXcuYXJ0aWNsZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgYXJ0aWNsZS0ke3VzZXJOYW1lfWApO1xyXG5cclxuICAgIHZpZXcuaGVhZGVyLmFwcGVuZENoaWxkKHZpZXcuY29sbGFwc2VCdXR0b24pO1xyXG4gICAgdmlldy5oZWFkZXIuYXBwZW5kQ2hpbGQodmlldy5yZW1vdmVCdXR0b24pO1xyXG4gICAgdmlldy5hcnRpY2xlLmFwcGVuZENoaWxkKFxyXG4gICAgICBVdGlscy5idWlsZFRhYmxlKFtcIm5hbWVcIiwgXCJkZXNjcmlwdGlvblwiLCBcInVwZGF0ZWQgYXRcIiwgXCJnaXQgdXJsXCJdLCByZXBvcylcclxuICAgICk7XHJcblxyXG4gICAgdmlldy50ZW1wbGF0ZS5hcHBlbmRDaGlsZCh2aWV3LmhlYWRlcik7XHJcbiAgICB2aWV3LnRlbXBsYXRlLmFwcGVuZENoaWxkKHZpZXcuYXJ0aWNsZSk7XHJcblxyXG4gICAgcmV0dXJuIHZpZXcudGVtcGxhdGU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlcG9zIH0gZnJvbSBcIi4vY29tcG9uZW50cy9yZXBvcy9yZXBvc1wiO1xyXG5pbXBvcnQgeyBBZGRVc2VyRm9ybSB9IGZyb20gXCIuL3ZpZXdzL2FkZC11c2VyLWZvcm1cIjtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSAoZSkgPT4ge1xyXG4gIC8qKlxyXG4gICAqIEFkZGluZyBjdXN0b3cgZWxlbWVudHNcclxuICAgKi9cclxuICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJyZXBvcy1lbGVtZW50XCIsIFJlcG9zKTtcclxuICAvKipcclxuICAgKiBBZGQgdXNlciBmb3JtIHRlbXBsYXRlIGluc3RhbmNlXHJcbiAgICovXHJcbiAgbmV3IEFkZFVzZXJGb3JtKCk7XHJcbn07XHJcbiIsImltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uL2hlbHBlcnMvZXZlbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBZGRVc2VyRm9ybSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLm9uU3VibWl0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25TdWJtaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCB1c2VyRGF0YUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjYWRkLXVzZXItcmVwb3NfX3VzZXJcIlxyXG4gICAgKSBhcyBhbnk7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiNhZGQtdXNlci1yZXBvc19fdXBkYXRlXCJcclxuICAgICkgYXMgYW55O1xyXG5cclxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXVzZXItcmVwb3NfX3N1Ym1pdFwiKSBhcyBhbnk7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgRXZlbnQuZW1pdChcIkNSRUFURSBVU0VSIFJFUE9TXCIsIHsgdXNlcjogdXNlckRhdGFJbnB1dC52YWx1ZSB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9