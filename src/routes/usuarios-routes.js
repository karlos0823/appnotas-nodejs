const { Router } = require ('express');
const router = Router();

const { renderLogin, renderRegistro, login, registro, logout } = require('../controllers/usuarios-controllers');


//Muestra el formulario de acceso
router.get('/usuario/login', renderLogin);

//Valida datos de acceso
router.post('/usuario/login', login);

//Muestra el formulario de registro
router.get('/usuario/registro', renderRegistro);

//Valida datos de registro
router.post('/usuario/registro', registro);

//cerrar sesión
router.get('/usuario/logout', logout);

module.exports = router;