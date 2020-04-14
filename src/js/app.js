import { clearDisplay, clearPageNumber } from './helpers/clear'
import { searchiTunes } from './helpers/search'
import { createDisplayForPageNumber } from './elements/pageNumber'
import { setButtonsStatus } from './helpers/buttonsController'

/** @constant {Element} */
const $getSongInfo = document.getElementById('searchButton')

/** @constant {Element} */
const $prevPage = document.getElementById('prevPage')

/** @constant {Element} */
const $nextPage = document.getElementById('nextPage')

/**
 * @global
 */
let offset = 0
let searchPhrase

setButtonsStatus(offset, 0, searchPhrase)

/**
 * @see {@link $getSongInfo}
 */
$getSongInfo.addEventListener('click', () => {
    let searchString = document.getElementById('searchSongTextInput').value
    offset = 0
    searchPhrase = searchString
    search(searchString)
})

/**
 * @see {@link $prevPage}
 */
$prevPage.addEventListener('click', () => {
    offset -= 9
    search(searchPhrase)
})

/**
 * @see {@link $nextPage}
 */
$nextPage.addEventListener('click', () => {
    offset += 9
    search(searchPhrase)
})

/**
 *
 * @async
 * @param {string} searchString - Searched phrase acquired from '$getSongInfo' input
 * @see {@link $getSongInfo}
 */
const search = async (searchString) => {
    clearDisplay()
    clearPageNumber()
    let iTunesResponseCount = await searchiTunes(searchString, offset)
    createDisplayForPageNumber(offset, iTunesResponseCount)
    setButtonsStatus(offset, iTunesResponseCount, searchString)
}
