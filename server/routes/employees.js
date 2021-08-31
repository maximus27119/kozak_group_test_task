const Router = require('express').Router;
const EmployeeController = require('../controllers/employee-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = Router();

router.post('/employees', [
    authMiddleware,
    EmployeeController.insert
]);

router.get('/employees', [
    authMiddleware,
    EmployeeController.list
]);

router.get('/employees/:id', [
    authMiddleware,
    EmployeeController.getById
]);

router.patch('/employees/:id', [
    authMiddleware,
    EmployeeController.patchById
]);

router.delete('/employees/:id', [
    authMiddleware,
    EmployeeController.removeById
]);

module.exports = router;