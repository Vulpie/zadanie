const path = require('path')

const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()
const port = process.env.PORT || 3000
const root = path.join(__dirname, '')

app.use(cors())
app.use(express.static(root))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/songs', async (req, res) => {
    console.log('elo')
    let iTunesURL = new URL('https://itunes.apple.com/search')
    const { searchString, offset } = req.body

    iTunesURL.searchParams.set('term', searchString)
    iTunesURL.searchParams.append('entity', 'song')
    iTunesURL.searchParams.append('limit', 9)
    iTunesURL.searchParams.append('offset', offset)
    let itunesResponse
    await fetch(iTunesURL).then(async (data) => {
        itunesResponse = await data.json()
    })
    res.send(itunesResponse)
})

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})
