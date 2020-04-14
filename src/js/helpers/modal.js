import { createModal } from '../elements/modal'

export async function getMoreInfo(trackInfo) {
    console.log('Track info ', trackInfo)
    createModal(trackInfo)
}
