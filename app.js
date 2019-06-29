let currentPage = 0;
let lastPage;
        let last_search = '';
        const getSongInfo = document.getElementById("searchButton");

        getSongInfo.addEventListener('click', () => {
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
            }else{
                console.error("This is the first page");
                document.getElementById("searchResult").innerHTML = `<p class="warn">This is the first page</p>`;
            }
            
        }


        function nextPage() {
            
            if(currentPage != lastPage){
            currentPage++;
            searchForResults(last_search, currentPage);
            }else{
                console.error("This is the last page");
                document.getElementById("searchResult").innerHTML = `<p class="warn">This is the last page</p>`;
            }
            
        }



        function searchForResults(searchString, page = 0) {
            fetch(`https://itunes.apple.com/search?term=${searchString}&entity=song&limit=200`,{method: 'GET',credentials: 'omit',mode: 'cors',headers:{ 'Content-Type': 'application/json'} })
                .then((data) => {
                    return data.json()
                })
                .then((ret) => {
                    if(ret.resultCount === 0){
                        console.log("Nie znaleziono");
                        document.getElementById("searchResult").innerHTML = `<p class="info">Sorry, no matches found</p>`;
                        document.getElementById("output").innerHTML = '';
                        document.getElementById("button-box").innerHTML= '';
                        return
                    }
                    

                    let pag = [0, 8];
                    let searchResult = `<h4>Found ${ret.resultCount} songs</h4>`;
                    lastPage = Math.round(ret.resultCount/9);
                    console.log(`Last page: ${lastPage}`);
                    console.log(`Page number:${page} `)
                    let output = ``;
                    let i = 0;
                    ret.results.forEach(ret => {
                        
                            if ((i >= pag[0] + page * 9) && (i <= pag[1] + page * 9)) 
                                output += `
                                
                        <div class="songDisplayBox">   
                                
                            <div class="imgBox">
                                <img src="${ret.artworkUrl100}" alt="" class="songIMG">
                            </div> 
                            <div class="songDescription">
                                    <p class="songName"> ${ret.collectionName} <p>
                                    <p class="artist"> By ${ret.artistName} <p>
                            </div>
                        </div>
                        `
                                i++;
                            
                        


                    })
                    let buttons = `
                    <div class="btnContainer">
                            <button class="pagButton" onclick="prevPage()">	&lt;	&lt; prev</button>
                    <button class="pagButton" onclick="nextPage()"> next 	&gt;	&gt;</button>
                    </div>
                    
                    `
                    document.getElementById("button-box").innerHTML= buttons;
                    document.getElementById("searchResult").innerHTML = searchResult;
                    document.getElementById("output").innerHTML = output;
                })

        }

        function resetPageNumber(){
            currentPage = 0;
        }