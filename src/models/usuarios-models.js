const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema ({

    nombre:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    }

}, {

    timestamps: true

});

//recibe el parametro password, contraseña que ingresa el usuario
UsuarioSchema.methods.encryptPassword = async password => {

    //Definimos los saltos
    const salto = await bcrypt.genSalt(10);

    //Encriptamos la contraseña del usuario
    return await bcrypt.hash(password, salto);

};

//Compara las contraseñas encriptadas
UsuarioSchema.methods.matchPassword = async function (password) {

    //metodo compare, compara el la contraseña cifrada de la BD con la contraseña que ingresó el usuario
    return await bcrypt.compare(password, this.password);//devuelve true o false

}

module.exports = model('Usuario', UsuarioSchema);