const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const GeminiController = require('../controllers/geminiController');
const ragController = require('../controllers/ragController');


router.post('/', chatController.getResponseChat);
router.post('/gemini', GeminiController.getResponseChatGemini);
router.get('/context', ragController.getContextResponse);



module.exports = router;


