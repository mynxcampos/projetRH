const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: [true, 'Pas de photo'],
    },
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    fonction: {
        type: String,
        required: [true, 'Pas de fonction'],
    },

    blame: {
        type: Number,
        required: [true, 'Pas de blâme '],
    },



})

const employeeModel = mongoose.model('employees', employeeSchema);

module.exports = employeeModel