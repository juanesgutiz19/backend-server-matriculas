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

module.exports = model('Admin', AdminSchema);