var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    username : { type: String,required:true },
    password: {type: String,required:true},
    userage: {type: Number},
    logindate : { type: Date}
});
var UserModel = mongoose.model('User', UserSchema);
var UserLogic = {
    getUserByUsername: function(username, callback){
        UserModel.findOne({username:username}, function(err, doc){
            if (err) {
                app.DEBUG(err);
                callback(0, err);
            } else {
                callback(1, doc);
            }
        });
    },
    login: function(username, password, callback){
        UserLogic.getUserByUsername(username, function(status, info){
            if (status <= 0) {
                callback(0, '');
            } else if(!info){
                callback(-1, '用户名不存在');
            } else {
                if(password != info.password) {
                    callback(-2, '密码错误');
                } else {
                    callback(1, info);
                }
            }
        });
    },
    register: function(username, password, callback){
        UserLogic.getUserByUsername(username, function(status, info){
            if (status <= 0) {
                callback(0, '');
            } else if(info){
                callback(-1, '用户名已存在');
            } else {
                UserModel.create({
                    username: username,
                    password: password
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
};


module.exports = {
    model: UserModel,
    logic: UserLogic,
};
