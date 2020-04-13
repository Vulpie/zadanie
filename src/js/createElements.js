export function createDisplay() {
    let parent = document.getElementById('main__wrapper')
    let songsDisplay = document.createElement('div')
    songsDisplay.id = 'songs-display'

    parent.appendChild(songsDisplay)
}

export function createOutput(artworkUrl100, collectionName) {
    let songWrapper = null
    let artIMG = null
    let songNameParagraph = null
    let viewMoreButton = null
    let parent = document.getElementById('songs-display')

    songWrapper = document.createElement('div')
    songWrapper.classList.add('main__wrapper-output-display-song')

    artIMG = document.createElement('img')
    artIMG.classList.add('main__wrapper-output-display-song-img')
    artIMG.src = artworkUrl100

    songNameParagraph = document.createElement('p')
    songNameParagraph.classList.add('main__wrapper-output-display-song-name')
    songNameParagraph.innerHTML = collectionName

    viewMoreButton = document.createElement('button')
    viewMoreButton.classList.add('main__wrapper-output-display-song-btn')
    //viewMoreButton.onclick = getMoreInfo()
    viewMoreButton.innerHTML = '&#9776;'

    songWrapper.appendChild(artIMG)
    songWrapper.appendChild(songNameParagraph)
    songWrapper.appendChild(viewMoreButton)

    parent.appendChild(songWrapper)
}

export function createSearchSummaryDisplay(offset, iTunesResponseCount) {
    let parent = document.getElementById('main__wrapper')
    let searchSummaryDisplay = null
    let paragraph = null

    searchSummaryDisplay = document.createElement('div')
    searchSummaryDisplay.classList.add('main__wrapper-searchResult')
    //searchSummaryDisplay.id = 'searchResult'

    paragraph = document.createElement('p')
    paragraph.classList.add('info')

    if (iTunesResponseCount === 0) {
        paragraph.innerHTML = 'Sorry, no matches found'
    } else {
        paragraph.innerHTML = `<h4>${offset} - ${offset + 9}</h4>`
    }

    searchSummaryDisplay.appendChild(paragraph)

    parent.appendChild(searchSummaryDisplay)
}

// export function displayMoreInfo(img_url,){
//     let parent = document.getElementById('main__menu')
//     let wrapper = null
//     let imgBox = null
//     let img = null

//     let descriptionWrapper=null
//     let nameParagraph = null
//     let artistParagraph = null
//     let genreParagraph = null
//     let priceParagraph = null

// }
