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
        this._createUserRepoElementStrategy(utils_1.Utils.buildTemplate(this._formData, this._repos));
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
class Assert {
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
const assert_1 = __webpack_require__(/*! ./../helpers/assert */ "./src/helpers/assert.ts");
const utils_1 = __webpack_require__(/*! ./../helpers/utils */ "./src/helpers/utils.ts");
const event_1 = __webpack_require__(/*! ../helpers/event */ "./src/helpers/event.ts");
class AddUserForm {
    constructor() {
        this.onSubmit();
    }
    onSubmit() {
        const userDataInput = document.querySelector("#add-user-repos__user");
        const updatedInput = document.querySelector("#add-user-repos__updated");
        const btn = document.querySelector("#add-user-repos__submit");
        btn.addEventListener("click", (e) => {
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
                console.log("Please read correct user and update inputs");
            }
        });
    }
}
exports.AddUserForm = AddUserForm;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmVwb3MvcmVwb3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvYXNzZXJ0LnRzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL2Vycm9yLWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvaHR0cC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL2FkZC11c2VyLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdFQSxzRkFBMEM7QUFDMUMseUZBQTRD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Q0FBQyx5QkFBeUIsQ0FBUSxDQUFDO1FBQ3JFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNsQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFbkIsTUFBTSxrQkFBa0IsR0FDdEIsYUFBYSxDQUFDLEtBQUs7Z0JBQ25CLFlBQVksQ0FBQyxLQUFLO2dCQUNsQixlQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDeEQsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFakQsSUFBSSxrQkFBa0IsRUFBRTtnQkFDdEIsYUFBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtvQkFDOUIsUUFBUSxFQUFFLGFBQWEsQ0FBQyxLQUFLO29CQUM3QixPQUFPLEVBQUUsYUFBSyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2lCQUNuRCxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7YUFDM0Q7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWxDRCxrQ0FrQ0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7XHJcbiAgSVJlcG9zUmVzcG9uc2UsXHJcbiAgSVJlcG9zLFxyXG4gIElGb3JtRGF0YSxcclxufSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9yZXBvcy5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSHR0cCB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL2h0dHBcIjtcclxuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9ldmVudFwiO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3V0aWxzXCI7XHJcbi8qKlxyXG4gKiBSZXBvcyBXZWIgQ3VzdG9tIENvbXBvbmVudCBDbGFzc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJlcG9zIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gIHByaXZhdGUgX3NoYWRvd0F0dGFjaGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfZm9ybURhdGE6IElGb3JtRGF0YSA9IHtcclxuICAgIHVzZXJOYW1lOiBcIlwiLFxyXG4gICAgdXBkYXRlZDogXCJcIixcclxuICAgIGlkKCkge1xyXG4gICAgICByZXR1cm4gYCR7dGhpcy51c2VyTmFtZX0tJHt0aGlzLnVwZGF0ZWR9YC5yZXBsYWNlKC9cXC4vZywgXCItXCIpO1xyXG4gICAgfSxcclxuICB9O1xyXG4gIC8qKlxyXG4gICAqIFVzZXIgcmVwb3MgdmFyaWFibGVcclxuICAgKi9cclxuICBwcml2YXRlIF9yZXBvczogSVJlcG9zW10gPSBbXTtcclxuICAvKipcclxuICAgKiBBdHRhY2hlZCBlbGVtZW50IG5hbWVzIHRvIHRoZSBzaGFkb3dcclxuICAgKi9cclxuICBwcml2YXRlIF9lbGVtZW50czogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDdXN0b20gZXZlbnQgbGlzdGVuZXIgZm9yIHN0cmVhbSBmcm9tIGRhdGEgZnJvbSBhZGQgdXNlciBmb3JtIHRvIGNyZWF0ZSByZXBvcyBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIEV2ZW50Lm9uKFwiQ1JFQVRFIFVTRVIgUkVQT1NcIiwgKGV2ZW50OiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgdGhpcy5fZm9ybURhdGEgPSB7IC4uLnRoaXMuX2Zvcm1EYXRhLCAuLi5ldmVudCB9O1xyXG4gICAgICB0aGlzLl9vbkdldFVzZXJSZXBvcyh0aGlzLl9mb3JtRGF0YS51c2VyTmFtZSk7XHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogQ3VzdG9tIGV2ZW50IGxpc3RlbmVyIGZvciBzaG93IGhpZGUgcmVwb3MgbGlzdFxyXG4gICAgICovXHJcbiAgICBFdmVudC5vbihcIkNPTExBUFNFXCIsIChldmVudDogYW55KTogdm9pZCA9PiB7XHJcbiAgICAgIGxldCB0YWJsZSA9IHRoaXMuc2hhZG93Um9vdD8ucXVlcnlTZWxlY3RvcihgI2FydGljbGUtJHtldmVudC5pZH1gKTtcclxuICAgICAgdGFibGU/LmNsYXNzTGlzdC5jb250YWlucyhcIm9wZW5cIilcclxuICAgICAgICA/IHRhYmxlLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpXHJcbiAgICAgICAgOiB0YWJsZT8uY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogQ3VzdG9tIGV2ZW50IGxpc3RlbmVyIGZvciByZW1vdmUgdXNlciByZXBvc1xyXG4gICAgICovXHJcbiAgICBFdmVudC5vbihcIlJFTU9WRVwiLCAoZXZlbnQ6IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgICB0aGlzLnNoYWRvd1Jvb3Q/LnJlbW92ZUNoaWxkKGV2ZW50LmVsZW1lbnQpO1xyXG4gICAgICB0aGlzLl9lbGVtZW50cyA9IHRoaXMuX2VsZW1lbnRzLmZpbHRlcihcclxuICAgICAgICAoaXRlbTogc3RyaW5nKSA9PiBpdGVtICE9PSBldmVudC5pZFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3Igc2VuZCByZXF1ZXN0IGZvciBnZXQgdXNlciByZXBvc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHVzZXJcclxuICAgKi9cclxuICBwcml2YXRlIF9vbkdldFVzZXJSZXBvcyh1c2VyOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIEh0dHAuZ2V0KGBodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzLyR7dXNlcn0vcmVwb3M/c29ydD11cGRhdGVkYCkudGhlbihcclxuICAgICAgKHJlcG9zOiBJUmVwb3NSZXNwb25zZVtdKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlcG9zLmxlbmd0aCkge1xyXG4gICAgICAgICAgdGhpcy5fcHJlcGFyZVJlcG9zRGF0YShyZXBvcyk7XHJcbiAgICAgICAgICB0aGlzLl9jcmVhdGVVc2VyUmVwb0VsZW1lbnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYENhbm5vdCBmaW5kIFwiJHt1c2VyfVwiIHVzZXJgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgZmlsdGVyaW5nIHJlc3BvbnNlIHRvIHZpZXcgcmVxdWlyZW1lbnRzXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcmVwb3NcclxuICAgKi9cclxuICBwcml2YXRlIF9wcmVwYXJlUmVwb3NEYXRhKHJlcG9zOiBJUmVwb3NSZXNwb25zZVtdKTogdm9pZCB7XHJcbiAgICB0aGlzLl9yZXBvcyA9IFV0aWxzLm1hcFJlc3BvbnNlKHJlcG9zLCBbXHJcbiAgICAgIFwibmFtZVwiLFxyXG4gICAgICBcImRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIFwidXBkYXRlZF9hdFwiLFxyXG4gICAgICBcImdpdF91cmxcIixcclxuICAgIF0pO1xyXG5cclxuICAgIHRoaXMuX3JlcG9zID0gdGhpcy5fcmVwb3MuZmlsdGVyKChpdGVtOiBhbnkpOiBib29sZWFuID0+IHtcclxuICAgICAgY29uc3QgZmlsdGVyVXBkYXRlID0gbmV3IERhdGUodGhpcy5fZm9ybURhdGEudXBkYXRlZCkuZ2V0VGltZSgpO1xyXG4gICAgICBjb25zdCBpdGVtVXBkYXRlZCA9IG5ldyBEYXRlKGl0ZW0udXBkYXRlZF9hdCkuZ2V0VGltZSgpO1xyXG4gICAgICByZXR1cm4gZmlsdGVyVXBkYXRlIDwgaXRlbVVwZGF0ZWQ7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIGZvciBhdHRhY2ggZmlyc3QgZWxlbWVudCB0byBzaGFkb3dcclxuICAgKlxyXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2F0dGFjaEZpcnN0RWxlbWVudCh0ZW1wbGF0ZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuX3NoYWRvd0F0dGFjaGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuX2VsZW1lbnRzLnB1c2godGhpcy5fZm9ybURhdGEuaWQuYmluZCh0aGlzLl9mb3JtRGF0YSkoKSk7XHJcbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pLmFwcGVuZENoaWxkKHRlbXBsYXRlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIGZvciBhdHRhY2ggbmV4dCBlbGVtZW50IHRvIHNoYWRvd1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHRlbXBsYXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYXR0YWNoTmV4dEVsZW1lbnQodGVtcGxhdGU6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLl9lbGVtZW50cy5wdXNoKHRoaXMuX2Zvcm1EYXRhLmlkLmJpbmQodGhpcy5fZm9ybURhdGEpKCkpO1xyXG4gICAgdGhpcy5zaGFkb3dSb290Py5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgY3JlYXRlIHJlcG9zIGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIF9jcmVhdGVVc2VyUmVwb0VsZW1lbnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9jcmVhdGVVc2VyUmVwb0VsZW1lbnRTdHJhdGVneShcclxuICAgICAgVXRpbHMuYnVpbGRUZW1wbGF0ZSh0aGlzLl9mb3JtRGF0YSwgdGhpcy5fcmVwb3MpXHJcbiAgICApO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBNZXRob2QgZm9yIGRlY2lkZWQgd2F5IHRvIGNyZWF0ZSByZXBvcyBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcGFyYW0gdGVtcGxhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9jcmVhdGVVc2VyUmVwb0VsZW1lbnRTdHJhdGVneSh0ZW1wbGF0ZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGxldCBjaGVja1NoYWRvd0lzQXR0YWNoZWQgPSB0aGlzLl9zaGFkb3dBdHRhY2hlZDtcclxuICAgIGxldCBjaGVja1JlcG9zSXNVbmlxdWUgPSB0aGlzLl9lbGVtZW50cy5maWx0ZXIoXHJcbiAgICAgIChpdGVtKSA9PiBpdGVtID09PSB0aGlzLl9mb3JtRGF0YS5pZC5iaW5kKHRoaXMuX2Zvcm1EYXRhKSgpXHJcbiAgICApLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoY2hlY2tTaGFkb3dJc0F0dGFjaGVkKSB7XHJcbiAgICAgIGlmIChjaGVja1JlcG9zSXNVbmlxdWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlVzZXIganVzdCBleGlzdCAhXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2F0dGFjaE5leHRFbGVtZW50KHRlbXBsYXRlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fYXR0YWNoRmlyc3RFbGVtZW50KHRlbXBsYXRlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXJyb3JIdW5kbGVyIH0gZnJvbSBcIi4vZXJyb3ItaGFuZGxlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFzc2VydCB7XHJcbiAgc3RhdGljIHRyeShyZXNvbHZlOiAoKSA9PiB2b2lkLCByZWplY3Q/OiAoZXJyb3I6IEVycm9yKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgaWYgKHJlamVjdCkgRXJyb3JIdW5kbGVyLnByaW50RXJyb3IoZXJyb3IpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBFcnJvckh1bmRsZXIge1xyXG4gIHN0YXRpYyBwcmludEVycm9yKGVycm9yOiBhbnkpOiBhbnkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEV2ZW50IGNsYXNzIGZvciBjcmVhdGUgYW5kIGxpc3RlbmluZyBjdXN0b20gZXZlbnRzIHNpbXBsZSB3YXlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBFdmVudCB7XHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIGZvciBlbWl0IGN1c3RvbSBldmVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNoYW5lbFxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBlbWl0KGNoYW5lbDogc3RyaW5nLCB2YWx1ZT86IGFueSk6IHZvaWQge1xyXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgIG5ldyBDdXN0b21FdmVudChjaGFuZWwsIHtcclxuICAgICAgICBkZXRhaWw6IHZhbHVlID8gdmFsdWUgOiB7fSxcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgY3JlYXRlIGN1c3RvbSBldmVudCBsaXN0ZW5lclxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNoYW5lbFxyXG4gICAqIEBwYXJhbSBjYWxsYmFja1xyXG4gICAqL1xyXG4gIHN0YXRpYyBvbihjaGFuZWw6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihjaGFuZWwsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIGNhbGxiYWNrKGV2ZW50LmRldGFpbCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXJyb3JIdW5kbGVyIH0gZnJvbSBcIi4vZXJyb3ItaGFuZGxlclwiO1xyXG4vKipcclxuICogSHR0cCBjbGFzcyBmb3Igc2VuZCByZXF1ZXN0IGFuZCBjYXRjaCBlcnJvciBpbiBvbmUgcGxhY2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBIdHRwIHtcclxuICBzdGF0aWMgZ2V0KHVybDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBmZXRjaCh1cmwpXHJcbiAgICAgIC50aGVuKChyZXNwb25zZTogYW55KSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4gRXJyb3JIdW5kbGVyLnByaW50RXJyb3IoZXJyb3IpKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi9ldmVudFwiO1xyXG5pbXBvcnQgeyBJUmVwb3MsIElGb3JtRGF0YSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3JlcG9zLmludGVyZmFjZVwiO1xyXG4vKipcclxuICogVXRpbHMgY2xhc3MgZm9yIHJldXNhYmxlIGxvZ2ljXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXRpbHMge1xyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgbWFwcGluZyB3aXRoIHNpbXBsZSB3YXlcclxuICAgKlxyXG4gICAqIEBwYXJhbSBpbnB1dEFycmF5XHJcbiAgICogQHBhcmFtIGFyZ3NcclxuICAgKi9cclxuICBzdGF0aWMgbWFwUmVzcG9uc2UoaW5wdXRBcnJheTogYW55W10sIGFyZ3M6IHN0cmluZ1tdKTogYW55W10ge1xyXG4gICAgcmV0dXJuIGlucHV0QXJyYXkubWFwKFxyXG4gICAgICAoaXRlbSk6IE9iamVjdCA9PiB7XHJcbiAgICAgICAgbGV0IG91dHB1dCA9IHt9O1xyXG4gICAgICAgIGFyZ3MuZm9yRWFjaCgoYXJnOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICAgIG91dHB1dFthcmcudG9TdHJpbmcoKV0gPSBpdGVtW2FyZy50b1N0cmluZygpXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBNZXRob2QgZm9yIEJ1aWxkIFRhYmxlIGZyb20gaGVhZGVyIGFuZCBib2R5IGlucHV0c1xyXG4gICAqXHJcbiAgICogQHBhcmFtIGhlYWRlclxyXG4gICAqIEBwYXJhbSBib2R5XHJcbiAgICovXHJcbiAgc3RhdGljIGJ1aWxkVGFibGUoaGVhZGVyOiBzdHJpbmdbXSwgYm9keTogYW55W10pOiBIVE1MVGFibGVFbGVtZW50IHtcclxuICAgIGxldCB2aWV3ID0ge1xyXG4gICAgICB0cjogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpLFxyXG4gICAgICB0YWJsZTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpLFxyXG4gICAgICB0YWJsZUhlYWQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aGVhZFwiKSxcclxuICAgICAgdGFibGVCb2R5OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiksXHJcbiAgICB9O1xyXG5cclxuICAgIGhlYWRlci5mb3JFYWNoKCh0aCkgPT4ge1xyXG4gICAgICB2aWV3LnRyLmlubmVySFRNTCArPSBgPHRoPiR7dGh9PC90aD5gO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYm9keS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIHZpZXcudGFibGVCb2R5LmlubmVySFRNTCArPSBgXHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICA8dGQ+JHtpdGVtLm5hbWV9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+JHtpdGVtLmRlc2NyaXB0aW9uID8gaXRlbS5kZXNjcmlwdGlvbiA6IFwiXCJ9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+JHt0aGlzLmJ1aWxkRGF0ZVN0cmluZyhpdGVtLnVwZGF0ZWRfYXQpfTwvdGQ+XHJcbiAgICAgICAgICAgICAgPHRkPiR7aXRlbS5naXRfdXJsfTwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICBgO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmlldy50YWJsZUhlYWQuYXBwZW5kQ2hpbGQodmlldy50cik7XHJcbiAgICB2aWV3LnRhYmxlLmFwcGVuZENoaWxkKHZpZXcudGFibGVIZWFkKTtcclxuICAgIHZpZXcudGFibGUuYXBwZW5kQ2hpbGQodmlldy50YWJsZUJvZHkpO1xyXG5cclxuICAgIHJldHVybiB2aWV3LnRhYmxlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBNZXRob2QgZm9yIEJ1aWxkIFRlbXBsYXRlIGZyb20gdXNlck5hbWUgYW5kIHJlcG9zIEFycmF5XHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXNlck5hbWVcclxuICAgKiBAcGFyYW0gcmVwb3NcclxuICAgKi9cclxuICBzdGF0aWMgYnVpbGRUZW1wbGF0ZShmb3JtRGF0YTogSUZvcm1EYXRhLCByZXBvczogSVJlcG9zW10pOiBIVE1MRWxlbWVudCB7XHJcbiAgICBsZXQgdmlldyA9IHtcclxuICAgICAgdGVtcGxhdGU6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJyZXBvc1wiKSxcclxuICAgICAgaGVhZGVyOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpLFxyXG4gICAgICBhcnRpY2xlOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKSxcclxuICAgICAgY29sbGFwc2VCdXR0b246IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiksXHJcbiAgICAgIHJlbW92ZUJ1dHRvbjogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKSxcclxuICAgIH07XHJcbiAgICB2aWV3LnRlbXBsYXRlLmlubmVySFRNTCA9IGBcclxuICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiL2Fzc2V0cy9zdHlsZXMvcmVwb3MuY3NzXCI+XHJcbiAgICBgO1xyXG4gICAgdmlldy5oZWFkZXIuaW5uZXJIVE1MID0gYDxoMj4ke2Zvcm1EYXRhLnVzZXJOYW1lfSAke2Zvcm1EYXRhLnVwZGF0ZWR9PC9oMj5gO1xyXG5cclxuICAgIHZpZXcuY29sbGFwc2VCdXR0b24uaW5uZXJIVE1MID0gYDxpbWcgc3JjPScvYXNzZXRzL2ljb25zL2Ryb3AtZG93bi5zdmcnPmA7XHJcbiAgICB2aWV3LmNvbGxhcHNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoXHJcbiAgICAgIGV2ZW50OiBNb3VzZUV2ZW50XHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoXCJjb2xsYXBzZWRcIilcclxuICAgICAgICA/IHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcImNvbGxhcHNlZFwiKVxyXG4gICAgICAgIDogdGhpcy5jbGFzc0xpc3QuYWRkKFwiY29sbGFwc2VkXCIpO1xyXG5cclxuICAgICAgRXZlbnQuZW1pdChcIkNPTExBUFNFXCIsIHsgaWQ6IGZvcm1EYXRhLmlkLmJpbmQoZm9ybURhdGEpKCkgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2aWV3LnJlbW92ZUJ1dHRvbi5pbm5lckhUTUwgPSBgPGltZyBzcmM9Jy9hc3NldHMvaWNvbnMvcmVtb3ZlLnN2Zyc+YDtcclxuICAgIHZpZXcucmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoXHJcbiAgICAgIGV2ZW50OiBNb3VzZUV2ZW50XHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgRXZlbnQuZW1pdChcIlJFTU9WRVwiLCB7XHJcbiAgICAgICAgaWQ6IGZvcm1EYXRhLmlkLmJpbmQoZm9ybURhdGEpKCksXHJcbiAgICAgICAgZWxlbWVudDogdmlldy50ZW1wbGF0ZSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2aWV3LnRlbXBsYXRlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicmVwb3NcIik7XHJcbiAgICB2aWV3LnRlbXBsYXRlLnNldEF0dHJpYnV0ZShcImRhdGEtdXNlclwiLCBmb3JtRGF0YS51c2VyTmFtZSk7XHJcbiAgICB2aWV3LnRlbXBsYXRlLnNldEF0dHJpYnV0ZShcImRhdGEtdXBkYXRlXCIsIGZvcm1EYXRhLnVwZGF0ZWQudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgdmlldy5hcnRpY2xlLnNldEF0dHJpYnV0ZShcImlkXCIsIGBhcnRpY2xlLSR7Zm9ybURhdGEuaWQuYmluZChmb3JtRGF0YSkoKX1gKTtcclxuXHJcbiAgICB2aWV3LmhlYWRlci5hcHBlbmRDaGlsZCh2aWV3LmNvbGxhcHNlQnV0dG9uKTtcclxuICAgIHZpZXcuaGVhZGVyLmFwcGVuZENoaWxkKHZpZXcucmVtb3ZlQnV0dG9uKTtcclxuICAgIHZpZXcuYXJ0aWNsZS5hcHBlbmRDaGlsZChcclxuICAgICAgVXRpbHMuYnVpbGRUYWJsZShbXCJuYW1lXCIsIFwiZGVzY3JpcHRpb25cIiwgXCJ1cGRhdGVkIGF0XCIsIFwiZ2l0IHVybFwiXSwgcmVwb3MpXHJcbiAgICApO1xyXG5cclxuICAgIHZpZXcudGVtcGxhdGUuYXBwZW5kQ2hpbGQodmlldy5oZWFkZXIpO1xyXG4gICAgdmlldy50ZW1wbGF0ZS5hcHBlbmRDaGlsZCh2aWV3LmFydGljbGUpO1xyXG5cclxuICAgIHJldHVybiB2aWV3LnRlbXBsYXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIGZvciBidWlsZCBzdHJpbmcgaW4gY3VzdG9tIERhdGUgZm9ybWF0XHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0ZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBidWlsZERhdGVTdHJpbmcoZGF0ZTogRGF0ZSB8IHN0cmluZyB8IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZSkudG9Mb2NhbGVTdHJpbmcobmF2aWdhdG9yLmxhbmd1YWdlLCB7XHJcbiAgICAgIGRheTogXCIyLWRpZ2l0XCIsXHJcbiAgICAgIG1vbnRoOiBcIjItZGlnaXRcIixcclxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVwb3MgfSBmcm9tIFwiLi9jb21wb25lbnRzL3JlcG9zL3JlcG9zXCI7XHJcbmltcG9ydCB7IEFkZFVzZXJGb3JtIH0gZnJvbSBcIi4vdmlld3MvYWRkLXVzZXItZm9ybVwiO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IChlKSA9PiB7XHJcbiAgLyoqXHJcbiAgICogQWRkaW5nIGN1c3RvdyBlbGVtZW50c1xyXG4gICAqL1xyXG4gIGN1c3RvbUVsZW1lbnRzLmRlZmluZShcInJlcG9zLWVsZW1lbnRcIiwgUmVwb3MpO1xyXG4gIC8qKlxyXG4gICAqIEFkZCB1c2VyIGZvcm0gdGVtcGxhdGUgaW5zdGFuY2VcclxuICAgKi9cclxuICBuZXcgQWRkVXNlckZvcm0oKTtcclxufTtcclxuIiwiaW1wb3J0IHsgQXNzZXJ0IH0gZnJvbSBcIi4vLi4vaGVscGVycy9hc3NlcnRcIjtcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi8uLi9oZWxwZXJzL3V0aWxzXCI7XHJcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uL2hlbHBlcnMvZXZlbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBZGRVc2VyRm9ybSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLm9uU3VibWl0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25TdWJtaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCB1c2VyRGF0YUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjYWRkLXVzZXItcmVwb3NfX3VzZXJcIlxyXG4gICAgKSBhcyBhbnk7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjYWRkLXVzZXItcmVwb3NfX3VwZGF0ZWRcIlxyXG4gICAgKSBhcyBhbnk7XHJcblxyXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtdXNlci1yZXBvc19fc3VibWl0XCIpIGFzIGFueTtcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgY29uc3QgY2hlY2tDb3JyZWN0VmFsdWVzID1cclxuICAgICAgICB1c2VyRGF0YUlucHV0LnZhbHVlICYmXHJcbiAgICAgICAgdXBkYXRlZElucHV0LnZhbHVlICYmXHJcbiAgICAgICAgQXNzZXJ0LnRyeSgoKSA9PiBuZXcgRGF0ZSh1cGRhdGVkSW5wdXQudmFsdWUpLmdldFRpbWUoKSkgJiZcclxuICAgICAgICAhaXNOYU4obmV3IERhdGUodXBkYXRlZElucHV0LnZhbHVlKS5nZXRUaW1lKCkpO1xyXG5cclxuICAgICAgaWYgKGNoZWNrQ29ycmVjdFZhbHVlcykge1xyXG4gICAgICAgIEV2ZW50LmVtaXQoXCJDUkVBVEUgVVNFUiBSRVBPU1wiLCB7XHJcbiAgICAgICAgICB1c2VyTmFtZTogdXNlckRhdGFJbnB1dC52YWx1ZSxcclxuICAgICAgICAgIHVwZGF0ZWQ6IFV0aWxzLmJ1aWxkRGF0ZVN0cmluZyh1cGRhdGVkSW5wdXQudmFsdWUpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGxlYXNlIHJlYWQgY29ycmVjdCB1c2VyIGFuZCB1cGRhdGUgaW5wdXRzXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==