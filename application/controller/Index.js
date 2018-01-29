var config = require('../config');

var Actions = {};
module.exports = Actions;


/**
 * Index Action
 * @author: OJesusO
 */
Actions.index = function(req, res, next) {
    res.render('Index/index', { title: 'Express' });
};
