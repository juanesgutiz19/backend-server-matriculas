const { Schema, model } = require('mongoose');

const GroupSchema = Schema({
    mainTeacher: {
        type: String,
        required: true
    },
    dayShift: {
        type: String,
        required: true
    },
    quota: {
        type: Number,
        required: true
    },
    degree: {
        type: Schema.Types.ObjectId,
        ref: 'Degree',
        required: true
    },
});

GroupSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Group', GroupSchema);