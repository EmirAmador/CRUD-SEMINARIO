

/*RUTAS GET Y POST PARA EL GUARDADO, ACTUALIZACION, EDITAR Y BORRAR 
UN REGISTRO DE LA BASE DE DATOS
*/


const routerm = require('express').Router();

const carreraController = require('../controllers/carreraController');

routerm.get('/', carreraController.listm);
routerm.post('/addm', carreraController.savem);
routerm.get('/updatem/:id', carreraController.editm);
routerm.post('/updatem/:id', carreraController.updatem);
routerm.get('/deletem/:id', carreraController.deletem);


module.exports = routerm;

