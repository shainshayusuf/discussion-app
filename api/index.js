const express = require('express')
const app = express()
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

const users = require('./routes/user');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:Stjosephs@3123@cluster0.runpf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {  useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: false  }).then(() => {
    console.log('Connected')
})

app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use('/users',users);


// app.get('/login',(req,res) => {
//     res.json({message:"Sign up successful"});
// })



module.exports = {
    path: '/api',
    handler: app
}