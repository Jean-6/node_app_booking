const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth');

router.post('/reset-password-by-email',authCtrl.resetPassByEmail);
router.post('/reset-password-by-form',authCtrl.resetPassByForm);// todo:
router.post('/signup',authCtrl.signup);
router.post('/login',authCtrl.login);
router.get('/logout',authCtrl.logout);
module.exports = router;