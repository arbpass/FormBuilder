const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    coverImg: {
        type: String,
        required: false,
    },
    fields: [
        {
            name: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
                enum: ['text', 'number', 'email', 'textarea', 'checkbox', 'radio', 'select'],
            },
            required: {
                type: Boolean,
                default: false,
            },
            options: {
                type: [String], // For select, radio, and checkbox fields, an array of options can be provided.
            },
        },
    ],
    lastModified: {
        type: Date,
        default: Date.now,
    }
})


const forms = new mongoose.model('forms', formSchema);

module.exports = forms;