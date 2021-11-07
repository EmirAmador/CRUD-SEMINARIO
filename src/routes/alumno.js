


/*RUTAS GET Y POST PARA EL GUARDADO, ACTUALIZACION, EDITAR Y BORRAR 
UN REGISTRO DE LA BASE DE DATOS
*/


const router = require('express').Router();

const alumnoController = require('../controllers/alumnoController');

router.get('/', alumnoController.list);
router.post('/add', alumnoController.save);
router.get('/update/:id', alumnoController.edit);
router.post('/update/:id', alumnoController.update);
router.get('/delete/:id', alumnoController.delete);

module.exports = router;

