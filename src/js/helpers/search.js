import { createItem } from '../elements/item'

import { createMainDisplay } from '../elements/mainDisplay'

/**
 * Sending and receiving data from iTunes
 * @param {string} iTunesURL - iTunes api url. Contains searchString, entity type (song), limits (9) and offset
 * @param {number} offset - Position of the latest searc
 * @async
 * @returns {number} - Amount of items returned by iTunes API
 */
export async function searchiTunes(searchString, offset) {
    createMainDisplay()
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
        res.results.forEach((result) => {
            let trackInfo = {
                artworkUrl100: result.artworkUrl100,
                trackName: result.trackName,
                collectionName: result.collectionName,
                releaseDate: result.releaseDate,
                trackPrice: result.trackPrice,
                trackTimeMillis: result.trackTimeMillis
            }
            createItem(trackInfo)
        })
    })
    return resultCount
}
