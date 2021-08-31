const Router = require('express').Router;
const AuthController = require('../controllers/auth-controller');

const router = Router();

router.post('/registration', [
    AuthController.registration
]);

router.post('/login', [
    AuthController.login
]);

module.exports = router;