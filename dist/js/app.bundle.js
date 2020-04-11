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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/State.js":
/*!*************************!*\
  !*** ./src/js/State.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return State; });
class State {
    /**
     * Default settings
     * @class
     */
    constructor() {
        /**
         * @property {number} currentPage - The page that is currently viewed
         * @property {number} lastPage - Last available page for search results
         * @property {number} item_id_glob - Global ID for every item for the latest search result
         * @property {number} button_id_glob - Global ID for every button
         * @property {Array<Object>} search_items_list - Array of objects received from iTunes
         * @property {string} last_search - The latest search phrase
         */
        this.currentPage = 0
        this.lastPage
        this.item_id_glob = 0
        this.button_id_glob = 0
        this.search_items_list = []
        this.last_search = ''
    }

    /**
     * @property {Function} resetPageNumber - A function to reset current page count
     * @return void
     */
    resetPageNumber() {
        this.currentPage = 0
    }
}


/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _State__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./State */ "./src/js/State.js");
/**
 * @file index.html is the root file for this app
 * @author Filip Wojtaś
 * @see <a href="http://vojtas.pl">Portfolio</a>
 */

//import { nextPage, prevPage } from './pages'


/**
 * See {@link State}
 */
const appState = new _State__WEBPACK_IMPORTED_MODULE_0__["default"]()

/**
 * Anchor element for search button
 * @type {Element}
 */
const getSongInfo = document.getElementById('searchButton')

getSongInfo.addEventListener('click', () => {
    appState.search_items_list.length = 0
    appState.resetPageNumber()
    let searchString = document.getElementById('searchSongTextInput').value
    appState.last_search = searchString
    searchForResults(searchString)
})

/**
 * @property {Function} prevPage - A function loading previous page
 * @return void
 */
function prevPage() {
    console.log('prev')
    if (appState.currentPage != 0) {
        appState.currentPage = appState.currentPage - 1
        searchForResults(appState.last_search, appState.currentPage)
    } else {
        console.error('This is the first page')
        document.getElementById(
            'searchResult'
        ).innerHTML = `<p class="warn">This is the first page</p>`
    }
}
/**
 * @property {Function} nextPage - A function loading next page
 * @return void
 */
const nextPage = () => {
    console.log('next')
    if (appState.currentPage != appState.lastPage) {
        appState.currentPage = appState.currentPage + 1
        searchForResults(appState.last_search, appState.currentPage)
    } else {
        console.error('This is the last page')
        document.getElementById(
            'searchResult'
        ).innerHTML = `<p class="warn">This is the last page</p>`
    }
}

/**
 * @property {Function} searchForResults - Sending and receiving data from iTunes
 * @param {string} searchString - See {@link last_search}
 * @param {number} page
 * @property {string} corsURL - URLproxy to avoid CORS problem on github pages. See link below (CORS REDME)
 * @see <a href="https://github.com/Rob--W/cors-anywhere/blob/master/README.md">CORS README</a>
 * @property {string} iTunesURL - iTunes api url. Contains searchString, entity type (song) and limits (200)
 * @property {string} url - Full url
 * @async
 * @return void
 */
async function searchForResults(searchString, page = 0) {
    console.log('test 2')
    const corsURL = 'https://cors-anywhere.herokuapp.com/'
    const iTunesURL = `https://itunes.apple.com/search?term=${searchString}&entity=song&limit=200`
    const url = corsURL + iTunesURL

    const data = await fetch(url)
    await data.json().then((res) => {
        if (res.resultCount === 0) {
            document.getElementById(
                'searchResult'
            ).innerHTML = `<p class="info">Sorry, no matches found</p>`
            document.getElementById('output').innerHTML = ''
            document.getElementById('button-box').innerHTML = ''
            return
        }

        let pag = [0, 8]
        let searchResult = `<h4>Found ${res.resultCount} songs</h4>`
        appState.lastPage = Math.round(res.resultCount / 9)
        let output = ``
        let i = 0

        res.results.forEach((ret) => {
            const item = {
                item_id: '',
                img_url: '',
                songName: '',
                arrtistName: '',
                rating: ''
            }
            item.item_id = appState.item_id_glob
            item.img_url = ret.artworkUrl100
            item.songName = ret.collectionName
            item.arrtistName = ret.artistName

            item.price = ret.collectionPrice
            item.currency = ret.currency
            item.genre = ret.primaryGenreName

            appState.item_id_glob++
            if (appState.item_id_glob === 200) {
                appState.item_id_glob = 0
            }

            if (i >= pag[0] + page * 9 && i <= pag[1] + page * 9) {
                output += `
                                        
                                <div class="main__wrapper-output-display-song">   
                                        <img src="${ret.artworkUrl100}" alt="" class="main__wrapper-output-display-song-img">
                                    
                                            <p class="main__wrapper-output-display-song-name"> ${ret.collectionName} <p>
                                            <button id="${appState.button_id_glob}" class="main__wrapper-output-display-song-btn" onclick="getMoreInfo(this.id)"> 
                                            <div class="main__wrapper-output-display-song-btn-hr"></div>
                                            <div class="main__wrapper-output-display-song-btn-hr"></div>
                                            <div class="main__wrapper-output-display-song-btn-hr"></div>
                                            </button>
                                    
                                </div>
                                `
            }
            appState.button_id_glob++
            if (appState.button_id_glob == 200) {
                appState.button_id_glob = 0
            }
            appState.search_items_list.push(item)
            i++
        })
        let buttons = `
                    <button class="main__wrapper-button-box-pagination" onclick="prevPage()">	&lt;	&lt; prev</button>
                    <button class="main__wrapper-button-box-pagination" onclick="nextPage()"> next 	&gt;	&gt;</button>
                    `

        document.getElementById('button-box').innerHTML = buttons
        document.getElementById('searchResult').innerHTML = searchResult
        document.getElementById('output').innerHTML = output
    })
}

/**
 * @property {Function} getMoreInfo - The button opens up an output window over the displayed results
 * @param {number} btn_id - ID of the clicked button.
 * @return void
 */
const getMoreInfo = (btn_id) => {
    document.getElementById('info-display').style.display = 'block'
    document.getElementById('info-display').innerHTML = `       
    <div class="main__wrapper-display-box">   
        <div class="main__wrapper-display-box-imgBox">
            <img src="${appState.search_items_list[btn_id].img_url}" alt="" class="main__wrapper-display-box-imgBox-img">
        </div> 
        <div class="main__wrapper-display-box-desc">
                <p class="main__wrapper-display-box-desc-name"> ${appState.search_items_list[btn_id].songName} <p>
                <p class="artist"> By ${appState.search_items_list[btn_id].arrtistName} <p>

                <p class="artist">  ${appState.search_items_list[btn_id].genre} <p>
                <p class="artist">  ${appState.search_items_list[btn_id].price} ${appState.search_items_list[btn_id].currency}<p>
                
                
                <button class="main__wrapper-display-box-desc-btn" onclick="closeInfoDisplay()"> Close </button>
                
        </div>
        <div class="clear"></div>
    </div>
    `
}

/**
 * @property {Function} closeInfoDisplay - The function closing the display with additional informations about the song
 * @return void
 */
const closeInfoDisplay = () => {
    document.getElementById('info-display').style.display = 'none'
    document.getElementById('info-display').innerHTML = ''
}


/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map