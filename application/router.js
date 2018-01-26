var Index = require('./routes/Index');
var User = require('./routes/User');


module.exports = {_init_: function(app){

    app.use(handler_before);

    app.use('/', Index);
    app.use('/user', User);
    app.use('/login', Index);
    app.use('/register', Index);
    app.use('/home', Index);
    app.use("/logout", Index);

    app.use(handler_404);   // catch 404 and forward to error handler
    app.use(handler_error); // error handler
    
}};


/**
 * before handler
 * @author: OJesusO
 */
function handler_before(req,res,next) {
    res.locals.user = req.session.user;   // 从session 获取 user对象
    var err = req.session.error;   //获取错误信息
    delete req.session.error;
    res.locals.message = "";   // 展示的信息 message
    if(err){
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
    }
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
