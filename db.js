const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://simardua:SimarGne@cluster0.4eekpcx.mongodb.net/hotel'

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })

var connection = mongoose.connection
connection.on('error', () => {
    console.log('Connection failed')
})
connection.on('connected', () => {
    console.log('connection successful')
})

module.exports = mongoose
