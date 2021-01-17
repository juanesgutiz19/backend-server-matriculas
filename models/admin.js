const { Schema, model } = require('mongoose');

const AdminSchema = Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
});

AdminSchema.method('toJSON', function() {
    const { __v, uid, ...object } = this.toObject();
    object.uid = uid;
    return object;
});


module.exports = model('Admin', AdminSchema);