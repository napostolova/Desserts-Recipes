const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { recentController } = require('../controllers');

// middleware that is specific to this router

router.get('/', recentController.getLatestsRecipes);

module.exports = router