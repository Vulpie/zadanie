export function createPaginationButtons() {
    let prevButton = null
    let nextButton = null
    let buttonBox = null
    let parent = document.getElementById('main__wrapper')

    buttonBox = document.createElement('div')
    buttonBox.classList.add('main__wrapper-button-box')

    prevButton = document.createElement('button')
    prevButton.classList.add('main__wrapper-button-box-pagination')
    prevButton.innerHTML = '&lt;	&lt; prev'
    //prevButton.onclick = prevPage()

    nextButton = document.createElement('button')
    nextButton.classList.add('main__wrapper-button-box-pagination')
    nextButton.innerHTML = 'next 	&gt;	&gt;'
    //nextButton.onclick = nextPage()

    buttonBox.appendChild(prevButton)
    buttonBox.appendChild(nextButton)

    parent.appendChild(buttonBox)
}

export function createOutput(artworkUrl100, collectionName, button_id_glob) {
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
    //viewMoreButton.onclick = getMoreInfo(button_id_glob)
    viewMoreButton.innerHTML = '&#9776;'

    mainWrapper.appendChild(artIMG)
    mainWrapper.appendChild(songNameParagraph)
    mainWrapper.appendChild(viewMoreButton)

    parent.appendChild(mainWrapper)
}

export function createSearchSummaryDisplay(resultCount) {
    let searchSummaryDisplay = null
    let paragraph = null

    searchSummaryDisplay = document.getElementById('div')
    searchSummaryDisplay.classList.add('main__wrapper-searchResult')

    paragraph = document.createElement('p')
    paragraph.classList.add('info')

    if (resultCount === 0) {
        paragraph.innerHTML = 'Sorry, no matches found'
    } else {
        paragrapg.innerHTML = `<h4>Found ${resultCount} songs</h4>`
    }
}
