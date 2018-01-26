var config = require('../config');
var User = require('../model/User')

var Actions = {};
module.exports = Actions;


/**
 * Home Action
 * @author: OJesusO
 */
Actions.home = function(req, res){
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    }
    res.render("User/home", {title:'Home'});         //已登录则渲染home页面
};


/**
 * Logout Action
 * @author: OJesusO
 */
Actions.logout = function(req, res){
    req.session.user = null;
    req.session.error = null;
    res.redirect("/");
};


/**
 * Login Action
 * @author: OJesusO
 */
Actions.login = new function(){
    var _obj = this;
    _obj.UserLogic = User.logic;
    _obj.get = function(req, res){
        res.render("User/login", {title:'User Login'});
    };
    _obj.post = function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        _obj.UserLogic.login(username, password, function(status, info){
            if (status > 0) {
                req.session.user = info;
                res.send(200);
                // res.redirect("/home");
            } else if (status === 0) {
                res.send(500);
            } else {
                req.session.error = info;
                res.send(404);
                // res.redirect("/login");
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
        res.render("User/register", {title:'User register'});
    };
    _obj.post = function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        _obj.UserLogic.register(username, password, function(status, info){
            if (status > 0) {
                req.session.error = '用户名创建成功！';
                res.send(200);
            } else if (status === 0) {
                res.send(500);
            } else {
                req.session.error = info;
                res.send(404);
            }
        });
    };
};
