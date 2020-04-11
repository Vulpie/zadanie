/**
 * @property {Function} prevPage - A function loading previous page
 * @return void
 */
export const prevPage = () => {
    console.log('prev')
    if (appState.currentPage != 0) {
        appState.currentPage = appState.currentPage - 1
        searchForResults(appState.last_search, appState.currentPage)
    } else {
        console.error('This is the first page')
        document.getElementById(
            'searchResult'
        ).innerHTML = `<p class="warn">This is the first page</p>`
    }
}
/**
 * @property {Function} nextPage - A function loading next page
 * @return void
 */
export const nextPage = () => {
    console.log('next')
    if (appState.currentPage != appState.lastPage) {
        appState.currentPage = appState.currentPage + 1
        searchForResults(appState.last_search, appState.currentPage)
    } else {
        console.error('This is the last page')
        document.getElementById(
            'searchResult'
        ).innerHTML = `<p class="warn">This is the last page</p>`
    }
}
