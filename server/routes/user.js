const express = require('express');
const router = express.Router();
const answer = require('../models/answerSchema');
const forms = require('../models/formSchema');


//User side routes
router.get('/user/form/:id', async (req, res) => {
    try {
        const form = await forms.findById(req.params.id);
        res.status(201).json(form);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong!");
    }
})

router.post('/user/form/:id', async (req, res) => {
    try {
        const form = await forms.findById(req.params.id);
        const { user, fields } = req.body;
        // console.log(fields)
        
        const addAnswer = new answer({ formId: form._id, user, fields });
        await addAnswer.save();
        res.status(201).json(addAnswer);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong!");
    }
})

module.exports = router;