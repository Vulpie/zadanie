export function createModal() {
    console.log('createModal')
    let parent = document.getElementById('main')
    let window = null

    window = document.createElement('div')
    window.classList.add('main__modal')
    window.id = 'infoModal'

    let button = document.createElement('button')

    button.innerHTML = 'Close'
    button.classList.add('main__modal_button')
    button.addEventListener('click', () => {
        closeModal()
    })

    window.appendChild(button)
    parent.appendChild(window)
}

function closeModal() {
    let modal = document.getElementById('infoModal')
    modal.remove()
}
