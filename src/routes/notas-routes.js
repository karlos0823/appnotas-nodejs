const { Router } = require('express');

const { renderFormNotas, crearNuevaNota, renderNotas, renderFormEditar,actualizarNota,eliminarNota } = require('../controllers/notas-controllers');
const { autenticacion } = require('../helpers/auth');

const router = Router();
//Ruta muestra el formulario para una nueva nota
router.get('/notas/agregar', autenticacion, renderFormNotas);

//Ruta que recibe los datos de la nueva nota
router.post('/notas/nueva-nota', autenticacion, crearNuevaNota );

//Ruta que muestra todas las notas
router.get('/notas', autenticacion, renderNotas);

//Ruta que muestra el formulario para editar la nota
router.get('/notas/editar/:id', autenticacion,  renderFormEditar);

//Ruta que recibe los datos para editar la nota
router.put('/notas/editar/:id', autenticacion, actualizarNota);

//Ruta para eliminar notas
router.delete('/notas/eliminar/:id',autenticacion, eliminarNota);

module.exports = router;

