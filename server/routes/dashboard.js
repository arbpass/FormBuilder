const express = require('express');
const router = express.Router();
const forms = require('../models/formSchema');
const answer = require('../models/answerSchema');

//User side routes
router.get('/dashboard/forms', async (req, res) => {
    try {
        const allForms = await forms.find();
        res.status(201).json(allForms);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong!");
    }
})

router.get('/dashboard/form/:id', async (req, res) => {
    try {
        const form = await forms.findById(req.params.id);
        res.status(201).json(form);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong!");
    }
})

router.get('/dashboard/form/responses/:id', async (req, res) => {
    try {
        const answers = await answer.find({ formId: req.params.id });
        res.status(201).json(answers);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong!");
    }
})

router.post('/dashboard/save', async (req, res) => {
    try {
        const { title, description, owner, active, coverImg, fields } = req.body;
        const addForm = new forms({ title, description, owner, active, coverImg, fields });
        await addForm.save();

        res.status(201).json("Form saved successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong!");
    }
})

router.post('/dashboard/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, coverImg, fields } = req.body;
        const formToBeEdited = await forms.findOne({ _id: id });
        await forms.updateOne({ _id: formToBeEdited._id }, {
            $set: { title, description, coverImg, fields, lastModified: Date.now() }
        });
        res.status(201).json('Form updated successfully!');
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong!");
    }
})

router.post('/dashboard/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const formToBeDeleted = await forms.findOne({ _id: id });
        await forms.deleteOne({ _id: formToBeDeleted._id });
        res.status(201).json('Form deleted successfully!');
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong!");
    }
})

router.post('/dashboard/status/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const formToBeEdited = await forms.findOne({ _id: id });
        if (formToBeEdited.active) {
            await forms.updateOne({ _id: formToBeEdited._id }, {
                $set: { active: false, lastModified: Date.now() }
            });
            res.status(201).json('Form deactivated successfully!');
        }
        else {
            await forms.updateOne({ _id: formToBeEdited._id }, {
                $set: { active: true, lastModified: Date.now() }
            });
            res.status(201).json('Form activated successfully!');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong!");
    }
})

module.exports = router;