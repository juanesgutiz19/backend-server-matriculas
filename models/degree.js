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

DegreeSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Degree', DegreeSchema);