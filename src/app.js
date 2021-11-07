//APP.JS DEL CRUD
//PROYECTO DEL SEGUNDO PARCIAL SEMINARIO TALLER DE SOFTWARE

const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');

const app = express();

// Realizamos las importacion de las rutas de la carpeta routes
    const alumnoRoutes = require('./routes/alumno');
    const carreraRoutes = require('./routes/carrera')


          // CONFIGURACION DEL ENV Y DEL PUERTO 
          /*ADEMAS UTILICE __dirname es una variable de entorno que indica la ruta de acceso absoluta 
          del directorio que contiene el archivo que se está ejecutando actualmente.
          */
          app.set('port', process.env.PORT || 17000);
          app.set('views', path.join(__dirname, 'views'));
          app.set('view engine', 'ejs');




                /*EL ENV DENTRO DE LA APP.JS DONDE REALICE LA CONEXION A LA BASE DE DATOS 
                delvis_amador_db.db*/

                app.use(morgan('dev'));
                app.use(myConnection(mysql, {
                  host: 'localhost',
                  user: 'devuser',
                  password: '123ABcd.',
                  port: 3306,
                  database: 'delvis_amador_db'
                }, 'single'));
                app.use(express.urlencoded({extended: false}));



                // llamado de las rutas a la carpeta routes de alumnos y carreras.

                app.use('/', alumnoRoutes);
                app.use('/carreras', carreraRoutes)


                /*UTILICE ARCHIVO ESTATICO Y LO PUSE PUBLICO 
                ADEMAS EL INICIO DEL SERVIDOR
                REALMENTE ME COSTO ADAPTAR ESTA PARTE LA BUSQUE DE UN EJEMPLO EN GOOGLE
                https://expressjs.com/es/starter/static-files.html
                */
                          app.use(express.static(path.join(__dirname, 'public')));
                          app.listen(app.get('port'), () => {
                            console.log(`server on port ${app.get('port')}`);
                          });
