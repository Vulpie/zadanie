export function createItem(artworkUrl100, collectionName) {
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
