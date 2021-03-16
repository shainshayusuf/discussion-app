const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const mongoose = require('mongoose');

//load user model
require('../models/user');
const User = mongoose.model('users');

//login form post
router.post('/login', (req, res, next) => {


        if (!req.body.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }

        if (!req.body.password) {
            return res.status(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }

        return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
            if (err) {
                return next(err);
            }

            if (passportUser) {
               return res.json({  message: 'Login Successful' ,user:passportUser.email});
            }

            return res.status(400).json({ message: 'not exist' });
        })(req, res, next);
    });




//register form post
router.post('/register', (req, res) => {
    let errors = [];

    if (req.body.password != req.body.password2) {
        errors.push({ text: 'password did not match' });
    }

    if (req.body.password.length < 4) {
        errors.push({ text: 'password must be atleast 4 characters' });
    }

    if (errors.length > 0) {

        res.status(400).json({ message: errors, type: 'error', status: 400 },)
    }
    else {
        User.findOne({ email: req.body.email })
            .then(user => {

                if (user) {
                    res.status(400).json({ message: 'Mail already exists', type: 'error', status: 400 })
                }
                else {
                    const newUser = new User({
                        email: req.body.email,
                        password: req.body.password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    res.status(200).json({ message: 'Login succesful!', type: 'success', status: 200 })

                                })
                                .catch(err => {
                                    console.log(err);
                                    return;
                                });
                        });
                    });
                }
            });

    }
});

//logout user
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;
