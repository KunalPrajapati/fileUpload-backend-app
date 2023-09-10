const express = require('express');
const router = express.Router();

const {localFileUpload, imageUpload} = require('../controllers/fileUpload')


router.post('/imageupload', imageUpload );
router.post('/localfileupload', localFileUpload);

module.exports = router;