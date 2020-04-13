export function clearDisplay() {
    try {
        // let element = document.getElementsByClassName(
        //     'main__wrapper-output-display-song'
        // )
        // for (let i = 0; i < 9; i++) {
        //     element[0].remove(element[0])
        // }
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
