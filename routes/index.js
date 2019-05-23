var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {req.session.host = req.hostname; res.render('index', {req: req});})
router.get('/session', (req, res) => res.render('session', {req: req}))
router.get('/login', (req, res, next) => res.render('login', {req: req}))
router.get('/register', (req, res) => res.render('register', {req: req}))
router.post('/register', (req, res) => auth_controller.doRegister(req, res))
router.post('/login', (req, res) => auth_controller.doLogin(req, res))

function updateSession(req, res, next) {
  next();
}

module.exports = router;
