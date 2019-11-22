/**
 * @file index.html is the root file for this app
 * @author Filip Wojtaś
 * @see <a href="http://vojtas.pl">Portfolio</a>
 */


class State {
    /**
     * Default settings
     */
    constructor(){
    /**
     * @property {number} currentPage - The page that is currently viewed
     * @property {number} lastPage - Last available page for search results
     * @property {number} item_id_glob - Global ID for every item form the latest search result
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
    resetPageNumber(){
        this.currentPage = 0
    }
}


/**
 * See {@link State}
 */
const appState = new State()

/**
 * Anchor element for search button
 * @type {Element}
 */
const getSongInfo = document.getElementById("searchButton");



getSongInfo.addEventListener('click', () => {
    appState.search_items_list.length = 0;
    appState.resetPageNumber();
    let searchString = document.getElementById("searchSongTextInput").value;
    appState.last_search = searchString;
    searchForResults(searchString);
})

/**
 * @property {Function} prevPage - A function loading previous page
 * @return void
 */
const prevPage = () => {
    if (appState.currentPage != 0) {
        appState.currentPage=appState.currentPage-1;
        searchForResults(appState.last_search, appState.currentPage);
    } else {
        console.error("This is the first page");
        document.getElementById("searchResult").innerHTML = `<p class="warn">This is the first page</p>`;
    }

}
/**
 * @property {Function} nextPage - A function loading next page
 * @return void
 */
const nextPage = () => {
    if (appState.currentPage != appState.lastPage) {
        console.log(`Current page ${appState.currentPage} before`)
        appState.currentPage=appState.currentPage+1;
        console.log(`Current page ${appState.currentPage} after`)
        searchForResults(appState.last_search, appState.currentPage);
    } else {
        console.error("This is the last page");
        document.getElementById("searchResult").innerHTML = `<p class="warn">This is the last page</p>`;
    }
}




/**
 * @property {Function} searchForResults - The function sending and receiving data from iTunes
 * @param {string} searchString - See {@link last_search}
 * @param {number} page 
 * @property {string} corsURL - URLproxy to avoid CORS problem on github pages. See link below (CORS REDME)
 * @see <a href="https://github.com/Rob--W/cors-anywhere/blob/master/README.md">CORS README</a>
 * @property {string} iTunesURL - iTunes api url. Contains searchString, entity type (song) and limits of result (200)
 * @property {string} url - Full url 
 * @return void
 */
const searchForResults = (searchString, page = 0) => {
    
    const corsURL = 'https://cors-anywhere.herokuapp.com/'
    const iTunesURL = `https://itunes.apple.com/search?term=${searchString}&entity=song&limit=200`
    const url = corsURL + iTunesURL

    fetch(url)
        .then((data) => {
            return data.json()
        })
        .then((res) => {
            if (res.resultCount === 0) {
                console.log("Nie znaleziono");
                document.getElementById("searchResult").innerHTML = `<p class="info">Sorry, no matches found</p>`;
                document.getElementById("output").innerHTML = '';
                document.getElementById("button-box").innerHTML = '';
                return
            }


            let pag = [0, 8];
            let searchResult = `<h4>Found ${res.resultCount} songs</h4>`;
            appState.lastPage = Math.round(res.resultCount / 9);
            console.log(`Last page: ${appState.lastPage}`);
            console.log(`Page number:${page} `)
            let output = ``;
            let i = 0;


            res.results.forEach(ret => {
                const item = {
                    item_id: "",
                    img_url: "",
                    songName: "",
                    arrtistName: "",
                    rating: ""
                }
                item.item_id = appState.item_id_glob;
                item.img_url = ret.artworkUrl100;
                item.songName = ret.collectionName;
                item.arrtistName = ret.artistName;
                

                item.price = ret.collectionPrice;
                item.currency = ret.currency;
                item.genre=ret.primaryGenreName;
                
                appState.item_id_glob++;
                if (appState.item_id_glob === 200) {
                    appState.item_id_glob = 0;
                }

                if ((i >= pag[0] + page * 9) && (i <= pag[1] + page * 9))
                    output += `
                                
                        <div class="songDisplayBox">   
                                
                            <div class="imgBox">
                                <img src="${ret.artworkUrl100}" alt="" class="songIMG">
                            </div> 
                            <div class="songDescription">
                                    <p class="songName"> ${ret.collectionName} <p>
                                    <p class="artist"> By ${ret.artistName} <p>
                                    <button id="${appState.button_id_glob}" class="infoButton" onclick="getMoreInfo(this.id)"> More </button>
                            </div>
                        </div>
                        `
                        appState.button_id_glob++;
                        if (appState.button_id_glob == 200) {
                            appState.button_id_glob = 0;
                        }
                appState.search_items_list.push(item);
                i++;


            })
            let buttons = `
                    <div class="btnContainer">
                            <button class="pagButton" onclick="prevPage()">	&lt;	&lt; prev</button>
                    <button class="pagButton" onclick="nextPage()"> next 	&gt;	&gt;</button>
                    </div>`
            document.getElementById("button-box").innerHTML = buttons;
            document.getElementById("searchResult").innerHTML = searchResult;
            document.getElementById("output").innerHTML = output;
        })

}

/**
 * @property {Function} getMoreInfo - The button opens up an output window over the displayed results
 * @param {number} btn_id - ID of the clicked button.
 * @return void
 */
const getMoreInfo = btn_id => {
    
    document.getElementById("info-display").style.display = "block";
    document.getElementById("info-display").innerHTML = `       
    <div class="songDisplayBox">   
        <div class="imgBox">
            <img src="${appState.search_items_list[btn_id].img_url}" alt="" class="songIMG">
        </div> 
        <div class="songDescription">
                <p class="songName"> ${appState.search_items_list[btn_id].songName} <p>
                <p class="artist"> By ${appState.search_items_list[btn_id].arrtistName} <p>

                <p class="artist">  ${appState.search_items_list[btn_id].genre} <p>
                <p class="artist">  ${appState.search_items_list[btn_id].price} ${appState.search_items_list[btn_id].currency}<p>
                
                
                <button class="closeButton" onclick="closeInfoDisplay()"> Close </button>
                
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
    document.getElementById("info-display").style.display = "none";
    document.getElementById("info-display").innerHTML = "";
}