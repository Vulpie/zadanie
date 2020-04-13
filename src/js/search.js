import { createDisplay, createOutput } from './createElements'

/**
 * @property {Function} searchiTunes - Sending and receiving data from iTunes
 * @property {string} iTunesURL - iTunes api url. Contains searchString, entity type (song) and limits (200)
 * @async
 * @return void
 */
export async function searchiTunes(searchString, offset) {
    createDisplay()
    let iTunesURL = new URL('https://itunes.apple.com/search')
    iTunesURL.searchParams.set('term', searchString)
    iTunesURL.searchParams.append('entity', 'song')
    iTunesURL.searchParams.append('limit', 9)
    iTunesURL.searchParams.append('offset', offset)

    let resultCount
    const data = await fetch(iTunesURL)
    await data.json().then((res) => {
        if (res.resultCount === 0) {
            return res.resultCount
        }

        resultCount = res.resultCount
        res.results.forEach((ret) => {
            createOutput(ret.artworkUrl100, ret.collectionName)
        })
    })
    return resultCount
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
