const notasModels = require('../models/notas-models');
const Nota = require('../models/notas-models');
const notasCtrl = {}

//Formulario nueva nota
notasCtrl.renderFormNotas = (req,res) =>{

    res.render('notes/nueva-nota');

};

//Creamos una nueva nota
notasCtrl.crearNuevaNota = async (req,res) => {

    const { titulo, descripcion } = req.body;
    const nuevaNota = new Nota({

        titulo:titulo,
        descripcion: descripcion,

    });

    //Agregamos el usuario logueado
    nuevaNota.usuario = req.user.id

    await nuevaNota.save();

    //Enviamos el mensaje de agregado la nota
    req.flash('mensaje_positivo', 'Nota agregada satisfactoriamente');

    res.redirect('/notas');

}

//obtener todas las notas
notasCtrl.renderNotas = async (req, res) =>{

    //Extraemos todas las notas de la BD
    const notas = await Nota.find({usuario: req.user._id});
    res.render('notes/total-notas', { notas });


}

//Formulario editar nota
notasCtrl.renderFormEditar = async (req, res) => {

    const nota = await Nota.findById(req.params.id);
    res.render('notes/editar-nota', { nota });

}

//Actualiza la nota en la BD
notasCtrl.actualizarNota = async (req, res) => {

    const {titulo, descripcion } = req.body;
    await Nota.findByIdAndUpdate(req.params.id,{

        titulo: titulo,
        descripcion: descripcion

    });

    req.flash('mensaje_positivo', 'Nota actualizada satisfactoriamente');
    res.redirect('/notas');

}

//Eliminar notas
notasCtrl.eliminarNota = async (req, res) => {

    await Nota.findByIdAndDelete(req.params.id);
    req.flash('mensaje_positivo','Nota eliminada satisfactoriamente');
    res.redirect('/notas');

}

module.exports = notasCtrl;
