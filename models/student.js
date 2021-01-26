const { Schema, model } = require('mongoose');

const StudentSchema = Schema({

    identityDocument: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    guardianName: {
        type: String,
        required: true,
    },
    guardianContactNumber: {
        type: String,
        required: true,
    },
    lastApprovedGrade: {
        type: String,
        required: true,
    },
}, { collection: 'students' });

StudentSchema.method('toJSON', function() {
    const { __v, uid, ...object } = this.toObject();
    object.uid = uid;
    return object;
});

module.exports = model('Student', StudentSchema);