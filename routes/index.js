var express = require('express');
var router = express.Router();

router.get('/', (req, res) => res.render('index', { user: req.user }))
router.get('/login', (req, res, next) => res.render('login'))
router.get('/register', (req, res) => res.render('register'))
router.post('/register', (req, res) => auth_controller.doRegister(req, res))
router.post('/login', (req, res) => auth_controller.doLogin(req, res))

module.exports = router;
