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
        this._formData = {
            userName: "",
            updated: "",
            id() {
                return `${this.userName}-${this.updated}`.replace(/\./g, "-");
            },
        };
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
            this._formData = Object.assign(Object.assign({}, this._formData), event);
            this._onGetUserRepos(this._formData.userName);
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
        http_1.Http.get(`https://api.github.com/users/${user}/repos?sort=updated`).then((repos) => {
            if (repos.length) {
                this._prepareReposData(repos);
                this._createUserRepoElement();
            }
            else {
                event_1.Event.emit("MESSENGER", {
                    message: `Cannot find "${user}" user`,
                });
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
        this._repos = this._repos.filter((item) => {
            const filterUpdate = new Date(this._formData.updated).getTime();
            const itemUpdated = new Date(item.updated_at).getTime();
            return filterUpdate < itemUpdated;
        });
    }
    /**
     * Method for attach first element to shadow
     *
     * @param template
     */
    _attachFirstElement(template) {
        this._shadowAttached = true;
        this._elements.push(this._formData.id.bind(this._formData)());
        this.attachShadow({ mode: "open" }).appendChild(template);
    }
    /**
     * Method for attach next element to shadow
     *
     * @param template
     */
    _attachNextElement(template) {
        var _a;
        this._elements.push(this._formData.id.bind(this._formData)());
        (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(template);
    }
    /**
     * Method for create repos element
     */
    _createUserRepoElement() {
        if (this._repos.length) {
            this._createUserRepoElementStrategy(utils_1.Utils.buildTemplate(this._formData, this._repos));
        }
        else {
            event_1.Event.emit("MESSENGER", {
                message: `No repos after ${this._formData.updated}`,
            });
        }
    }
    /**
     * Method for decided way to create repos element
     *
     * @param template
     */
    _createUserRepoElementStrategy(template) {
        let checkShadowIsAttached = this._shadowAttached;
        let checkReposIsUnique = this._elements.filter((item) => item === this._formData.id.bind(this._formData)()).length;
        if (checkShadowIsAttached) {
            if (checkReposIsUnique) {
                event_1.Event.emit("MESSENGER", {
                    message: "User just exist!",
                });
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

/***/ "./src/helpers/assert.ts":
/*!*******************************!*\
  !*** ./src/helpers/assert.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Assert = void 0;
const error_handler_1 = __webpack_require__(/*! ./error-handler */ "./src/helpers/error-handler.ts");
/**
 * Class for prevent don't caught errors
 */
class Assert {
    /**
     * Method for try run if can witch caught error
     *
     * @param resolve
     * @param reject
     */
    static try(resolve, reject) {
        try {
            resolve();
            return true;
        }
        catch (error) {
            if (reject)
                error_handler_1.ErrorHundler.printError(error);
            return false;
        }
    }
}
exports.Assert = Assert;


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
/**
 * Class for catch errors
 */
class ErrorHundler {
    /**
     * Method for catch error
     *
     * @param error
     */
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Http = void 0;
const error_handler_1 = __webpack_require__(/*! ./error-handler */ "./src/helpers/error-handler.ts");
/**
 * Http class for send request
 */
class Http {
    /**
     * Method for GET request and catch error in one place
     *
     * @param url
     */
    static get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(url);
                return response.json();
            }
            catch (error) {
                return error_handler_1.ErrorHundler.printError(error);
            }
        });
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
              <td>${this.buildDateString(item.updated_at)}</td>
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
    static buildTemplate(formData, repos) {
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
        view.header.innerHTML = `<h2>${formData.userName} ${formData.updated}</h2>`;
        view.collapseButton.innerHTML = `<img src='/assets/icons/drop-down.svg'>`;
        view.collapseButton.addEventListener("click", function (event) {
            this.classList.contains("collapsed")
                ? this.classList.remove("collapsed")
                : this.classList.add("collapsed");
            event_1.Event.emit("COLLAPSE", { id: formData.id.bind(formData)() });
        });
        view.removeButton.innerHTML = `<img src='/assets/icons/remove.svg'>`;
        view.removeButton.addEventListener("click", function (event) {
            event_1.Event.emit("REMOVE", {
                id: formData.id.bind(formData)(),
                element: view.template,
            });
        });
        view.template.setAttribute("class", "repos");
        view.template.setAttribute("data-user", formData.userName);
        view.template.setAttribute("data-update", formData.updated.toString());
        view.article.setAttribute("id", `article-${formData.id.bind(formData)()}`);
        view.header.appendChild(view.collapseButton);
        view.header.appendChild(view.removeButton);
        view.article.appendChild(Utils.buildTable(["name", "description", "updated at", "git url"], repos));
        view.template.appendChild(view.header);
        view.template.appendChild(view.article);
        return view.template;
    }
    /**
     * Method for build string in custom Date format
     *
     * @param date
     */
    static buildDateString(date) {
        return new Date(date).toLocaleString(navigator.language, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
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
const add_user_form_1 = __webpack_require__(/*! ./views/add-user-form/add-user-form */ "./src/views/add-user-form/add-user-form.ts");
const messenger_1 = __webpack_require__(/*! ./views/messenger/messenger */ "./src/views/messenger/messenger.ts");
/**
 * Window ready
 *
 * @param e
 */
window.onload = (e) => {
    /**
     * Adding custow elements
     */
    customElements.define("repos-element", repos_1.Repos);
    /**
     * Add user form template instance
     */
    new add_user_form_1.AddUserForm();
    /**
     * Messenger instance
     */
    new messenger_1.Messenger();
};


/***/ }),

/***/ "./src/views/add-user-form/add-user-form.ts":
/*!**************************************************!*\
  !*** ./src/views/add-user-form/add-user-form.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserForm = void 0;
const assert_1 = __webpack_require__(/*! ../../helpers/assert */ "./src/helpers/assert.ts");
const utils_1 = __webpack_require__(/*! ../../helpers/utils */ "./src/helpers/utils.ts");
const event_1 = __webpack_require__(/*! ../../helpers/event */ "./src/helpers/event.ts");
class AddUserForm {
    constructor() {
        this.onSubmit();
    }
    onSubmit() {
        var _a;
        const userDataInput = document.querySelector("#add-user-repos__user");
        const updatedInput = document.querySelector("#add-user-repos__updated");
        (_a = document
            .querySelector("#add-user-repos__submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
            e.preventDefault();
            const checkCorrectValues = userDataInput.value &&
                updatedInput.value &&
                assert_1.Assert.try(() => new Date(updatedInput.value).getTime()) &&
                !isNaN(new Date(updatedInput.value).getTime());
            if (checkCorrectValues) {
                event_1.Event.emit("CREATE USER REPOS", {
                    userName: userDataInput.value,
                    updated: utils_1.Utils.buildDateString(updatedInput.value),
                });
            }
            else {
                event_1.Event.emit("MESSENGER", {
                    message: "Please read correct user and update inputs",
                });
            }
        });
    }
}
exports.AddUserForm = AddUserForm;


/***/ }),

/***/ "./src/views/messenger/messenger.ts":
/*!******************************************!*\
  !*** ./src/views/messenger/messenger.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Messenger = void 0;
const event_1 = __webpack_require__(/*! ../../helpers/event */ "./src/helpers/event.ts");
class Messenger {
    constructor() {
        this.onSubmit();
        this.init();
    }
    init() {
        event_1.Event.on("MESSENGER", (event) => {
            var _a;
            (_a = document.querySelector("#messenger-root")) === null || _a === void 0 ? void 0 : _a.classList.add("open");
            let message = document.querySelector("#messenger-message");
            if (message)
                message.innerHTML = event.message;
        });
    }
    onSubmit() {
        var _a;
        (_a = document
            .querySelector("#messenger-close")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            var _a;
            (_a = document.querySelector("#messenger-root")) === null || _a === void 0 ? void 0 : _a.classList.remove("open");
        });
    }
}
exports.Messenger = Messenger;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmVwb3MvcmVwb3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvYXNzZXJ0LnRzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL2Vycm9yLWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvaHR0cC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL2FkZC11c2VyLWZvcm0vYWRkLXVzZXItZm9ybS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvbWVzc2VuZ2VyL21lc3Nlbmdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztR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QUssQ0FBQztpQkFDbkQsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsYUFBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3RCLE9BQU8sRUFBRSw0Q0FBNEM7aUJBQ3RELENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxFQUFFO0lBQ1AsQ0FBQztDQUNGO0FBckNELGtDQXFDQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDRCx5RkFBNEM7QUFFNUMsTUFBYSxTQUFTO0lBQ3BCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFTyxJQUFJO1FBQ1YsYUFBSyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7WUFDOUIsY0FBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNqRSxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDM0QsSUFBSSxPQUFPO2dCQUFFLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxRQUFROztRQUNiLGNBQVE7YUFDTCxhQUFhLENBQUMsa0JBQWtCLENBQUMsMENBQ2hDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7O1lBQy9CLGNBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDdEUsQ0FBQyxFQUFFO0lBQ1AsQ0FBQztDQUNGO0FBckJELDhCQXFCQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHtcclxuICBJUmVwb3NSZXNwb25zZSxcclxuICBJUmVwb3MsXHJcbiAgSUZvcm1EYXRhLFxyXG59IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3JlcG9zLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBIdHRwIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvaHR0cFwiO1xyXG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL2V2ZW50XCI7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdXRpbHNcIjtcclxuLyoqXHJcbiAqIFJlcG9zIFdlYiBDdXN0b20gQ29tcG9uZW50IENsYXNzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVwb3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgcHJpdmF0ZSBfc2hhZG93QXR0YWNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBwcml2YXRlIF9mb3JtRGF0YTogSUZvcm1EYXRhID0ge1xyXG4gICAgdXNlck5hbWU6IFwiXCIsXHJcbiAgICB1cGRhdGVkOiBcIlwiLFxyXG4gICAgaWQoKSB7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLnVzZXJOYW1lfS0ke3RoaXMudXBkYXRlZH1gLnJlcGxhY2UoL1xcLi9nLCBcIi1cIik7XHJcbiAgICB9LFxyXG4gIH07XHJcbiAgLyoqXHJcbiAgICogVXNlciByZXBvcyB2YXJpYWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3JlcG9zOiBJUmVwb3NbXSA9IFtdO1xyXG4gIC8qKlxyXG4gICAqIEF0dGFjaGVkIGVsZW1lbnQgbmFtZXMgdG8gdGhlIHNoYWRvd1xyXG4gICAqL1xyXG4gIHByaXZhdGUgX2VsZW1lbnRzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICAvKipcclxuICAgICAqIEN1c3RvbSBldmVudCBsaXN0ZW5lciBmb3Igc3RyZWFtIGZyb20gZGF0YSBmcm9tIGFkZCB1c2VyIGZvcm0gdG8gY3JlYXRlIHJlcG9zIGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgRXZlbnQub24oXCJDUkVBVEUgVVNFUiBSRVBPU1wiLCAoZXZlbnQ6IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgICB0aGlzLl9mb3JtRGF0YSA9IHsgLi4udGhpcy5fZm9ybURhdGEsIC4uLmV2ZW50IH07XHJcbiAgICAgIHRoaXMuX29uR2V0VXNlclJlcG9zKHRoaXMuX2Zvcm1EYXRhLnVzZXJOYW1lKTtcclxuICAgIH0pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDdXN0b20gZXZlbnQgbGlzdGVuZXIgZm9yIHNob3cgaGlkZSByZXBvcyBsaXN0XHJcbiAgICAgKi9cclxuICAgIEV2ZW50Lm9uKFwiQ09MTEFQU0VcIiwgKGV2ZW50OiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgbGV0IHRhYmxlID0gdGhpcy5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yKGAjYXJ0aWNsZS0ke2V2ZW50LmlkfWApO1xyXG4gICAgICB0YWJsZT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwib3BlblwiKVxyXG4gICAgICAgID8gdGFibGUuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIilcclxuICAgICAgICA6IHRhYmxlPy5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuICAgIH0pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDdXN0b20gZXZlbnQgbGlzdGVuZXIgZm9yIHJlbW92ZSB1c2VyIHJlcG9zXHJcbiAgICAgKi9cclxuICAgIEV2ZW50Lm9uKFwiUkVNT1ZFXCIsIChldmVudDogYW55KTogdm9pZCA9PiB7XHJcbiAgICAgIHRoaXMuc2hhZG93Um9vdD8ucmVtb3ZlQ2hpbGQoZXZlbnQuZWxlbWVudCk7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzID0gdGhpcy5fZWxlbWVudHMuZmlsdGVyKFxyXG4gICAgICAgIChpdGVtOiBzdHJpbmcpID0+IGl0ZW0gIT09IGV2ZW50LmlkXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIGZvciBzZW5kIHJlcXVlc3QgZm9yIGdldCB1c2VyIHJlcG9zXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uR2V0VXNlclJlcG9zKHVzZXI6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgSHR0cC5nZXQoYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvJHt1c2VyfS9yZXBvcz9zb3J0PXVwZGF0ZWRgKS50aGVuKFxyXG4gICAgICAocmVwb3M6IElSZXBvc1Jlc3BvbnNlW10pID0+IHtcclxuICAgICAgICBpZiAocmVwb3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLl9wcmVwYXJlUmVwb3NEYXRhKHJlcG9zKTtcclxuICAgICAgICAgIHRoaXMuX2NyZWF0ZVVzZXJSZXBvRWxlbWVudCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBFdmVudC5lbWl0KFwiTUVTU0VOR0VSXCIsIHtcclxuICAgICAgICAgICAgbWVzc2FnZTogYENhbm5vdCBmaW5kIFwiJHt1c2VyfVwiIHVzZXJgLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBNZXRob2QgZm9yIGZpbHRlcmluZyByZXNwb25zZSB0byB2aWV3IHJlcXVpcmVtZW50c1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHJlcG9zXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcHJlcGFyZVJlcG9zRGF0YShyZXBvczogSVJlcG9zUmVzcG9uc2VbXSk6IHZvaWQge1xyXG4gICAgdGhpcy5fcmVwb3MgPSBVdGlscy5tYXBSZXNwb25zZShyZXBvcywgW1xyXG4gICAgICBcIm5hbWVcIixcclxuICAgICAgXCJkZXNjcmlwdGlvblwiLFxyXG4gICAgICBcInVwZGF0ZWRfYXRcIixcclxuICAgICAgXCJnaXRfdXJsXCIsXHJcbiAgICBdKTtcclxuXHJcbiAgICB0aGlzLl9yZXBvcyA9IHRoaXMuX3JlcG9zLmZpbHRlcigoaXRlbTogYW55KTogYm9vbGVhbiA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbHRlclVwZGF0ZSA9IG5ldyBEYXRlKHRoaXMuX2Zvcm1EYXRhLnVwZGF0ZWQpLmdldFRpbWUoKTtcclxuICAgICAgY29uc3QgaXRlbVVwZGF0ZWQgPSBuZXcgRGF0ZShpdGVtLnVwZGF0ZWRfYXQpLmdldFRpbWUoKTtcclxuICAgICAgcmV0dXJuIGZpbHRlclVwZGF0ZSA8IGl0ZW1VcGRhdGVkO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgYXR0YWNoIGZpcnN0IGVsZW1lbnQgdG8gc2hhZG93XHJcbiAgICpcclxuICAgKiBAcGFyYW0gdGVtcGxhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9hdHRhY2hGaXJzdEVsZW1lbnQodGVtcGxhdGU6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLl9zaGFkb3dBdHRhY2hlZCA9IHRydWU7XHJcbiAgICB0aGlzLl9lbGVtZW50cy5wdXNoKHRoaXMuX2Zvcm1EYXRhLmlkLmJpbmQodGhpcy5fZm9ybURhdGEpKCkpO1xyXG4gICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KS5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgYXR0YWNoIG5leHQgZWxlbWVudCB0byBzaGFkb3dcclxuICAgKlxyXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2F0dGFjaE5leHRFbGVtZW50KHRlbXBsYXRlOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5fZWxlbWVudHMucHVzaCh0aGlzLl9mb3JtRGF0YS5pZC5iaW5kKHRoaXMuX2Zvcm1EYXRhKSgpKTtcclxuICAgIHRoaXMuc2hhZG93Um9vdD8uYXBwZW5kQ2hpbGQodGVtcGxhdGUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBNZXRob2QgZm9yIGNyZWF0ZSByZXBvcyBlbGVtZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfY3JlYXRlVXNlclJlcG9FbGVtZW50KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3JlcG9zLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLl9jcmVhdGVVc2VyUmVwb0VsZW1lbnRTdHJhdGVneShcclxuICAgICAgICBVdGlscy5idWlsZFRlbXBsYXRlKHRoaXMuX2Zvcm1EYXRhLCB0aGlzLl9yZXBvcylcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIEV2ZW50LmVtaXQoXCJNRVNTRU5HRVJcIiwge1xyXG4gICAgICAgIG1lc3NhZ2U6IGBObyByZXBvcyBhZnRlciAke3RoaXMuX2Zvcm1EYXRhLnVwZGF0ZWR9YCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgZGVjaWRlZCB3YXkgdG8gY3JlYXRlIHJlcG9zIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2NyZWF0ZVVzZXJSZXBvRWxlbWVudFN0cmF0ZWd5KHRlbXBsYXRlOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgbGV0IGNoZWNrU2hhZG93SXNBdHRhY2hlZCA9IHRoaXMuX3NoYWRvd0F0dGFjaGVkO1xyXG4gICAgbGV0IGNoZWNrUmVwb3NJc1VuaXF1ZSA9IHRoaXMuX2VsZW1lbnRzLmZpbHRlcihcclxuICAgICAgKGl0ZW0pID0+IGl0ZW0gPT09IHRoaXMuX2Zvcm1EYXRhLmlkLmJpbmQodGhpcy5fZm9ybURhdGEpKClcclxuICAgICkubGVuZ3RoO1xyXG5cclxuICAgIGlmIChjaGVja1NoYWRvd0lzQXR0YWNoZWQpIHtcclxuICAgICAgaWYgKGNoZWNrUmVwb3NJc1VuaXF1ZSkge1xyXG4gICAgICAgIEV2ZW50LmVtaXQoXCJNRVNTRU5HRVJcIiwge1xyXG4gICAgICAgICAgbWVzc2FnZTogXCJVc2VyIGp1c3QgZXhpc3QhXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fYXR0YWNoTmV4dEVsZW1lbnQodGVtcGxhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9hdHRhY2hGaXJzdEVsZW1lbnQodGVtcGxhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFcnJvckh1bmRsZXIgfSBmcm9tIFwiLi9lcnJvci1oYW5kbGVyXCI7XHJcbi8qKlxyXG4gKiBDbGFzcyBmb3IgcHJldmVudCBkb24ndCBjYXVnaHQgZXJyb3JzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXNzZXJ0IHtcclxuICAvKipcclxuICAgKiBNZXRob2QgZm9yIHRyeSBydW4gaWYgY2FuIHdpdGNoIGNhdWdodCBlcnJvclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHJlc29sdmVcclxuICAgKiBAcGFyYW0gcmVqZWN0XHJcbiAgICovXHJcbiAgc3RhdGljIHRyeShyZXNvbHZlOiAoKSA9PiB2b2lkLCByZWplY3Q/OiAoZXJyb3I6IEVycm9yKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgaWYgKHJlamVjdCkgRXJyb3JIdW5kbGVyLnByaW50RXJyb3IoZXJyb3IpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDbGFzcyBmb3IgY2F0Y2ggZXJyb3JzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXJyb3JIdW5kbGVyIHtcclxuICAvKipcclxuICAgKiBNZXRob2QgZm9yIGNhdGNoIGVycm9yXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZXJyb3JcclxuICAgKi9cclxuICBzdGF0aWMgcHJpbnRFcnJvcihlcnJvcjogYW55KTogYW55IHtcclxuICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBFdmVudCBjbGFzcyBmb3IgY3JlYXRlIGFuZCBsaXN0ZW5pbmcgY3VzdG9tIGV2ZW50cyBzaW1wbGUgd2F5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnQge1xyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgZW1pdCBjdXN0b20gZXZlbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjaGFuZWxcclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKi9cclxuICBzdGF0aWMgZW1pdChjaGFuZWw6IHN0cmluZywgdmFsdWU/OiBhbnkpOiB2b2lkIHtcclxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICBuZXcgQ3VzdG9tRXZlbnQoY2hhbmVsLCB7XHJcbiAgICAgICAgZGV0YWlsOiB2YWx1ZSA/IHZhbHVlIDoge30sXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBNZXRob2QgZm9yIGNyZWF0ZSBjdXN0b20gZXZlbnQgbGlzdGVuZXJcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjaGFuZWxcclxuICAgKiBAcGFyYW0gY2FsbGJhY2tcclxuICAgKi9cclxuICBzdGF0aWMgb24oY2hhbmVsOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoY2hhbmVsLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICBjYWxsYmFjayhldmVudC5kZXRhaWwpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEVycm9ySHVuZGxlciB9IGZyb20gXCIuL2Vycm9yLWhhbmRsZXJcIjtcclxuLyoqXHJcbiAqIEh0dHAgY2xhc3MgZm9yIHNlbmQgcmVxdWVzdFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEh0dHAge1xyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgR0VUIHJlcXVlc3QgYW5kIGNhdGNoIGVycm9yIGluIG9uZSBwbGFjZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVybFxyXG4gICAqL1xyXG4gIHN0YXRpYyBhc3luYyBnZXQodXJsOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIEVycm9ySHVuZGxlci5wcmludEVycm9yKGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi9ldmVudFwiO1xyXG5pbXBvcnQgeyBJUmVwb3MsIElGb3JtRGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3JlcG9zLmludGVyZmFjZVwiO1xyXG4vKipcclxuICogVXRpbHMgY2xhc3MgZm9yIHJldXNhYmxlIGxvZ2ljXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXRpbHMge1xyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgbWFwcGluZyB3aXRoIHNpbXBsZSB3YXlcclxuICAgKlxyXG4gICAqIEBwYXJhbSBpbnB1dEFycmF5XHJcbiAgICogQHBhcmFtIGFyZ3NcclxuICAgKi9cclxuICBzdGF0aWMgbWFwUmVzcG9uc2UoaW5wdXRBcnJheTogYW55W10sIGFyZ3M6IHN0cmluZ1tdKTogYW55W10ge1xyXG4gICAgcmV0dXJuIGlucHV0QXJyYXkubWFwKFxyXG4gICAgICAoaXRlbSk6IE9iamVjdCA9PiB7XHJcbiAgICAgICAgbGV0IG91dHB1dCA9IHt9O1xyXG4gICAgICAgIGFyZ3MuZm9yRWFjaCgoYXJnOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICAgIG91dHB1dFthcmcudG9TdHJpbmcoKV0gPSBpdGVtW2FyZy50b1N0cmluZygpXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBNZXRob2QgZm9yIEJ1aWxkIFRhYmxlIGZyb20gaGVhZGVyIGFuZCBib2R5IGlucHV0c1xyXG4gICAqXHJcbiAgICogQHBhcmFtIGhlYWRlclxyXG4gICAqIEBwYXJhbSBib2R5XHJcbiAgICovXHJcbiAgc3RhdGljIGJ1aWxkVGFibGUoaGVhZGVyOiBzdHJpbmdbXSwgYm9keTogYW55W10pOiBIVE1MVGFibGVFbGVtZW50IHtcclxuICAgIGxldCB2aWV3ID0ge1xyXG4gICAgICB0cjogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpLFxyXG4gICAgICB0YWJsZTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpLFxyXG4gICAgICB0YWJsZUhlYWQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aGVhZFwiKSxcclxuICAgICAgdGFibGVCb2R5OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiksXHJcbiAgICB9O1xyXG5cclxuICAgIGhlYWRlci5mb3JFYWNoKCh0aCkgPT4ge1xyXG4gICAgICB2aWV3LnRyLmlubmVySFRNTCArPSBgPHRoPiR7dGh9PC90aD5gO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYm9keS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIHZpZXcudGFibGVCb2R5LmlubmVySFRNTCArPSBgXHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICA8dGQ+JHtpdGVtLm5hbWV9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+JHtpdGVtLmRlc2NyaXB0aW9uID8gaXRlbS5kZXNjcmlwdGlvbiA6IFwiXCJ9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+JHt0aGlzLmJ1aWxkRGF0ZVN0cmluZyhpdGVtLnVwZGF0ZWRfYXQpfTwvdGQ+XHJcbiAgICAgICAgICAgICAgPHRkPiR7aXRlbS5naXRfdXJsfTwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICBgO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmlldy50YWJsZUhlYWQuYXBwZW5kQ2hpbGQodmlldy50cik7XHJcbiAgICB2aWV3LnRhYmxlLmFwcGVuZENoaWxkKHZpZXcudGFibGVIZWFkKTtcclxuICAgIHZpZXcudGFibGUuYXBwZW5kQ2hpbGQodmlldy50YWJsZUJvZHkpO1xyXG5cclxuICAgIHJldHVybiB2aWV3LnRhYmxlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBNZXRob2QgZm9yIEJ1aWxkIFRlbXBsYXRlIGZyb20gdXNlck5hbWUgYW5kIHJlcG9zIEFycmF5XHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlck5hbWVcclxuICAgKiBAcGFyYW0gcmVwb3NcclxuICAgKi9cclxuICBzdGF0aWMgYnVpbGRUZW1wbGF0ZShmb3JtRGF0YTogSUZvcm1EYXRhLCByZXBvczogSVJlcG9zW10pOiBIVE1MRWxlbWVudCB7XHJcbiAgICBsZXQgdmlldyA9IHtcclxuICAgICAgdGVtcGxhdGU6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJyZXBvc1wiKSxcclxuICAgICAgaGVhZGVyOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpLFxyXG4gICAgICBhcnRpY2xlOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKSxcclxuICAgICAgY29sbGFwc2VCdXR0b246IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiksXHJcbiAgICAgIHJlbW92ZUJ1dHRvbjogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSxcclxuICAgIH07XHJcbiAgICB2aWV3LnRlbXBsYXRlLmlubmVySFRNTCA9IGBcclxuICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9zdHlsZXMvcmVwb3MuY3NzXCI+XHJcbiAgICBgO1xyXG4gICAgdmlldy5oZWFkZXIuaW5uZXJIVE1MID0gYDxoMj4ke2Zvcm1EYXRhLnVzZXJOYW1lfSAke2Zvcm1EYXRhLnVwZGF0ZWR9PC9oMj5gO1xyXG5cclxuICAgIHZpZXcuY29sbGFwc2VCdXR0b24uaW5uZXJIVE1MID0gYDxpbWcgc3JjPScvYXNzZXRzL2ljb25zL2Ryb3AtZG93bi5zdmcnPmA7XHJcbiAgICB2aWV3LmNvbGxhcHNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoXHJcbiAgICAgIGV2ZW50OiBNb3VzZUV2ZW50XHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoXCJjb2xsYXBzZWRcIilcclxuICAgICAgICA/IHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcImNvbGxhcHNlZFwiKVxyXG4gICAgICAgIDogdGhpcy5jbGFzc0xpc3QuYWRkKFwiY29sbGFwc2VkXCIpO1xyXG5cclxuICAgICAgRXZlbnQuZW1pdChcIkNPTExBUFNFXCIsIHsgaWQ6IGZvcm1EYXRhLmlkLmJpbmQoZm9ybURhdGEpKCkgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2aWV3LnJlbW92ZUJ1dHRvbi5pbm5lckhUTUwgPSBgPGltZyBzcmM9Jy9hc3NldHMvaWNvbnMvcmVtb3ZlLnN2Zyc+YDtcclxuICAgIHZpZXcucmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoXHJcbiAgICAgIGV2ZW50OiBNb3VzZUV2ZW50XHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgRXZlbnQuZW1pdChcIlJFTU9WRVwiLCB7XHJcbiAgICAgICAgaWQ6IGZvcm1EYXRhLmlkLmJpbmQoZm9ybURhdGEpKCksXHJcbiAgICAgICAgZWxlbWVudDogdmlldy50ZW1wbGF0ZSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2aWV3LnRlbXBsYXRlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicmVwb3NcIik7XHJcbiAgICB2aWV3LnRlbXBsYXRlLnNldEF0dHJpYnV0ZShcImRhdGEtdXNlclwiLCBmb3JtRGF0YS51c2VyTmFtZSk7XHJcbiAgICB2aWV3LnRlbXBsYXRlLnNldEF0dHJpYnV0ZShcImRhdGEtdXBkYXRlXCIsIGZvcm1EYXRhLnVwZGF0ZWQudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgdmlldy5hcnRpY2xlLnNldEF0dHJpYnV0ZShcImlkXCIsIGBhcnRpY2xlLSR7Zm9ybURhdGEuaWQuYmluZChmb3JtRGF0YSkoKX1gKTtcclxuXHJcbiAgICB2aWV3LmhlYWRlci5hcHBlbmRDaGlsZCh2aWV3LmNvbGxhcHNlQnV0dG9uKTtcclxuICAgIHZpZXcuaGVhZGVyLmFwcGVuZENoaWxkKHZpZXcucmVtb3ZlQnV0dG9uKTtcclxuICAgIHZpZXcuYXJ0aWNsZS5hcHBlbmRDaGlsZChcclxuICAgICAgVXRpbHMuYnVpbGRUYWJsZShbXCJuYW1lXCIsIFwiZGVzY3JpcHRpb25cIiwgXCJ1cGRhdGVkIGF0XCIsIFwiZ2l0IHVybFwiXSwgcmVwb3MpXHJcbiAgICApO1xyXG5cclxuICAgIHZpZXcudGVtcGxhdGUuYXBwZW5kQ2hpbGQodmlldy5oZWFkZXIpO1xyXG4gICAgdmlldy50ZW1wbGF0ZS5hcHBlbmRDaGlsZCh2aWV3LmFydGljbGUpO1xyXG5cclxuICAgIHJldHVybiB2aWV3LnRlbXBsYXRlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBNZXRob2QgZm9yIGJ1aWxkIHN0cmluZyBpbiBjdXN0b20gRGF0ZSBmb3JtYXRcclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRlXHJcbiAgICovXHJcbiAgc3RhdGljIGJ1aWxkRGF0ZVN0cmluZyhkYXRlOiBEYXRlIHwgc3RyaW5nIHwgbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlKS50b0xvY2FsZVN0cmluZyhuYXZpZ2F0b3IubGFuZ3VhZ2UsIHtcclxuICAgICAgZGF5OiBcIjItZGlnaXRcIixcclxuICAgICAgbW9udGg6IFwiMi1kaWdpdFwiLFxyXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSZXBvcyB9IGZyb20gXCIuL2NvbXBvbmVudHMvcmVwb3MvcmVwb3NcIjtcclxuaW1wb3J0IHsgQWRkVXNlckZvcm0gfSBmcm9tIFwiLi92aWV3cy9hZGQtdXNlci1mb3JtL2FkZC11c2VyLWZvcm1cIjtcclxuaW1wb3J0IHsgTWVzc2VuZ2VyIH0gZnJvbSBcIi4vdmlld3MvbWVzc2VuZ2VyL21lc3NlbmdlclwiO1xyXG4vKipcclxuICogV2luZG93IHJlYWR5XHJcbiAqXHJcbiAqIEBwYXJhbSBlXHJcbiAqL1xyXG53aW5kb3cub25sb2FkID0gKGU6IEV2ZW50KSA9PiB7XHJcbiAgLyoqXHJcbiAgICogQWRkaW5nIGN1c3RvdyBlbGVtZW50c1xyXG4gICAqL1xyXG4gIGN1c3RvbUVsZW1lbnRzLmRlZmluZShcInJlcG9zLWVsZW1lbnRcIiwgUmVwb3MpO1xyXG4gIC8qKlxyXG4gICAqIEFkZCB1c2VyIGZvcm0gdGVtcGxhdGUgaW5zdGFuY2VcclxuICAgKi9cclxuICBuZXcgQWRkVXNlckZvcm0oKTtcclxuICAvKipcclxuICAgKiBNZXNzZW5nZXIgaW5zdGFuY2VcclxuICAgKi9cclxuICBuZXcgTWVzc2VuZ2VyKCk7XHJcbn07XHJcbiIsImltcG9ydCB7IEFzc2VydCB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL2Fzc2VydFwiO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3V0aWxzXCI7XHJcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvZXZlbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBZGRVc2VyRm9ybSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLm9uU3VibWl0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25TdWJtaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCB1c2VyRGF0YUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjYWRkLXVzZXItcmVwb3NfX3VzZXJcIlxyXG4gICAgKSBhcyBhbnk7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjYWRkLXVzZXItcmVwb3NfX3VwZGF0ZWRcIlxyXG4gICAgKSBhcyBhbnk7XHJcblxyXG4gICAgZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXVzZXItcmVwb3NfX3N1Ym1pdFwiKVxyXG4gICAgICA/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2hlY2tDb3JyZWN0VmFsdWVzID1cclxuICAgICAgICAgIHVzZXJEYXRhSW5wdXQudmFsdWUgJiZcclxuICAgICAgICAgIHVwZGF0ZWRJbnB1dC52YWx1ZSAmJlxyXG4gICAgICAgICAgQXNzZXJ0LnRyeSgoKSA9PiBuZXcgRGF0ZSh1cGRhdGVkSW5wdXQudmFsdWUpLmdldFRpbWUoKSkgJiZcclxuICAgICAgICAgICFpc05hTihuZXcgRGF0ZSh1cGRhdGVkSW5wdXQudmFsdWUpLmdldFRpbWUoKSk7XHJcblxyXG4gICAgICAgIGlmIChjaGVja0NvcnJlY3RWYWx1ZXMpIHtcclxuICAgICAgICAgIEV2ZW50LmVtaXQoXCJDUkVBVEUgVVNFUiBSRVBPU1wiLCB7XHJcbiAgICAgICAgICAgIHVzZXJOYW1lOiB1c2VyRGF0YUlucHV0LnZhbHVlLFxyXG4gICAgICAgICAgICB1cGRhdGVkOiBVdGlscy5idWlsZERhdGVTdHJpbmcodXBkYXRlZElucHV0LnZhbHVlKSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBFdmVudC5lbWl0KFwiTUVTU0VOR0VSXCIsIHtcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJQbGVhc2UgcmVhZCBjb3JyZWN0IHVzZXIgYW5kIHVwZGF0ZSBpbnB1dHNcIixcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvZXZlbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNZXNzZW5nZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5vblN1Ym1pdCgpO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICBFdmVudC5vbihcIk1FU1NFTkdFUlwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzZW5nZXItcm9vdFwiKT8uY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XHJcbiAgICAgIGxldCBtZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzZW5nZXItbWVzc2FnZVwiKTtcclxuICAgICAgaWYgKG1lc3NhZ2UpIG1lc3NhZ2UuaW5uZXJIVE1MID0gZXZlbnQubWVzc2FnZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uU3VibWl0KCk6IHZvaWQge1xyXG4gICAgZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2VuZ2VyLWNsb3NlXCIpXHJcbiAgICAgID8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3Nlbmdlci1yb290XCIpPy5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=