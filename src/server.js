const path = require('path');

const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


//Inicializaciones
    const app = express();
    require('./config/passport');

//Configuraciones de Modulos

    //Configuramos el puerto de acceso
    app.listen( process.env.PORT || 4000, () => {
        console.log('Servidor corriendo en el puerto', process.env.PORT || 4000);
    });

    //Configuramos la ruta hacia la carpeta views, lo usaremos en la configuración de handelbars
    app.set('views', path.join(__dirname, 'views'));

    //configuración de handelbars
    app.engine('.hbs', exphbs.engine({

        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs',

        runtimeOptions:{
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }

    }));

    app.set('view engine', '.hbs');

//Middelwares

    //Convierte en formato json los datos que entran 
    app.use(express.urlencoded({extended: false}));

    //Nos servirá para enviar metodos put y delete desde la vista html
    app.use(methodOverride('_method'));

    //Configuramos la session para los mensajes y para la sesion de usuario
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized:true
    }));

    //para la sesión de usuario
    app.use(passport.initialize());
    app.use(passport.session());

    //Le indicamos a express que utilice la función flash()
    app.use(flash());

//Variables globales

    //Guardamos los mensajes que envian las vistas en variables globales
    app.use((req, res, next)=>{

        res.locals.mensaje_positivo = req.flash('mensaje_positivo');
        res.locals.mensaje_negativo = req.flash('mensaje_negativo');
        
        //errores de passport
        res.locals.error = req.flash('error');

        //guardamos el usuario logueado en una variable global
        res.locals.user = req.user || null;
        next();

    });

//Routes

    app.use(require('./routes/index-routes'));
    app.use(require('./routes/notas-routes'));
    app.use(require('./routes/usuarios-routes'));

//Archivos estáticos
    app.use(express.static(path.join(__dirname,'public')));






