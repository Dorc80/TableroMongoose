const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    weight: {
        type: Number,
        required: [true, 'El peso es obligatorio']
    },
    age: {
        type: Number,
        required: [true, 'La edad es obligatoria']
    },
    gender: {
        type: String,
        required: [true, 'El sexo es obligatorio']
    }

});

module.exports = mongoose.model("Animal", AnimalSchema);