//Conexión a la base de datos MongoDB

const mongoose = require('mongoose');

//Conexión hacia la BD, proceso asíncrono.
mongoose.connect(process.env.MONGODB_CONEXION, {

    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(db => console.log('Base de datos conectada'))
  .catch(err => console.log('Error al conectarse a la BD', err));
