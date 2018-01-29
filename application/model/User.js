var config = require('../config');
var util = require('util');
var bcrypt = require('bcryptjs');
var _db = require('./_db');


var UserModel = _db.UserModel;
var UserLogic = {
    /**
     * 用户登录操作
     * @param {String} username 用户名
     * @param {String} password 密码
     * @param {Function} callback(status, info) 回调函数
     * @param {Number} status 回调状态
     * @param {Mixed} info 回调信息
     * @author: OJesusO
     */
    login: function(username, password, callback) {
        UserLogic.getUserByUsername(username, function(status, info){
            if (status <= 0) {
                callback(0, '');
            } else if(!info){
                callback(-1, '用户名或密码错误！');  //用户名不存在
            } else {
                if(!UserLogic._password(password, info.password)) {
                    callback(-2, '用户名或密码错误！');  //密码错误
                } else {
                    callback(1, info);
                }
            }
        });
    },

    /**
     * 用户注册操作
     * @param {String} username 用户名
     * @param {String} password 密码
     * @param {Function} callback(status, info) 回调函数
     * @param {Number} status 回调状态
     * @param {Mixed} info 回调信息
     * @author: OJesusO
     */
    register: function(username, password, callback) {
        UserLogic.getUserByUsername(username, function(status, info){
            if (status <= 0) {
                callback(0, '');
            } else if(info){
                callback(-1, '用户名已存在！');
            } else {
                UserModel.create({
                    username: username,
                    password: UserLogic._password(password),
                    avatar: config.default_avatar,
                    cretime: Date(),
                }, function(err, doc){
                    if (err) {
                        callback(0, '');
                    } else {
                        callback(1, doc);
                    }
                });
            }
        });
    },

    /**
     * 根据用户名获取用户信息
     * @param {String} username 用户名
     * @param {Function} callback(status, info) 回调函数
     * @param {Number} status 回调状态
     * @param {Mixed} info 回调信息
     * @author: OJesusO
     */
    getUserByUsername: function(username, callback) {
        UserModel.findOne({username:username}, function(err, doc){
            if (err) {
                app.DEBUG(err);
                callback(0, err);
            } else {
                callback(1, doc);
            }
        });
    },

    /**
     * 生成加密密码 | 检查用户的密码
     * @param {String} pwd1 当前输入密码
     * @param {String} pwd2 已经保存密码
     * @return {Mixed} 生成用于保存的密码串 | 是否检查通过（true|false）
     * @author: OJesusO
     */
    _password: function(pwd1, pwd2) {
        if (pwd2 && util.isString(pwd2)) {
            return bcrypt.compareSync(pwd1, pwd2);
        } else {
            return bcrypt.hashSync(String(pwd1), config.pwd_salt_rounds);    //Auto-gen a salt and hash
        }
    },
};


module.exports = {
    model: UserModel,
    logic: UserLogic,
};
