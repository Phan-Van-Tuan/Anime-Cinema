const express = require('express');
const router = express.Router();

const movieController = require('../app/controllers/MovieController');



router.get('/create', movieController.create);
router.post('/store', movieController.store);
router.post('/handle-form-actions', movieController.handleFormActions);
router.get('/:id/edit', movieController.edit);
router.put('/:id', movieController.update);
router.patch('/:id/restore', movieController.restore);
router.delete('/:id', movieController.delete);
router.delete('/delete-forever/:id', movieController.deleteForever);
router.get('/:slug', movieController.show);

module.exports = router;