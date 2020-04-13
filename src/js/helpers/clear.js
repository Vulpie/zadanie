export function clearDisplay() {
    try {
        let element = document.getElementById('songs-display')
        element.remove()
    } catch (e) {
        console.log('No songs')
    }
}

export function clearSearchSummary() {
    try {
        let element = document.getElementById('search-result')
        element.remove()
    } catch (e) {
        console.log('No results to remove')
    }
}
