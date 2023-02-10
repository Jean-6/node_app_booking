const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');


router.post('/signup',userCtrl.signup);
router.get('/all',userCtrl.getAllUser);
router.delete('/delete/:id',userCtrl.deleteUser);
router.post('/add',userCtrl.createUser);
router.get('/:id',userCtrl.getUserById);
router.put('/update/:id',userCtrl.updateUserById);
router.patch('/update-part/:id',userCtrl.updatePartUserById);
module.exports = router;