const express = require('express');
const imageController = require('../controllers/image.controller');
const imageUploader = require('../helpers/image-uploader');
const chechAuth = require('../middleware/check-auth');

const router = express.Router();

/*------- Route for uploading image ------*/
router.post('/uploads',chechAuth.checkAuth,imageUploader.upload.single('image'),imageController.upload);

module.exports = router;