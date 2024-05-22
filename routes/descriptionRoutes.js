const express = require('express');
const router = express.Router();
const descriptionController = require('../controllers/descriptionControllers');

router.get('/:id', descriptionController.getDescriptionById);

module.exports = router;