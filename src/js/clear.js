export function clearDisplay() {
    try {
        let element = document.getElementById('songs-display')
        element.remove()
    } catch (e) {
        console.log('No songs')
    }
}

export function clearResultDisplay() {
    try {
        let results = document.getElementById('search-result')
        results.remove()
    } catch (e) {
        console.log('No results to remove')
    }
}
