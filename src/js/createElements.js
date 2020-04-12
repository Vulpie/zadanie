import { nextPage, prevPage } from './pagination'

export function createPaginationButtons() {
    let buttonBox = null
    let parent = document.getElementById('main__wrapper')

    buttonBox = document.createElement('div')
    buttonBox.classList.add('main__wrapper-button-box')

    parent.appendChild(buttonBox)
}

export function createButtonNextPage(offset, searchString) {
    let parent = document.querySelector('.main__wrapper-button-box')
    let nextButton = null

    nextButton = document.createElement('button')
    nextButton.classList.add('main__wrapper-button-box-pagination')
    nextButton.innerHTML = 'next 	&gt;	&gt;'
    //nextButton.addEventListener('click', nextPage(offset, searchString))
    nextButton.onclick = nextPage(offset, searchString)

    parent.appendChild(nextButton)
}

export function createButtonPrevPage(offset, searchString) {
    let parent = document.querySelector('.main__wrapper-button-box')
    let prevButton = null

    prevButton = document.createElement('button')
    prevButton.classList.add('main__wrapper-button-box-pagination')
    prevButton.innerHTML = 'next 	&gt;	&gt;'
    //prevButton.addEventListener('click', prevPage(offset, searchString))
    prevButton.onclick = prevPage(offset, searchString)

    parent.appendChild(prevButton)
}

export function createOutput(artworkUrl100, collectionName) {
    let mainWrapper = null
    let artIMG = null
    let songNameParagraph = null
    let viewMoreButton = null
    let parent = document.getElementById('main__wrapper')

    mainWrapper = document.createElement('div')
    mainWrapper.classList.add('main__wrapper-output-display-song')
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

    mainWrapper.appendChild(artIMG)
    mainWrapper.appendChild(songNameParagraph)
    mainWrapper.appendChild(viewMoreButton)

    parent.appendChild(mainWrapper)
}

export function createSearchSummaryDisplay(offset, iTunesResponseCount) {
    let parent = document.getElementById('main__wrapper')
    let searchSummaryDisplay = null
    let paragraph = null

    searchSummaryDisplay = document.createElement('div')
    searchSummaryDisplay.classList.add('main__wrapper-searchResult')

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
