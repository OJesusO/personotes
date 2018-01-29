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
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录！"
        res.redirect("/login");                //未登录则重定向到 /login 路径
    } else {
        console.log(Category.model.findOne(), 666)
        Category.model.create({
            pid: Category.model.findOne()._id,   //上级分类Id(用于表自关联)
            name: 'asdf',  //分类名
            user_id: req.session.user, //分类创建者
            lock: true,  //是否处于锁定(0|1)
            cretime: Date(),       //用户创建时间
        }, function(err, doc){
            console.log(err, doc)
        })
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
        res.render("User/register", {title:'User register', isLogin:Boolean(req.session.user)});
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
