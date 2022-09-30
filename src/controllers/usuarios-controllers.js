const usuariosCtrl = {};
const passport = require('passport');
const Usuario = require('../models/usuarios-models');

//Muestra el formulario de registro
usuariosCtrl.renderRegistro = (req, res) => {

    res.render('users/registro-usuario');

};

//Valida los datos de registro
usuariosCtrl.registro = async (req,res) => {
    
    const errores = [];
    const { nombre, email, password, confirm_password } = req.body;

    //Verificamos si el email del usuario no está en uso
    if(await Usuario.findOne({email:email})){
        errores.push({text: `El email ${email} se encuentra en uso`});
    }
    
    //comparamos las password
    if(password != confirm_password){
        errores.push({text:'Las contraseñas no coinciden'});
    }

    //Verificamos la longitud de la contraseña
    if(password.length < 4){
        errores.push({text:'La contraseña debe de tener más de 4 caracteres'});
    }

    //Verificamos si existen errores, si no, lo ingresa a la BD
    if(errores.length > 0){

        res.render('users/registro-usuario', {
            errores,
            nombre,
            email
        });

    }else{

        //Creamos una nueva instancia del esquema Usuario para enviarle los datos
        const nuevoUsuario = new Usuario({nombre, email, password});

        //Encriptamos la contraseña antes de guardarla en la BD
        nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);

        req.flash('mensaje_positivo', 'Usuario registrado exitosamente');

        nuevoUsuario.save();

        res.redirect('/usuario/login');

    }
}

//Muestra la vista de acceso para loguearse
usuariosCtrl.renderLogin = (req, res) => {

    res.render('users/login');

};

//Validar datos de acceso
usuariosCtrl.login = passport.authenticate('local', {
    
    failureRedirect: '/usuario/login',
    successRedirect: '/notas',
    failureFlash: true

});

//Cerrar sesión
usuariosCtrl.logout = (req, res) => {

    req.logout( (err) => {

        if(err) { return next(err); }

        req.flash('mensaje_positivo', 'Session finalizada');

        res.redirect('/usuario/login');

    });

}

module.exports = usuariosCtrl;
