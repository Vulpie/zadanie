/**
 * Set buttons 'disabled' attribute depending on variables
 * @param {number} offset - Position of the latest searc
 * @param {number} responseCount - Amount of items returned by iTunes API
 * @param {string} searchString - Latest searched phrase
 */
export function setButtonsStatus(offset, responseCount, searchString) {
    let prevPage = document.getElementById('prevPage')
    let nextPage = document.getElementById('nextPage')

    if (offset === 0 && responseCount !== 0) {
        prevPage.disabled = true
        nextPage.disabled = false
    } else if (offset !== 0 && responseCount === 9) {
        prevPage.disabled = false
        nextPage.disabled = false
    } else if (offset !== 0 && responseCount < 9) {
        prevPage.disabled = false
        nextPage.disabled = true
    }

    if (!searchString) {
        prevPage.disabled = true
        nextPage.disabled = true
    }
}
