//import { getMoreInfo } from '../helpers/modal'
import { createModal } from '../elements/modal'

/**
 *
 * @param {Object} trackInfo This object contains information from iTunes API
 */
export function createItem(trackInfo) {
    let songWrapper = null
    let artIMG = null
    let songNameParagraph = null
    let viewMoreButton = null
    let parent = document.getElementById('songs-display')

    songWrapper = document.createElement('div')
    songWrapper.classList.add('main__wrapper-output-display-song')

    artIMG = document.createElement('img')
    artIMG.classList.add('main__wrapper-output-display-song-img')
    artIMG.src = trackInfo.artworkUrl100

    songNameParagraph = document.createElement('p')
    songNameParagraph.classList.add('main__wrapper-output-display-song-name')
    songNameParagraph.innerHTML = trackInfo.trackName

    viewMoreButton = document.createElement('button')
    viewMoreButton.classList.add('main__wrapper-output-display-song-btn')
    viewMoreButton.addEventListener('click', () => {
        createModal(trackInfo)
    })
    viewMoreButton.innerHTML = 'More info'

    songWrapper.appendChild(artIMG)
    songWrapper.appendChild(songNameParagraph)
    songWrapper.appendChild(viewMoreButton)

    parent.appendChild(songWrapper)
}
