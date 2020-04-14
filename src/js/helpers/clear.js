/**
 * Remove last search results from display
 */
export function clearDisplay() {
    try {
        let element = document.getElementById('songs-display')
        element.remove()
    } catch (e) {
        console.log('No songs to remove')
    }
}

/**
 * Remove last search offset from display
 */
export function clearPageNumber() {
    try {
        let element = document.getElementById('search-result')
        element.remove()
    } catch (e) {
        console.log('No results to remove')
    }
}
