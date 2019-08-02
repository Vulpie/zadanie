let currentPage = 0;
let lastPage;
let item_id_glob = 0;
let button_id_glob = 0;
let search_items_list = [];
let last_search = '';
const getSongInfo = document.getElementById("searchButton");

//const infoDisplay = document.getElementById("info-display");


getSongInfo.addEventListener('click', () => {
    search_items_list.length = 0;
    resetPageNumber();
    let searchString = document.getElementById("searchSongTextInput").value;
    last_search = searchString;
    console.log(searchString);
    searchForResults(searchString);


})

function prevPage() {
    if (currentPage != 0) {
        currentPage--;
        searchForResults(last_search, currentPage);
    } else {
        console.error("This is the first page");
        document.getElementById("searchResult").innerHTML = `<p class="warn">This is the first page</p>`;
    }

}

function nextPage() {

    if (currentPage != lastPage) {
        currentPage++;
        searchForResults(last_search, currentPage);
    } else {
        console.error("This is the last page");
        document.getElementById("searchResult").innerHTML = `<p class="warn">This is the last page</p>`;
    }
}


// Aby ominąć problem z CORS po stronie klienta wykorzystałem "CORS Anywhere" https://github.com/Rob--W/cors-anywhere/blob/master/README.md
function searchForResults(searchString, page = 0) {
    fetch(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${searchString}&entity=song&limit=200`) // prefix https://cors-anywhere.herokuapp.com/ pozwala na skorzystanie z proxy
        .then((data) => {
            return data.json()
        })
        .then((ret) => {
            if (ret.resultCount === 0) {
                console.log("Nie znaleziono");
                document.getElementById("searchResult").innerHTML = `<p class="info">Sorry, no matches found</p>`;
                document.getElementById("output").innerHTML = '';
                document.getElementById("button-box").innerHTML = '';
                return
            }


            let pag = [0, 8];
            let searchResult = `<h4>Found ${ret.resultCount} songs</h4>`;
            lastPage = Math.round(ret.resultCount / 9);
            console.log(`Last page: ${lastPage}`);
            console.log(`Page number:${page} `)
            let output = ``;
            let i = 0;


            ret.results.forEach(ret => {
                const item = {
                    item_id: "",
                    img_url: "",
                    songName: "",
                    arrtistName: "",
                    rating: ""
                }
                item.item_id = item_id_glob;
                item.img_url = ret.artworkUrl100;
                item.songName = ret.collectionName;
                item.arrtistName = ret.artistName;
                

                item.price = ret.collectionPrice;
                item.currency = ret.currency;
                item.genre=ret.primaryGenreName;
                console.log(ret);
                item_id_glob++;
                if (item_id_glob == 200) {
                    item_id_glob = 0;
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
                                    <button id="${button_id_glob}" class="infoButton" onclick="getMoreInfo(this.id)"> More </button>
                            </div>
                        </div>
                        `
                        button_id_glob++;
                        if (button_id_glob == 200) {
                            button_id_glob = 0;
                        }
                search_items_list.push(item);
                i++;


            })
            let buttons = `
                    <div class="btnContainer">
                            <button class="pagButton" onclick="prevPage()">	&lt;	&lt; prev</button>
                    <button class="pagButton" onclick="nextPage()"> next 	&gt;	&gt;</button>
                    </div>
                    
                    `
            document.getElementById("button-box").innerHTML = buttons;
            document.getElementById("searchResult").innerHTML = searchResult;
            document.getElementById("output").innerHTML = output;
        })

}

function resetPageNumber() {
    currentPage = 0;
}


function getMoreInfo(btn_id) {
    
    document.getElementById("info-display").style.display = "block";
    document.getElementById("info-display").innerHTML = `       
    <div class="songDisplayBox">   
        <div class="imgBox">
            <img src="${search_items_list[btn_id].img_url}" alt="" class="songIMG">
        </div> 
        <div class="songDescription">
                <p class="songName"> ${search_items_list[btn_id].songName} <p>
                <p class="artist"> By ${search_items_list[btn_id].arrtistName} <p>

                <p class="artist">  ${search_items_list[btn_id].genre} <p>
                <p class="artist">  ${search_items_list[btn_id].price} ${search_items_list[btn_id].currency}<p>
                
                
                <button class="closeButton" onclick="closeInfoDisplay()"> Close </button>
                
        </div>
        <div class="clear"></div>
    </div>
    `

}


function closeInfoDisplay() {
    document.getElementById("info-display").style.display = "none";
    document.getElementById("info-display").innerHTML = "";
}