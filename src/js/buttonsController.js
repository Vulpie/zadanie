export const setButtonsStatus = (offset, responseCount) => {
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
}
