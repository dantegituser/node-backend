const { Schema, model} = require('mongoose');

const RoleSchema = Schema({
    role:{
        type: String,
        required: [true,'El role 3es obligatorio']
    }
});

module.exports = model('Role', RoleSchema);