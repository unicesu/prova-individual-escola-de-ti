const express = require('express');
const router = express.Router();
const viagemController = require('../controllers/viagemController');

router.get('/', viagemController.getAllViagens);
router.post('/', viagemController.createViagem);
router.get('/:id', viagemController.getViagemById);
router.put('/:id', viagemController.updateViagem);
router.delete('/:id', viagemController.deleteViagem);

router.post('/:id/destinos', viagemController.addDestino);
router.delete('/:id/destinos/:destinoId', viagemController.removeDestino);

module.exports = router;
