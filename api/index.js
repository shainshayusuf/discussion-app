const express = require('express')
const app = express()
const mongoose = require('mongoose');

app.use(express.json());


mongoose.connect('mongodb+srv://admin:Stjosephs@3123@cluster0.runpf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {  useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false  }).then(() => {
    console.log('Connected')
})



module.exports = {
    path: '/api',
    handler: app
}