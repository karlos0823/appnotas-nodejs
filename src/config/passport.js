const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/usuarios-models');

passport.use( new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password'

}, async (email, password, callbackDone) => {

    const usuario = await User.findOne({email:email})

    if(!usuario){

        return callbackDone(null, false, {message: 'Usuario no encontrado'});

    }else{

        const match = await usuario.matchPassword(password);

        if(match) {

            return callbackDone(null,usuario);

        }else{

            return callbackDone(null, false, {message: 'Contraseña incorrecta'});

        }

    }

}));


passport.serializeUser((user, callbackDone)=>{

    callbackDone(null,user.id)

});


passport.deserializeUser((id, callbackDone)=>{

    User.findById(id, (err, user) => {

        callbackDone(err, user);

    })

});