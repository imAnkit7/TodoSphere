const mongoose = require('mongoose')
const DB = 'mongodb://127.0.0.1:27017/todo'

mongoose.connect(DB, { useNewUrlParser: true }).then(() => {
    console.log('connection successfull')
}).catch((err) => {
    console.log(err)
})