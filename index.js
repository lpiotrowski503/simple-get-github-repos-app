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
class Repos extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById("repos-element").content;
        const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(template.cloneNode(true));
    }
}
exports.Repos = Repos;


/***/ }),

/***/ "./src/helpers/debug.ts":
/*!******************************!*\
  !*** ./src/helpers/debug.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
exports.log = (args) => {
    console.log(args);
};


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

/***/ "./src/helpers/store.ts":
/*!******************************!*\
  !*** ./src/helpers/store.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
class Store {
    constructor() {
        this.initState = {
            avatar_url: "",
            bio: null,
            blog: "",
            company: null,
            created_at: "",
            email: null,
            events_url: "",
            followers: 0,
            followers_url: "",
            following: 0,
            following_url: "",
            gists_url: "",
            gravatar_id: "",
            hireable: null,
            html_url: "",
            id: 0,
            location: null,
            login: "",
            name: null,
            node_id: "",
            organizations_url: "",
            public_gists: 0,
            public_repos: 0,
            received_events_url: "",
            repos_url: "",
            site_admin: false,
            starred_url: "",
            subscriptions_url: "",
            twitter_username: null,
            type: "",
            updated_at: "",
            url: "",
        };
        this.state = this.initState;
    }
    updateState(newState) {
        this.state = Object.assign(Object.assign({}, this.state), newState);
        return this.state;
    }
    getState() {
        return this.state;
    }
}
exports.Store = Store;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __webpack_require__(/*! ./helpers/debug */ "./src/helpers/debug.ts");
const repos_1 = __webpack_require__(/*! ./components/repos/repos */ "./src/components/repos/repos.ts");
const http_1 = __webpack_require__(/*! ./helpers/http */ "./src/helpers/http.ts");
const store_1 = __webpack_require__(/*! ./helpers/store */ "./src/helpers/store.ts");
/**
 * Store instance
 */
let store = new store_1.Store();
/**
 * Store state
 */
let state;
/**
 * Test app working fine
 */
debug_1.log("ready");
/**
 * Adding custow elements
 */
customElements.define("repos-element", repos_1.Repos);
/**
 * Get user repos
 */
http_1.Http.getUserData("https://api.github.com/users/devballteam").then((data) => {
    store.updateState(data);
    state = store.getState();
    console.log(state);
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmVwb3MvcmVwb3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZGVidWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZXJyb3ItaGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy9odHRwLnRzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL3N0b3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLE1BQWEsS0FBTSxTQUFRLFdBQVc7SUFDcEM7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUVSLE1BQU0sUUFBUSxHQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFTLENB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QUFDckI7O0dBRUc7QUFDSCxXQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDYjs7R0FFRztBQUNILGNBQWMsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLGFBQUssQ0FBQyxDQUFDO0FBQzlDOztHQUVHO0FBQ0gsV0FBSSxDQUFDLFdBQVcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLElBQUksQ0FDL0QsQ0FBQyxJQUFlLEVBQUUsRUFBRTtJQUNsQixLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQ0YsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIFJlcG9zIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlcG9zLWVsZW1lbnRcIikgYXMgYW55KS5jb250ZW50O1xyXG4gICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSkuYXBwZW5kQ2hpbGQoXHJcbiAgICAgIHRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IGxvZyA9IChhcmdzOiBhbnkpOiB2b2lkID0+IHtcclxuICBjb25zb2xlLmxvZyhhcmdzKTtcclxufTtcclxuIiwiZXhwb3J0IGNsYXNzIEVycm9ySHVuZGxlciB7XHJcbiAgc3RhdGljIHByaW50RXJyb3IoZXJyb3I6IGFueSk6IGFueSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFcnJvckh1bmRsZXIgfSBmcm9tIFwiLi9lcnJvci1oYW5kbGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSHR0cCB7XHJcbiAgc3RhdGljIGdldFVzZXJEYXRhKHVybDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgIHJldHVybiBmZXRjaCh1cmwpXHJcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiBFcnJvckh1bmRsZXIucHJpbnRFcnJvcihlcnJvcikpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJVXNlckRhdGEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy91c2VyLWRhdGFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9yZSB7XHJcbiAgcHJpdmF0ZSBzdGF0ZTogSVVzZXJEYXRhO1xyXG4gIHByaXZhdGUgaW5pdFN0YXRlOiBJVXNlckRhdGEgPSB7XHJcbiAgICBhdmF0YXJfdXJsOiBcIlwiLFxyXG4gICAgYmlvOiBudWxsLFxyXG4gICAgYmxvZzogXCJcIixcclxuICAgIGNvbXBhbnk6IG51bGwsXHJcbiAgICBjcmVhdGVkX2F0OiBcIlwiLFxyXG4gICAgZW1haWw6IG51bGwsXHJcbiAgICBldmVudHNfdXJsOiBcIlwiLFxyXG4gICAgZm9sbG93ZXJzOiAwLFxyXG4gICAgZm9sbG93ZXJzX3VybDogXCJcIixcclxuICAgIGZvbGxvd2luZzogMCxcclxuICAgIGZvbGxvd2luZ191cmw6IFwiXCIsXHJcbiAgICBnaXN0c191cmw6IFwiXCIsXHJcbiAgICBncmF2YXRhcl9pZDogXCJcIixcclxuICAgIGhpcmVhYmxlOiBudWxsLFxyXG4gICAgaHRtbF91cmw6IFwiXCIsXHJcbiAgICBpZDogMCxcclxuICAgIGxvY2F0aW9uOiBudWxsLFxyXG4gICAgbG9naW46IFwiXCIsXHJcbiAgICBuYW1lOiBudWxsLFxyXG4gICAgbm9kZV9pZDogXCJcIixcclxuICAgIG9yZ2FuaXphdGlvbnNfdXJsOiBcIlwiLFxyXG4gICAgcHVibGljX2dpc3RzOiAwLFxyXG4gICAgcHVibGljX3JlcG9zOiAwLFxyXG4gICAgcmVjZWl2ZWRfZXZlbnRzX3VybDogXCJcIixcclxuICAgIHJlcG9zX3VybDogXCJcIixcclxuICAgIHNpdGVfYWRtaW46IGZhbHNlLFxyXG4gICAgc3RhcnJlZF91cmw6IFwiXCIsXHJcbiAgICBzdWJzY3JpcHRpb25zX3VybDogXCJcIixcclxuICAgIHR3aXR0ZXJfdXNlcm5hbWU6IG51bGwsXHJcbiAgICB0eXBlOiBcIlwiLFxyXG4gICAgdXBkYXRlZF9hdDogXCJcIixcclxuICAgIHVybDogXCJcIixcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmluaXRTdGF0ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVTdGF0ZShuZXdTdGF0ZTogYW55KTogYW55IHtcclxuICAgIHRoaXMuc3RhdGUgPSB7IC4uLnRoaXMuc3RhdGUsIC4uLm5ld1N0YXRlIH07XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTdGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJVXNlckRhdGEgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3VzZXItZGF0YVwiO1xyXG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9oZWxwZXJzL2RlYnVnXCI7XHJcbmltcG9ydCB7IFJlcG9zIH0gZnJvbSBcIi4vY29tcG9uZW50cy9yZXBvcy9yZXBvc1wiO1xyXG5pbXBvcnQgeyBIdHRwIH0gZnJvbSBcIi4vaGVscGVycy9odHRwXCI7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSBcIi4vaGVscGVycy9zdG9yZVwiO1xyXG4vKipcclxuICogU3RvcmUgaW5zdGFuY2VcclxuICovXHJcbmxldCBzdG9yZSA9IG5ldyBTdG9yZSgpO1xyXG4vKipcclxuICogU3RvcmUgc3RhdGVcclxuICovXHJcbmxldCBzdGF0ZTogSVVzZXJEYXRhO1xyXG4vKipcclxuICogVGVzdCBhcHAgd29ya2luZyBmaW5lXHJcbiAqL1xyXG5sb2coXCJyZWFkeVwiKTtcclxuLyoqXHJcbiAqIEFkZGluZyBjdXN0b3cgZWxlbWVudHNcclxuICovXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcInJlcG9zLWVsZW1lbnRcIiwgUmVwb3MpO1xyXG4vKipcclxuICogR2V0IHVzZXIgcmVwb3NcclxuICovXHJcbkh0dHAuZ2V0VXNlckRhdGEoXCJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL2RldmJhbGx0ZWFtXCIpLnRoZW4oXHJcbiAgKGRhdGE6IElVc2VyRGF0YSkgPT4ge1xyXG4gICAgc3RvcmUudXBkYXRlU3RhdGUoZGF0YSk7XHJcbiAgICBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XHJcbiAgICBjb25zb2xlLmxvZyhzdGF0ZSk7XHJcbiAgfVxyXG4pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9