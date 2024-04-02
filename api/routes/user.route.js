const express = require('express');
const router = express.Router();
const { test, getAll, signout, deleteUser } = require('../controllers/user.controller.js');
const { verifyToken } = require('../utils/verifyUser.js');

router.get('/test', test);
router.get('/getall', verifyToken, getAll)
router.post('/signout', signout)
router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;