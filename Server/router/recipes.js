const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { recipesController} = require('../controllers');

// middleware that is specific to this router

router.get('/', recipesController.getRecipes);
router.post('/', auth(), recipesController.createRecipe);

router.get('/:recipeId', recipesController.getRecipe);
router.get('/:recipeId', auth(), recipesController.like);
router.put('/:recipeId', auth(), recipesController.editRecipe);
router.delete('/:recipeId', auth(), recipesController.deleteRecipe);

router.get('/:userId/recipes', auth(), recipesController.getMyRecipes);

module.exports = router