const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    formId: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    fields: [
        {
            question: {
                type: String,
                required: true,
            },
            answer: {
                type: String,
                required: false,
            },
        },
    ],
    submissionDate: {
        type: Date,
        default: Date.now,
    }
})


const answers = new mongoose.model('answers', answerSchema);

module.exports = answers;