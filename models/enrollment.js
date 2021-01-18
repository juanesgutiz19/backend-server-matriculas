const { Schema, model } = require('mongoose');

const EnrollmentSchema = Schema({
    enrollmentYear: {
        type: String,
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
});

EnrollmentSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Enrollment', EnrollmentSchema);