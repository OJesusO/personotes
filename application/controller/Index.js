var config = require('../config');
var path = require('path');

var Actions = {};
module.exports = Actions;


/**
 * Index Action
 * @author: OJesusO
 */
Actions.index = function(req, res, next) {
    console.log(config._app());
    // config._app().set('views', path.join(__dirname, 'viewss'));
    res.render('Index/index', { title: 'Express' });
};
