const express = require('express');
const drugController = require('../../controllers/drug.controllers');

const router = express.Router();
router
    .route('/search')
    .get(drugController.search);


module.exports = router;