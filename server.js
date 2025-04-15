const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const connectDB = require('./config/db')
const { readdirSync, read } = require('fs')
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})