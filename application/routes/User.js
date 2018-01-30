var express = require('express');
var router = express.Router();

var User = require('../controller/User')


router.get(/^\/(index|home)?$/, User.home);
router.route("/login").get(User.login.get).post(User.login.post);
router.route("/register").get(User.register.get).post(User.register.post);
router.get("/logout", User.logout);
router.post("/checkuser", User.checkuser);


module.exports = router;
