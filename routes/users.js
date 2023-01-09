const express = require('express');
const userController = require('../controllers/user.controller');
const chechAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

/*------- Routes for SignUp, Login, Getting all users details, Deleting Single User, Updating user details,Getting single user details  ------*/


router.post('/createuser',userController.signUp);
router.post('/login',userController.login);
router.get('/users/:page',chechAuthMiddleware.checkAuth,userController.getUsers);
router.delete('/:id',chechAuthMiddleware.checkAuth,userController.delete);
router.patch('/:id',chechAuthMiddleware.checkAuth,userController.update);
router.get('/:id',chechAuthMiddleware.checkAuth,userController.show);

module.exports = router;