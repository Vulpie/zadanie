import { searchForResults } from './search'

export function nextPage(offset, searchString) {
    offset += 9
    searchForResults(searchString, offset)
    console.log('elo111')
}

export function prevPage(offset, searchString) {
    if (offset !== 0) {
        offset -= 9
        searchForResults(searchString, offset)
        console.log('elo121')
    }
}
