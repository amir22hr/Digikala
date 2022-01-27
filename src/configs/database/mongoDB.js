const mongoose = require('mongoose')
const { spinner } = require('../../app/utils')
const { database } = require('../keys')

// database initialize
mongoose.connect(database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Animation Waiting to connect to the database
spinner('Waiting to connect to the database', 'start', 'red');

//if error
mongoose.connection.on('error', (err) => {
    spinner('mongo connect error!', 'fail')
    spinner(`Error is --| ${err} |--`, 'info')
})

//if connected
mongoose.connection.on('connected', () => {
    spinner("connected to mongo", 'succeed')
})