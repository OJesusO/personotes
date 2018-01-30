var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// User
var UserSchema = new Schema({
    username : {type:String, required:true},  //用户名
    password: {type:String, required:true},     //用户密码
    open_pwd: String,    //open 密码
    avatar: String,      //用户头像
    cretime: Date,       //用户创建时间
});

// Article
var ArticleSchema = new Schema({
    title: String,   //文章标题
    content: String,  //文章内容
    user_id: {type:ObjectId, ref:'User'}, //文章创建者
    cretime: Date,   //文章创建时间
    category: Date,  //文章分类
    tags: Array,  //文章标签
    show: Boolean,  //是否推送展示(0|1)
    private: Boolean,   //是否为私密文章(0|1)
});

// Category
var CategorySchema = new Schema({
    pid: {type:ObjectId, ref:'Category'},   //上级分类Id(用于表自关联)
    name: String,  //分类名
    user_id: {type:ObjectId, ref:'User'}, //分类创建者
    lock: Boolean,  //是否处于锁定(0|1)
    cretime: Date,       //用户创建时间
});

// Share
var ShareSchema = new Schema({
    article_id: {type:ObjectId, ref:'Article'},   //文章Id
    share_hash: String,  //分享hash
    share_start: Date, //分享开始时间
    share_end: Date, //分享结束时间
    user_id: {type:ObjectId, ref:'User'}, //创建者
    cretime: Date,   //创建时间
});


module.exports = {
    UserModel: mongoose.model('User', UserSchema),
    ArticleModel: mongoose.model('Article', ArticleSchema),
    CategoryModel: mongoose.model('Category', CategorySchema),
    ShareModel: mongoose.model('Share', ShareSchema),
};
