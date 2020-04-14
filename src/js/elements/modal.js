export function createModal(trackInfo) {
    console.log('createModal')
    let parent = document.getElementById('main')
    let window = null
    let infoDisplay = null
    let trackName = null
    let collectionName = null
    let releaseDate = null
    let trackImage = null
    let trackTime = null
    let trackPrice = null

    let time = trackInfo.trackTimeMillis
    time = time * 0.001
    time = time / 60

    window = document.createElement('div')
    window.classList.add('main__modal')
    window.id = 'infoModal'

    trackTime = document.createElement('p')
    trackTime.classList.add('main__modal_info_p')
    trackTime.innerHTML = `Track time: ${time.toFixed(2)} min`

    infoDisplay = document.createElement('div')
    infoDisplay.classList.add('main__modal_info')

    trackName = document.createElement('p')
    trackName.classList.add('main__modal_info_p')
    trackName.innerHTML = `Track Name: ${trackInfo.trackName}`

    collectionName = document.createElement('p')
    collectionName.classList.add('main__modal_info_p')
    collectionName.innerHTML = `Collection name: ${trackInfo.collectionName}`

    releaseDate = document.createElement('p')
    releaseDate.classList.add('main__modal_info_p')
    releaseDate.innerHTML = `Release date: ${trackInfo.releaseDate}`

    trackPrice = document.createElement('p')
    trackPrice.classList.add('main__modal_info_p')
    trackPrice.innerHTML = `Track price: ${trackInfo.trackPrice}`

    trackImage = document.createElement('img')
    trackImage.classList.add('main__modal_info_img')
    trackImage.src = trackInfo.artworkUrl100

    let button = document.createElement('button')
    button.innerHTML = 'Close'
    button.classList.add('main__modal_info_button')
    button.addEventListener('click', () => {
        closeModal()
    })

    infoDisplay.appendChild(trackImage)
    infoDisplay.appendChild(trackName)
    infoDisplay.appendChild(collectionName)
    infoDisplay.appendChild(releaseDate)
    infoDisplay.appendChild(trackTime)
    infoDisplay.appendChild(trackPrice)
    infoDisplay.appendChild(button)

    window.appendChild(infoDisplay)
    parent.appendChild(window)
}

function closeModal() {
    let modal = document.getElementById('infoModal')
    modal.remove()
}
