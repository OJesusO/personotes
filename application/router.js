var config = require('./config');
var Index = require('./routes/Index');
var User = require('./routes/User');
var Article = require('./routes/Article');


module.exports = {_init_: function(app){

    app.use(handler_before);

    app.use('/', Index);
    app.use('/user', User);
    app.use('/article', Article);

    app.use(handler_404);   // catch 404 and forward to error handler
    app.use(handler_error); // error handler

}};


/**
 * before handler
 * @author: OJesusO
 */
function handler_before(req, res, next) {
    req.user = {
        uinfo: req.session.user,
        islogin: Boolean(req.session.user),
    };
    res.locals.uinfo = req.session.user;
    res.locals.config = config;
    next();  //中间件传递
};

/**
 * 404 handler
 * @author: OJesusO
 */
function handler_404(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
};

/**
 * error handler
 * @author: OJesusO
 */
function handler_error(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
};
