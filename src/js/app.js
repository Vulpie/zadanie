/**
 * @file index.html is the root file for this app
 * @author Filip Wojtaś
 * @see <a href="http://vojtas.pl">Portfolio</a>
 */

import { clearDisplay, clearSearchSummary } from './helpers/clear'
import { searchiTunes } from './helpers/search'
import { createSearchSummary } from './elements/searchSummary'
import { setButtonsStatus } from './helpers/buttonsController'

/**
 * Anchor element for search button
 * @type {Element}
 */
const $getSongInfo = document.getElementById('searchButton')
const $prevPage = document.getElementById('prevPage')
const $nextPage = document.getElementById('nextPage')

let offset = 0
let searchPhrase

$getSongInfo.addEventListener('click', () => {
    let searchString = document.getElementById('searchSongTextInput').value
    offset = 0
    searchPhrase = searchString
    search(searchString)
})

$prevPage.addEventListener('click', () => {
    offset -= 9
    search(searchPhrase)
})

$nextPage.addEventListener('click', () => {
    offset += 9
    search(searchPhrase)
})

const search = async (searchString) => {
    clearDisplay()
    clearSearchSummary()
    let iTunesResponseCount = await searchiTunes(searchString, offset)
    createSearchSummary(offset, iTunesResponseCount)
    setButtonsStatus(offset, iTunesResponseCount)
}

/* ------------ */

/**
 * @property {Function} getMoreInfo - The button opens up an output window over the displayed results
 * @param {number} btn_id - ID of the clicked button.
 * @return void
 */
// const getMoreInfo = (btn_id) => {
//     document.getElementById('info-display').style.display = 'block'
//     document.getElementById('info-display').innerHTML = `
//     <div class="main__wrapper-display-box">
//         <div class="main__wrapper-display-box-imgBox">
//             <img src="${appState.search_items_list[btn_id].img_url}" alt="" class="main__wrapper-display-box-imgBox-img">
//         </div>
//         <div class="main__wrapper-display-box-desc">
//                 <p class="main__wrapper-display-box-desc-name"> ${appState.search_items_list[btn_id].songName} <p>
//                 <p class="artist"> By ${appState.search_items_list[btn_id].arrtistName} <p>

//                 <p class="artist">  ${appState.search_items_list[btn_id].genre} <p>
//                 <p class="artist">  ${appState.search_items_list[btn_id].price} ${appState.search_items_list[btn_id].currency}<p>

//                 <button class="main__wrapper-display-box-desc-btn" onclick="closeInfoDisplay()"> Close </button>

//         </div>
//         <div class="clear"></div>
//     </div>
//     `
// }
