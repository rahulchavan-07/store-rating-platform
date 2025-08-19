const router = require('express').Router();
const { signup, login, logout, changePassword } = require('../controllers/authController');
const { auth } = require('../middlewares/auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.patch('/password', auth(), changePassword);

module.exports = router;
