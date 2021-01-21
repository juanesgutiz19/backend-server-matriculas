const { Schema, model } = require('mongoose');

const DegreeSchema = Schema({
    degree: {
        type: String,
        required: true
    },
    subjects: {
        type: String,
        required: true,
    },
}, { collection: 'degrees' });

module.exports = model('Degree', DegreeSchema);