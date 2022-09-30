const helpers = {}

helpers.autenticacion = (req, res, next) => {

    if(req.isAuthenticated()){

        return next();

    }

    req.flash('mensaje_negativo', 'No está autorizado');
    res.redirect('/usuario/login')

}

module.exports = helpers;