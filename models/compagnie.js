const mongoose = require('mongoose')

const compagnieSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'pas de nom'],
    },

    siret: {
        type: Number,
        required: [true, 'pas de numero'],

    },

    mail: {
        type: String,
        required: [true, 'pas de mail'],
    },

    director: {
        type: String,
        required: [true, 'pas de nom'],
    },

    password: {
        type: String,
        required: [true, 'pas de password'],
    },

    employees: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "employees"
        }],
    },




})

const compagnieModel = mongoose.model('compagnie', compagnieSchema);

module.exports = compagnieModel