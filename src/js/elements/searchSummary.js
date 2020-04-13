export function createSearchSummary(offset, iTunesResponseCount) {
    let parent = document.getElementById('main__wrapper')
    let searchSummaryDisplay = null
    let paragraph = null

    searchSummaryDisplay = document.createElement('div')
    searchSummaryDisplay.classList.add('main__wrapper-searchResult')
    searchSummaryDisplay.id = 'search-result'

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
