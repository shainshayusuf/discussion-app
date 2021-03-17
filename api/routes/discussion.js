const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


require('../models/discussion');
const Discussion = mongoose.model('discussions');


router.post('/addTopic', (req, res) => {
    const newTopic = new Discussion({
        topic: req.body.title,
        description: req.body.description,
        createdBy: req.body.user,
        date: new Date()
    });
    try {
        newTopic.save();
        res.status(200).json({ message: 'Added successful' })
    } catch (err) {
        res.status(400).json({ message: 'some error occured' })
    }
})


router.get('/getAll', (req, res) => {
    Discussion.find({}, function (err, users) {
        var userMap = [];

        users.forEach(function (user) {
            userMap.push(user)
        });

        res.status(200).json({ data: userMap });
    });
})


router.put('/addComment', (req, res) => {
    if (req.body.comment == null || req.body.comment == '') {
        res.send(400);
    }
    else {
        Discussion.findByIdAndUpdate(req.body.id, { $push: { comments: [req.body.comment] } },
            function (err, docs) {
                if (err) {
                    res.send(400);
                }
                else {
                    res.send(docs)
                }
            });
    }
})

module.exports = router;