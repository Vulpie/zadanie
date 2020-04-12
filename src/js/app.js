/**
 * @file index.html is the root file for this app
 * @author Filip Wojtaś
 * @see <a href="http://vojtas.pl">Portfolio</a>
 */

//import { nextPage, prevPage } from './pages'
import State from './State'
import { createOutput, createPaginationButtons } from './createElements'

/**
 * See {@link State}
 */
const appState = new State()

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
                // output += `

                //                 <div class="main__wrapper-output-display-song">
                //                         <img src="${ret.artworkUrl100}" alt="" class="main__wrapper-output-display-song-img">

                //                             <p class="main__wrapper-output-display-song-name"> ${ret.collectionName} <p>
                //                             <button id="${appState.button_id_glob}" class="main__wrapper-output-display-song-btn" onclick="getMoreInfo(this.id)">
                //                             <div class="main__wrapper-output-display-song-btn-hr"></div>
                //                             <div class="main__wrapper-output-display-song-btn-hr"></div>
                //                             <div class="main__wrapper-output-display-song-btn-hr"></div>
                //                             </button>

                //                 </div>
                //                 `
                createOutput(
                    ret.artworkUrl100,
                    ret.collectionName,
                    appState.button_id_glob
                )
            }
            appState.button_id_glob++
            if (appState.button_id_glob == 200) {
                appState.button_id_glob = 0
            }
            appState.search_items_list.push(item)
            i++
        })

        // let buttons = `
        //             <button class="main__wrapper-button-box-pagination" onclick="prevPage()">	&lt;	&lt; prev</button>
        //             <button class="main__wrapper-button-box-pagination" onclick="nextPage()"> next 	&gt;	&gt;</button>
        //             `

        // document.getElementById('button-box').innerHTML = buttons
        createPaginationButtons()
        //document.getElementById('searchResult').innerHTML = searchResult
        //document.getElementById('output').innerHTML = output
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
