const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { recipesController } = require('../controllers');

// middleware that is specific to this router

router.get('/:recipeId', auth(), recipesController.like);

module.exports = router
