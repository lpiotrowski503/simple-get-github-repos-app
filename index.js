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
class Repos extends HTMLElement {
    constructor() {
        super();
        this._repos = [];
        this._elements = [];
        this._userName = "";
        event_1.Event.on("CREATE USER REPOS", (event) => {
            this._userName = event.user;
            this._onGetUserRepos(this._userName);
            // this._setUserNameAttribute(this._userName);
        });
        event_1.Event.on("COLLAPSE", (event) => {
            var _a;
            let table = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`#article-${event.id}`);
            (table === null || table === void 0 ? void 0 : table.classList.contains("open")) ? table.classList.remove("open")
                : table === null || table === void 0 ? void 0 : table.classList.add("open");
        });
    }
    // static get observedAttributes() {
    //   return ["data-user", "data-update"];
    // }
    // get dataUser() {
    //   return this.getAttribute("data-user");
    // }
    // set dataUser(value: any) {
    //   this.setAttribute("data-user", value);
    // }
    // get dataUpdate() {
    //   return this.getAttribute("data-update");
    // }
    // set dataUpdate(value: any) {
    //   this.setAttribute("data-update", value);
    // }
    // attributeChangedCallback(name, oldValue, newValue) {}
    // connectedCallback() {}
    // disconnectedCallback() {}
    // private _setUserNameAttribute(user: string): void {
    //   this.dataUser = user;
    // }
    _onGetUserRepos(user) {
        http_1.Http.getUserData(`https://api.github.com/users/${user}/repos`).then((repos) => {
            if (repos.length) {
                this._prepareReposData(repos);
                this._createUserRepoElement();
            }
        });
    }
    _prepareReposData(repos) {
        this._repos = utils_1.Utils.mapResponse(repos, [
            "name",
            "description",
            "updated_at",
            "git_url",
        ]);
    }
    _createUserRepoElement() {
        var _a;
        let template = document.createElement("repos");
        let header = document.createElement("header");
        let article = document.createElement("article");
        let button = document.createElement("button");
        template.innerHTML = `
    <link rel="stylesheet" href="/assets/styles/repos.css">
    `;
        header.innerHTML = `<h2>${this._userName}</h2>`;
        button.innerHTML = `<img src='/assets/icons/drop-down.svg'>`;
        button.id = this._userName;
        button.addEventListener("click", function (event) {
            this.classList.contains("collapsed")
                ? this.classList.remove("collapsed")
                : this.classList.add("collapsed");
            event_1.Event.emit("COLLAPSE", { id: this.id });
        });
        template.setAttribute("class", "repos");
        template.setAttribute("data-user", this._userName);
        template.setAttribute("data-update", "2019-05-01");
        article.setAttribute("id", `article-${this._userName}`);
        header.appendChild(button);
        article.appendChild(utils_1.Utils.buildTable(["name", "description", "updated at", "git url"], this._repos));
        template.appendChild(header);
        template.appendChild(article);
        if (this._elements.length) {
            if (this._elements.filter((item) => item === this._userName).length) {
                console.log("User just exist !");
            }
            else {
                this._elements.push(this._userName);
                (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(template);
            }
        }
        else {
            this._elements.push(this._userName);
            this.attachShadow({ mode: "open" }).appendChild(template);
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
class Event {
    static emit(chanel, value) {
        window.dispatchEvent(new CustomEvent(chanel, {
            detail: value ? value : {},
        }));
    }
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
class Http {
    static getUserData(url) {
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
class Utils {
    /**
     * Method for mapping with simle way
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
              <td>${item.description}</td>
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
    const addUserForm = new add_user_form_1.AddUserForm();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmVwb3MvcmVwb3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZXJyb3ItaGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy9ldmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy9odHRwLnRzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvYWRkLXVzZXItZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakZBLHNGQUEwQztBQUMxQyx5RkFBNEM7QUFDNUMseUZBQTRDO0FBRTVDLE1BQWEsS0FBTSxTQUFRLFdB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Q0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDWkYsc0ZBQXlDO0FBRXpDLE1BQWEsV0FBVztJQUN0QjtRQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRU0sUUFBUTtRQUNiLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzFDLHVCQUF1QixDQUNqQixDQUFDO1FBQ1QsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDeEMseUJBQXlCLENBQ25CLENBQUM7UUFDVCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFRLENBQUM7UUFDckUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2xDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixhQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbEJELGtDQWtCQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgSVJlcG9zUmVzcG9uc2UsIElSZXBvcyB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3JlcG9zLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBIdHRwIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvaHR0cFwiO1xyXG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL2V2ZW50XCI7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXBvcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBwcml2YXRlIF9yZXBvczogSVJlcG9zW10gPSBbXTtcclxuICBwcml2YXRlIF9lbGVtZW50czogc3RyaW5nW10gPSBbXTtcclxuICBwcml2YXRlIF91c2VyTmFtZTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIEV2ZW50Lm9uKFwiQ1JFQVRFIFVTRVIgUkVQT1NcIiwgKGV2ZW50OiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgdGhpcy5fdXNlck5hbWUgPSBldmVudC51c2VyO1xyXG4gICAgICB0aGlzLl9vbkdldFVzZXJSZXBvcyh0aGlzLl91c2VyTmFtZSk7XHJcbiAgICAgIC8vIHRoaXMuX3NldFVzZXJOYW1lQXR0cmlidXRlKHRoaXMuX3VzZXJOYW1lKTtcclxuICAgIH0pO1xyXG5cclxuICAgIEV2ZW50Lm9uKFwiQ09MTEFQU0VcIiwgKGV2ZW50OiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgbGV0IHRhYmxlID0gdGhpcy5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yKGAjYXJ0aWNsZS0ke2V2ZW50LmlkfWApO1xyXG4gICAgICB0YWJsZT8uY2xhc3NMaXN0LmNvbnRhaW5zKFwib3BlblwiKVxyXG4gICAgICAgID8gdGFibGUuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIilcclxuICAgICAgICA6IHRhYmxlPy5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XHJcbiAgLy8gICByZXR1cm4gW1wiZGF0YS11c2VyXCIsIFwiZGF0YS11cGRhdGVcIl07XHJcbiAgLy8gfVxyXG5cclxuICAvLyBnZXQgZGF0YVVzZXIoKSB7XHJcbiAgLy8gICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXVzZXJcIik7XHJcbiAgLy8gfVxyXG5cclxuICAvLyBzZXQgZGF0YVVzZXIodmFsdWU6IGFueSkge1xyXG4gIC8vICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXVzZXJcIiwgdmFsdWUpO1xyXG4gIC8vIH1cclxuXHJcbiAgLy8gZ2V0IGRhdGFVcGRhdGUoKSB7XHJcbiAgLy8gICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXVwZGF0ZVwiKTtcclxuICAvLyB9XHJcblxyXG4gIC8vIHNldCBkYXRhVXBkYXRlKHZhbHVlOiBhbnkpIHtcclxuICAvLyAgIHRoaXMuc2V0QXR0cmlidXRlKFwiZGF0YS11cGRhdGVcIiwgdmFsdWUpO1xyXG4gIC8vIH1cclxuXHJcbiAgLy8gYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge31cclxuXHJcbiAgLy8gY29ubmVjdGVkQ2FsbGJhY2soKSB7fVxyXG5cclxuICAvLyBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHt9XHJcblxyXG4gIC8vIHByaXZhdGUgX3NldFVzZXJOYW1lQXR0cmlidXRlKHVzZXI6IHN0cmluZyk6IHZvaWQge1xyXG4gIC8vICAgdGhpcy5kYXRhVXNlciA9IHVzZXI7XHJcbiAgLy8gfVxyXG5cclxuICBwcml2YXRlIF9vbkdldFVzZXJSZXBvcyh1c2VyOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIEh0dHAuZ2V0VXNlckRhdGEoYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvJHt1c2VyfS9yZXBvc2ApLnRoZW4oXHJcbiAgICAgIChyZXBvczogSVJlcG9zUmVzcG9uc2VbXSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXBvcy5sZW5ndGgpIHtcclxuICAgICAgICAgIHRoaXMuX3ByZXBhcmVSZXBvc0RhdGEocmVwb3MpO1xyXG4gICAgICAgICAgdGhpcy5fY3JlYXRlVXNlclJlcG9FbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcHJlcGFyZVJlcG9zRGF0YShyZXBvcyk6IHZvaWQge1xyXG4gICAgdGhpcy5fcmVwb3MgPSBVdGlscy5tYXBSZXNwb25zZShyZXBvcywgW1xyXG4gICAgICBcIm5hbWVcIixcclxuICAgICAgXCJkZXNjcmlwdGlvblwiLFxyXG4gICAgICBcInVwZGF0ZWRfYXRcIixcclxuICAgICAgXCJnaXRfdXJsXCIsXHJcbiAgICBdKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2NyZWF0ZVVzZXJSZXBvRWxlbWVudCgpOiB2b2lkIHtcclxuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJyZXBvc1wiKTtcclxuICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xyXG4gICAgbGV0IGFydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcclxuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gYFxyXG4gICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvYXNzZXRzL3N0eWxlcy9yZXBvcy5jc3NcIj5cclxuICAgIGA7XHJcbiAgICBoZWFkZXIuaW5uZXJIVE1MID0gYDxoMj4ke3RoaXMuX3VzZXJOYW1lfTwvaDI+YDtcclxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBgPGltZyBzcmM9Jy9hc3NldHMvaWNvbnMvZHJvcC1kb3duLnN2Zyc+YDtcclxuICAgIGJ1dHRvbi5pZCA9IHRoaXMuX3VzZXJOYW1lO1xyXG5cclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29sbGFwc2VkXCIpXHJcbiAgICAgICAgPyB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xsYXBzZWRcIilcclxuICAgICAgICA6IHRoaXMuY2xhc3NMaXN0LmFkZChcImNvbGxhcHNlZFwiKTtcclxuXHJcbiAgICAgIEV2ZW50LmVtaXQoXCJDT0xMQVBTRVwiLCB7IGlkOiB0aGlzLmlkIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGVtcGxhdGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyZXBvc1wiKTtcclxuICAgIHRlbXBsYXRlLnNldEF0dHJpYnV0ZShcImRhdGEtdXNlclwiLCB0aGlzLl91c2VyTmFtZSk7XHJcbiAgICB0ZW1wbGF0ZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXVwZGF0ZVwiLCBcIjIwMTktMDUtMDFcIik7XHJcblxyXG4gICAgYXJ0aWNsZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgYXJ0aWNsZS0ke3RoaXMuX3VzZXJOYW1lfWApO1xyXG5cclxuICAgIGhlYWRlci5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChcclxuICAgICAgVXRpbHMuYnVpbGRUYWJsZShcclxuICAgICAgICBbXCJuYW1lXCIsIFwiZGVzY3JpcHRpb25cIiwgXCJ1cGRhdGVkIGF0XCIsIFwiZ2l0IHVybFwiXSxcclxuICAgICAgICB0aGlzLl9yZXBvc1xyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKGFydGljbGUpO1xyXG5cclxuICAgIGlmICh0aGlzLl9lbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgaWYgKHRoaXMuX2VsZW1lbnRzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSA9PT0gdGhpcy5fdXNlck5hbWUpLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBqdXN0IGV4aXN0ICFcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudHMucHVzaCh0aGlzLl91c2VyTmFtZSk7XHJcbiAgICAgICAgdGhpcy5zaGFkb3dSb290Py5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzLnB1c2godGhpcy5fdXNlck5hbWUpO1xyXG4gICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pLmFwcGVuZENoaWxkKHRlbXBsYXRlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIEVycm9ySHVuZGxlciB7XHJcbiAgc3RhdGljIHByaW50RXJyb3IoZXJyb3I6IGFueSk6IGFueSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgRXZlbnQge1xyXG4gIHN0YXRpYyBlbWl0KGNoYW5lbDogc3RyaW5nLCB2YWx1ZT86IGFueSk6IHZvaWQge1xyXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQoXHJcbiAgICAgIG5ldyBDdXN0b21FdmVudChjaGFuZWwsIHtcclxuICAgICAgICBkZXRhaWw6IHZhbHVlID8gdmFsdWUgOiB7fSxcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgb24oY2hhbmVsOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoY2hhbmVsLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICBjYWxsYmFjayhldmVudC5kZXRhaWwpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEVycm9ySHVuZGxlciB9IGZyb20gXCIuL2Vycm9yLWhhbmRsZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIdHRwIHtcclxuICBzdGF0aWMgZ2V0VXNlckRhdGEodXJsOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKHVybClcclxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IEVycm9ySHVuZGxlci5wcmludEVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBVdGlscyB7XHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIGZvciBtYXBwaW5nIHdpdGggc2ltbGUgd2F5XHJcbiAgICpcclxuICAgKiBAcGFyYW0gaW5wdXRBcnJheVxyXG4gICAqIEBwYXJhbSBhcmdzXHJcbiAgICovXHJcbiAgc3RhdGljIG1hcFJlc3BvbnNlKGlucHV0QXJyYXk6IGFueVtdLCBhcmdzOiBzdHJpbmdbXSk6IGFueVtdIHtcclxuICAgIHJldHVybiBpbnB1dEFycmF5Lm1hcChcclxuICAgICAgKGl0ZW0pOiBPYmplY3QgPT4ge1xyXG4gICAgICAgIGxldCBvdXRwdXQgPSB7fTtcclxuICAgICAgICBhcmdzLmZvckVhY2goKGFyZzogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICBvdXRwdXRbYXJnLnRvU3RyaW5nKCldID0gaXRlbVthcmcudG9TdHJpbmcoKV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCBmb3IgQnVpbGQgVGFibGUgZnJvbSBoZWFkZXIgYW5kIGJvZHkgaW5wdXRzXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaGVhZGVyXHJcbiAgICogQHBhcmFtIGJvZHlcclxuICAgKi9cclxuICBzdGF0aWMgYnVpbGRUYWJsZShoZWFkZXI6IHN0cmluZ1tdLCBib2R5OiBhbnlbXSk6IEhUTUxUYWJsZUVsZW1lbnQge1xyXG4gICAgbGV0IHZpZXcgPSB7XHJcbiAgICAgIHRyOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIiksXHJcbiAgICAgIHRhYmxlOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiksXHJcbiAgICAgIHRhYmxlSGVhZDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoZWFkXCIpLFxyXG4gICAgICB0YWJsZUJvZHk6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKSxcclxuICAgIH07XHJcblxyXG4gICAgaGVhZGVyLmZvckVhY2goKHRoKSA9PiB7XHJcbiAgICAgIHZpZXcudHIuaW5uZXJIVE1MICs9IGA8dGg+JHt0aH08L3RoPmA7XHJcbiAgICB9KTtcclxuXHJcbiAgICBib2R5LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgdmlldy50YWJsZUJvZHkuaW5uZXJIVE1MICs9IGBcclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgIDx0ZD4ke2l0ZW0ubmFtZX08L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD4ke2l0ZW0uZGVzY3JpcHRpb259PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+JHtuZXcgRGF0ZShpdGVtLnVwZGF0ZWRfYXQpLnRvTG9jYWxlU3RyaW5nKFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLmxhbmd1YWdlLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBkYXk6IFwiMi1kaWdpdFwiLFxyXG4gICAgICAgICAgICAgICAgICBtb250aDogXCIyLWRpZ2l0XCIsXHJcbiAgICAgICAgICAgICAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICl9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+JHtpdGVtLmdpdF91cmx9PC90ZD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgIGA7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2aWV3LnRhYmxlSGVhZC5hcHBlbmRDaGlsZCh2aWV3LnRyKTtcclxuICAgIHZpZXcudGFibGUuYXBwZW5kQ2hpbGQodmlldy50YWJsZUhlYWQpO1xyXG4gICAgdmlldy50YWJsZS5hcHBlbmRDaGlsZCh2aWV3LnRhYmxlQm9keSk7XHJcblxyXG4gICAgcmV0dXJuIHZpZXcudGFibGU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlcG9zIH0gZnJvbSBcIi4vY29tcG9uZW50cy9yZXBvcy9yZXBvc1wiO1xyXG5pbXBvcnQgeyBBZGRVc2VyRm9ybSB9IGZyb20gXCIuL3ZpZXdzL2FkZC11c2VyLWZvcm1cIjtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSAoZSkgPT4ge1xyXG4gIC8qKlxyXG4gICAqIEFkZGluZyBjdXN0b3cgZWxlbWVudHNcclxuICAgKi9cclxuICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJyZXBvcy1lbGVtZW50XCIsIFJlcG9zKTtcclxuICAvKipcclxuICAgKiBBZGQgdXNlciBmb3JtIHRlbXBsYXRlIGluc3RhbmNlXHJcbiAgICovXHJcbiAgY29uc3QgYWRkVXNlckZvcm0gPSBuZXcgQWRkVXNlckZvcm0oKTtcclxufTtcclxuIiwiaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vaGVscGVycy9ldmVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFkZFVzZXJGb3JtIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMub25TdWJtaXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblN1Ym1pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHVzZXJEYXRhSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiNhZGQtdXNlci1yZXBvc19fdXNlclwiXHJcbiAgICApIGFzIGFueTtcclxuICAgIGNvbnN0IHVwZGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjYWRkLXVzZXItcmVwb3NfX3VwZGF0ZVwiXHJcbiAgICApIGFzIGFueTtcclxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXVzZXItcmVwb3NfX3N1Ym1pdFwiKSBhcyBhbnk7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgRXZlbnQuZW1pdChcIkNSRUFURSBVU0VSIFJFUE9TXCIsIHsgdXNlcjogdXNlckRhdGFJbnB1dC52YWx1ZSB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9