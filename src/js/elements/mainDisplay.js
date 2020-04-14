/**
 * Create DOM element that will be a main container for items returned from iTunes API
 */
export function createMainDisplay() {
    let parent = document.getElementById('main__wrapper')
    let songsDisplay = document.createElement('div')
    songsDisplay.classList.add('main__wrapper-output')
    songsDisplay.id = 'songs-display'

    parent.appendChild(songsDisplay)
}
