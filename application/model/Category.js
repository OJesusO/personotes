var config = require('../config');
var _db = require('./_db');


var CategoryModel = _db.CategoryModel;
var CategoryLogic = {

    // Category.model.create({
    //     pid: req.session.user._id, //Category.model.findOne()._id,   //上级分类Id(用于表自关联)
    //     name: 'asdf',  //分类名
    //     user_id: req.session.user._id, //分类创建者
    //     lock: true,  //是否处于锁定(0|1)
    //     cretime: Date(),       //用户创建时间
    // }, function(err, doc){
    //     console.log(err, doc)
    // })

    // Category.model.find().populate({
    //     path: 'pid',
    //     model:Category.model
    // }).populate({
    //     path: 'user_id',
    //     model: User.model
    // }).exec(function(a, b){
    //     res.json(b)
    // })
};


module.exports = {
    model: CategoryModel,
    logic: CategoryLogic,
};
