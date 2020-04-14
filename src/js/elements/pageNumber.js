/**
 * Display offset of current search as a page number
 * @param {number} offset - Position of the latest searc
 * @param {number} responseCount - Amount of items returned by iTunes API
 */
export function createDisplayForPageNumber(offset, responseCount) {
    let parent = document.getElementById('main__wrapper')
    let searchSummaryDisplay = null
    let paragraph = null

    searchSummaryDisplay = document.createElement('div')
    searchSummaryDisplay.classList.add('main__wrapper-searchResult')
    searchSummaryDisplay.id = 'search-result'

    paragraph = document.createElement('p')
    paragraph.classList.add('info')

    if (responseCount === 0) {
        paragraph.innerHTML = 'Sorry, no matches found'
    } else {
        paragraph.innerHTML = `<h4>${offset} - ${offset + 9}</h4>`
    }

    searchSummaryDisplay.appendChild(paragraph)

    parent.appendChild(searchSummaryDisplay)
}
