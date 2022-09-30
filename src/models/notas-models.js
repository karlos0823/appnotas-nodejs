const { Schema, model } = require('mongoose');

const SchemaNota = new Schema({

    titulo:{
        type: String,
        required: true
    },

    descripcion:{
        type: String,
        required: true
    },

    usuario: {
        type: String,
        required: true
    }

}, {
    //Agrega dos campos al esquema, fecha de creación y fecha de actualización
    timestamps: true
});


module.exports = model('Nota', SchemaNota);