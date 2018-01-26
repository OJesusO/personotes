var express = require('express');
var router = express.Router();
var User = require('../controller/User')


router.get('/', User.home);
router.get("/home", User.home);
router.route("/login").get(User.login.get).post(User.login.post);
router.route("/register").get(User.register.get).post(User.register.post);
router.get("/logout", User.logout);


module.exports = router;
