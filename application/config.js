var path = require('path');

var CONFIG = {
    pwd_salt_rounds: 8,
    default_avatar: '/images/avatar.jpg',
    db: {
        mongodb: 'mongodb://localhost:27017/nodedb',
    },
    skins: {
        default: {
            //path: true,  //[true, 'application', 'views', 'default'] || ['default'] || true
            engine: 'ejs',
        }
    },
};
var _app = {};
var _skin = '';

module.exports = CONFIG;


/**
 * 初始化配置 & app
 * @author: OJesusO
 */
CONFIG._init_ = function(app){
    var express = require('express');
    var favicon = require('serve-favicon');

    app.use(express.static(path.join(app.BASE_DIR, 'public')));
    app.use(favicon(path.join(app.BASE_DIR, 'public', 'static', 'favicon.ico')));

    this._app(app);
    this._skin(_skin||'default', true);

    initDatabase();
};


/**
 * 获取|获取 app 操作对象
 * @author: OJesusO
 */
CONFIG._app = function (app) {
    if (app) {
        _app = app;
    } else {
        return _app;
    }
};

/**
 * 获取|设置皮肤
 * @param {String} name 皮肤名称
 * @param {Mixed} set 是否设置皮肤
 * @author: OJesusO
 */
CONFIG._skin = function (name, set) {
    if (!name) {
        return set ? false : _skin;
    } else if (!set) {
        return set === null ? (this.skins[name] || {}) : Boolean(this.skins[name]);
    }

    var skin = this.skins[name];
    if (skin) {
        // view engine setup
        var type = typeof(skin.path);
        if (type === 'undefined' ||
            type === 'boolean') {
            skin.path = [name];
        } else if (type === 'string') {
            skin.path = [skin.path];
        }
        if (skin.path[0] == true) {
            skin.path.shift();
        } else {
            skin.path.unshift.apply(skin.path, ['application', 'views']);
        }
        skin.path.unshift(_app.BASE_DIR);

        _app.set('views', path.join.apply(null, skin.path));
        _app.set('view engine', skin.engine);
        return true;
    } else {
        return false;
    }
};

/**
 * 初始化数据库
 * @author: OJesusO
 */
function initDatabase() {
    var mongoose = require('mongoose');
    mongoose.connect(CONFIG.db.mongodb);
};
