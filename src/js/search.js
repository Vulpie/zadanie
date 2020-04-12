import {
    createOutput,
    createPaginationButtons,
    createSearchSummaryDisplay
} from './createElements'

/**
 * @property {Function} searchForResults - Sending and receiving data from iTunes
 * @property {string} iTunesURL - iTunes api url. Contains searchString, entity type (song) and limits (200)
 * @async
 * @return void
 */
export async function searchForResults(searchString, offset) {
    let iTunesURL = new URL('https://itunes.apple.com/search')
    iTunesURL.searchParams.set('term', searchString)
    iTunesURL.searchParams.append('entity', 'song')
    iTunesURL.searchParams.append('limit', 9)
    iTunesURL.searchParams.append('offset', offset)

    const data = await fetch(iTunesURL)
    await data.json().then((res) => {
        createSearchSummaryDisplay(res.resultCount)
        if (res.resultCount === 0) {
            return
        }
        res.results.forEach((ret) => {
            createOutput(ret.artworkUrl100, ret.collectionName)
        })

        createPaginationButtons()
    })
}

// const item = {
//     item_id: '',
//     img_url: '',
//     songName: '',
//     arrtistName: '',
//     rating: ''
// }
// item.item_id = appState.item_id_glob
// item.img_url = ret.artworkUrl100
// item.songName = ret.collectionName
// item.arrtistName = ret.artistName

// item.price = ret.collectionPrice
// item.currency = ret.currency
// item.genre = ret.primaryGenreName
