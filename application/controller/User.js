var config = require('../config');
var User = require('../model/User');
var Category = require('../model/Category');

var Actions = {};
module.exports = Actions;


/**
 * Home Action
 * @author: OJesusO
 */
Actions.home = function(req, res){
    if (!req.user.islogin) {
        res.redirect('/login');                //未登录则重定向到 /login 路径
    }
    res.render('User/home', {title:'Home'});         //已登录则渲染home页面
};


/**
 * Logout Action
 * @author: OJesusO
 */
Actions.logout = function(req, res){
    req.session.user = null;
    res.redirect('/');
};


/**
 * Login Action
 * @author: OJesusO
 */
Actions.login = new function(){
    var _obj = this;
    _obj.UserLogic = User.logic;
    _obj.get = function(req, res){
        res.render('User/login', {title:'User Login'});
    };
    _obj.post = function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        _obj.UserLogic.login(username, password, function(status, info){
            if (status > 0) {console.log(info)
                req.session.user = info;
                res.status(200).send({ uname:info.username, jump:'/user/home' });
            } else if (status === 0) {
                res.sendStatus(500);
            } else {
                res.status(202).send({ info:info });
            }
        });
    };
};


/**
 * Register Action
 * @author: OJesusO
 */
Actions.register = new function(){
    var _obj = this;
    _obj.UserLogic = User.logic;
    _obj.get = function(req, res){
        res.render('User/register', {title:'User register', islogin:req.user.islogin});
    };
    _obj.post = function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        _obj.UserLogic.register(username, password, function(status, info){
            if (status > 0) {
                if (req.body.autologin) {
                    _obj.UserLogic.login(username, password, function(status, info){
                        if (status > 0) {
                            req.session.user = info;
                            res.status(200).send({ jump:'/user/home' });
                        } else {
                            res.status(200).send({ jump:'/user/login' });
                        }
                    });
                } else {
                    res.status(200).send({ jump:'/user/login' });
                }
            } else if (status === 0) {
                res.sendStatus(500);
            } else {
                res.status(202).send({ info:info });
            }
        });
    };
};


/**
 * Check User Action
 * @author: OJesusO
 */
Actions.checkuser = function(req, res){
    var type = req.body.type;
    var username = req.body.username;
    var UserLogic = User.logic;
    UserLogic.getUserByUsername(username, function(status, info){
        if (status <= 0) {
            res.sendStatus(500);  //无法响应
        } else if(info){
            res.sendStatus(200);  //已存在用户
        } else {
            res.sendStatus(204);  //不存在用户
        }
    });
};
