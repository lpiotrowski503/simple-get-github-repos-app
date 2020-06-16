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
        this.initState = [];
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
http_1.Http.getUserData("https://api.github.com/users/devballteam/repos").then((data) => {
    store.updateState(data);
    state = store.getState();
    console.log(state);
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcmVwb3MvcmVwb3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZGVidWcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlcnMvZXJyb3ItaGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy9odHRwLnRzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzL3N0b3JlLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLE1BQWEsS0FBTSxTQUFRLFdBQVc7SUFDcEM7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUVSLE1BQU0sUUFBUSxHQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFTLENBQUMsT0FBTyxDQUFDO1FBQzNFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQ2hFLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQ3pCLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFURCxzQkFTQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1RZLFdBQUcsR0FBRyxDQUFDLElBQVMsRUFBUSxFQUFFO0lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDRkYsTUFBYSxZQUFZO0lBQ3ZCLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBVTtRQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Q0FDRjtBQUpELG9DQUlDOzs7Ozs7Ozs7Ozs7Ozs7O0FDSkQscUdBQStDO0FBRS9DLE1BQWEsSUFBSTtJQUNmLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBVztRQUM1QixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDZCxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNuQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLDRCQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUNGO0FBTkQsb0JBTUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNORCxNQUFhLEtBQUs7SUFJaEI7UUFGUSxjQUFTLEdBQWEsRUFBRSxDQUFDO1FBRy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUM5QixDQUFDO0lBRU0sV0FBVyxDQUFDLFFBQWE7UUFDOUIsSUFBSSxDQUFDLEtBQUssbUNBQVEsSUFBSSxDQUFDLEtBQUssR0FBSyxRQUFRLENBQUUsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztDQUNGO0FBaEJELHNCQWdCQzs7Ozs7Ozs7Ozs7Ozs7O0FDakJELHFGQUFzQztBQUN0Qyx1R0FBaUQ7QUFDakQsa0ZBQXNDO0FBQ3RDLHFGQUF3QztBQUN4Qzs7R0FFRztBQUNILElBQUksS0FBSyxHQUFHLElBQUksYUFBSyxFQUFFLENBQUM7QUFDeEI7O0dBRUc7QUFDSCxJQUFJLEtBQWUsQ0FBQztBQUNwQjs7R0FFRztBQUNILFdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNiOztHQUVHO0FBQ0gsY0FBYyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsYUFBSyxDQUFDLENBQUM7QUFDOUM7O0dBRUc7QUFDSCxXQUFJLENBQUMsV0FBVyxDQUFDLGdEQUFnRCxDQUFDLENBQUMsSUFBSSxDQUNyRSxDQUFDLElBQWMsRUFBRSxFQUFFO0lBQ2pCLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FDRixDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJleHBvcnQgY2xhc3MgUmVwb3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVwb3MtZWxlbWVudFwiKSBhcyBhbnkpLmNvbnRlbnQ7XHJcbiAgICBjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KS5hcHBlbmRDaGlsZChcclxuICAgICAgdGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgbG9nID0gKGFyZ3M6IGFueSk6IHZvaWQgPT4ge1xyXG4gIGNvbnNvbGUubG9nKGFyZ3MpO1xyXG59O1xyXG4iLCJleHBvcnQgY2xhc3MgRXJyb3JIdW5kbGVyIHtcclxuICBzdGF0aWMgcHJpbnRFcnJvcihlcnJvcjogYW55KTogYW55IHtcclxuICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEVycm9ySHVuZGxlciB9IGZyb20gXCIuL2Vycm9yLWhhbmRsZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIdHRwIHtcclxuICBzdGF0aWMgZ2V0VXNlckRhdGEodXJsOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKHVybClcclxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IEVycm9ySHVuZGxlci5wcmludEVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IElSZXBvcyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3JlcG9zLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0b3JlIHtcclxuICBwcml2YXRlIHN0YXRlOiBJUmVwb3NbXTtcclxuICBwcml2YXRlIGluaXRTdGF0ZTogSVJlcG9zW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5pbml0U3RhdGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlU3RhdGUobmV3U3RhdGU6IGFueSk6IGFueSB7XHJcbiAgICB0aGlzLnN0YXRlID0geyAuLi50aGlzLnN0YXRlLCAuLi5uZXdTdGF0ZSB9O1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U3RhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSVJlcG9zIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9yZXBvcy5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIi4vaGVscGVycy9kZWJ1Z1wiO1xyXG5pbXBvcnQgeyBSZXBvcyB9IGZyb20gXCIuL2NvbXBvbmVudHMvcmVwb3MvcmVwb3NcIjtcclxuaW1wb3J0IHsgSHR0cCB9IGZyb20gXCIuL2hlbHBlcnMvaHR0cFwiO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gXCIuL2hlbHBlcnMvc3RvcmVcIjtcclxuLyoqXHJcbiAqIFN0b3JlIGluc3RhbmNlXHJcbiAqL1xyXG5sZXQgc3RvcmUgPSBuZXcgU3RvcmUoKTtcclxuLyoqXHJcbiAqIFN0b3JlIHN0YXRlXHJcbiAqL1xyXG5sZXQgc3RhdGU6IElSZXBvc1tdO1xyXG4vKipcclxuICogVGVzdCBhcHAgd29ya2luZyBmaW5lXHJcbiAqL1xyXG5sb2coXCJyZWFkeVwiKTtcclxuLyoqXHJcbiAqIEFkZGluZyBjdXN0b3cgZWxlbWVudHNcclxuICovXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZShcInJlcG9zLWVsZW1lbnRcIiwgUmVwb3MpO1xyXG4vKipcclxuICogR2V0IHVzZXIgcmVwb3NcclxuICovXHJcbkh0dHAuZ2V0VXNlckRhdGEoXCJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL2RldmJhbGx0ZWFtL3JlcG9zXCIpLnRoZW4oXHJcbiAgKGRhdGE6IElSZXBvc1tdKSA9PiB7XHJcbiAgICBzdG9yZS51cGRhdGVTdGF0ZShkYXRhKTtcclxuICAgIHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcclxuICAgIGNvbnNvbGUubG9nKHN0YXRlKTtcclxuICB9XHJcbik7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=