const router = require('express').Router();
const users = require('./users');
const recipes = require('./recipes');
const recents = require('./recents');
const likes = require('./likes');
const test = require('./test');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/recipes', recipes);
router.use('/recents', recents);
router.use('/likes', likes);
router.use('/test', test);

router.use('/my-recipes', recipes);

module.exports = router;
