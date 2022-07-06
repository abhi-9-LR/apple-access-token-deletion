const express = require('express')

const router = express.Router();

const webHookController = require('../controller/webHookController')

router.post('/webhook', webHookController.webhookPayload)


module.exports = router;