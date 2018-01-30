var config = require('../config');

var Actions = {};
module.exports = Actions;


/**
 * List Action
 * @author: OJesusO
 */
Actions.list = function(req, res, next) {
    res.send('Article.list');
};


/**
 * Detail Action
 * @author: OJesusO
 */
Actions.detail = function(req, res, next) {
    res.send('Article.detail');
};


/**
 * Add Action
 * @author: OJesusO
 */
Actions.add = new function(){
    var _obj = this;
    _obj.get = function(req, res){
        res.send('Article.add');
    };
    _obj.post = function(req, res){
        var name = req.body.name;
        res.status(200).send({ info:'Article.add' });
    };
};


/**
 * Edit Action
 * @author: OJesusO
 */
Actions.edit = new function(){
    var _obj = this;
    _obj.get = function(req, res){
        res.send('Article.edit');
    };
    _obj.post = function(req, res){
        var name = req.body.name;
        res.status(200).send({ info:'Article.edit' });
    };
};


/**
 * Delete Action
 * @author: OJesusO
 */
Actions.delete = function(req, res, next) {
    res.send('Article.delete');
};
