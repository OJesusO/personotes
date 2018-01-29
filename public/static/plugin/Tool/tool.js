/**
 * [工具类]
 * @author OJesusO
 * @last 2017-08-04
 */

var TOOL = {};
(function(W, tool){
	//base
	(function(){
		tool.each = function(elements, callback, hasOwnProperty) {
			if (!elements) {
				return this;
			}
			if (typeof elements.length === 'number') {
				[].every.call(elements, function(el, idx) {
					return callback.call(el, idx, el) !== false;
				});
			} else {
				for (var key in elements) {
					if (hasOwnProperty) {
						if (elements.hasOwnProperty(key)) {
							if (callback.call(elements[key], key, elements[key]) === false) return elements;
						}
					} else {
						if (callback.call(elements[key], key, elements[key]) === false) return elements;
					}
				}
			}
			return this;
		};

		tool.extend = function() {
			var options, name, src, copy, copyIsArray, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;

			if (typeof target === 'boolean') {
				deep = target;

				target = arguments[i] || {};
				i++;
			}

			if (typeof target !== 'object' && !tool.isFunction(target)) {
				target = {};
			}

			if (i === length) {
				target = this;
				i--;
			}

			for (; i < length; i++) {
				if ((options = arguments[i]) != null) {
					for (name in options) {
						src = target[name];
						copy = options[name];

						if (target === copy) {
							continue;
						}

						if (deep && copy && (tool.isPlainObject(copy) || (copyIsArray = tool.isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && tool.isArray(src) ? src : [];

							} else {
								clone = src && tool.isPlainObject(src) ? src : {};
							}

							target[name] = tool.extend(deep, clone, copy);

						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			return target;
		};
	})();


	//类型判断
	(function(){
		tool.isArray = function (param) {
			return type(param) === '[object Array]';
		};

		tool.isObject = function (param) {
			return type(param) === '[object Object]';
		};

		tool.isFunction = function (param) {
			return type(param) === '[object Function]';
		};

		tool.isString = function (param) {
			return type(param) === '[object String]';
		};

		tool.isBoolean = function (param) {
			return type(param) === '[object Boolean]';
		};

		tool.isNumber = function (param) {
			return type(param) === '[object Number]';
		};

		tool.isWindow = function(param) {
			return param != null && param === param.window;
		};

		tool.isPlainObject = function(param) {
			return tool.isObject(param) && !tool.isWindow(param) && Object.getPrototypeOf(param) === Object.prototype;
		};

		function type (param) {
			return param == null ? String(param) : Object.prototype.toString.call(param)||'object';
		};
	})();


	//对象相关
	(function(){
		/**
		 * [获取对象长度]
		 * @param  Object  obj  [操作对象]
		 * @return Number 		[长度值]
		 * @author OJesusO
		 */
		tool.getObjLength = function (obj) {
			if (typeof(obj) == 'object' && obj != null) {
				return Object.keys(obj).length;
			} else {
				return 0;
			}
		};
	})();


	//数组相关
	(function(){
		/**
		 * [转为数组格式]
		 * @param  Mixed data [原始数据]
		 * @return Array      [操作后数据]
		 */
		tool.toArray = function(data){
			if (tool.isArray(data)) {
				return data;
			} else if (tool.isObject(data)) {
				var tmp = [];
				for(var i in data) {
					tmp.push(data[i]);
				}
				return tmp;
			} else {
				return [];
			}
		};

		/**
		 * [检查数组中是否存在某个值]
		 * @param  Mixed  val   [需要查找的值]
		 * @param  Array  arr   [被查找的数组]
		 * @return Boolean		[如果找到则返回 TRUE,  否则返回 FALSE]
		 * @author OJesusO
		 */
		tool.inArray = function (val, arr) {
			var mark = tool.array_search(val, arr);
			if (mark === false) {
				return false;
			} else {
				return true;
			}
		};

		/**
		 * [在数组中搜索给定的值，如果成功则返回相应的键名]
		 * @param  Mixed  val   [需要查找的值]
		 * @param  Array  arr   [被查找的数组]
		 * @return Boolean		[如果找到则返回 key,  否则返回 FALSE]
		 * @author OJesusO
		 */
		tool.array_search = function (val, arr) {
			var mark = false;
			arr = tool.toArray(arr);
			for(var i in arr) {
				if (arr[i] == val) {
					mark = i;
					break;
				}
			}
			return mark;
		};

		/**
		 * [复制数组]
		 * @param  Array  arr   [需要复制的数组]
		 * @return Boolean  	[如果找到则返回 key,  否则返回 FALSE]
		 * @author OJesusO
		 */
		tool.array_copy = function (arr) {
			if (navigator.userAgent.indexOf('Chrome') > -1 || navigator.userAgent.indexOf('Safari') > -1) {
			    return arr.concat();
			} else {
				return arr.slice();
			}
		};

		/**
		 * [获取数组键]
		 * @param  Array  arr   [需要获取的数组]
		 * @return Array 	  	[数组键]
		 * @author OJesusO
		 */
		tool.array_keys = function(arr){
			return Object.keys(arr);
		};

		/**
		 * [连接数组]
		 * @param  String sp  [连接字符串]
		 * @param  Array  arr [连接前的数组]
		 * @return String     [连接后的字符串]
		 * @author OJesusO
		 */
		tool.implode = function(sp, arr){
			arr = tool.toArray(arr);
			if (tool.isArray(arr)) {
				return arr.join(sp);
			} else {
				return '';
			}
		};

		/**
		 * [分割字符串]
		 * @param  String sp  [分隔符]
		 * @param  String str [分割前的字符串]
		 * @return Array      [分割后的数组]
		 * @author OJesusO
		 */
		tool.explode = function(sp, str){
			return str.split(sp);
		};
	})();


	//json相关
	(function(){
		/**
		 * [json字符串化]
		 * @param  Mixed  param  [要被操作的数据]
		 * @return String        [操作后的数据]
		 * @author OJesusO
		 */
		tool.jsonStrify = function (param) {
			return JSON.stringify(param);
		};

		/**
		 * [json格式字符串转换]
		 * @param  String jsonStr [要被操作的数据]
		 * @return Mixed          [操作后的数据]
		 * @author OJesusO
		 */
		tool.jsonParse = function (jsonStr) {
			try {
				return JSON.parse(jsonStr);
			} catch(e) {
				return false;
			}
		};
	})();


	//跳转操作
	(function(){
		/**
		 * [替换url 并跳转]
		 * @param  String  baseUrl  [基础URL含有‘_MARK_’，例如：/Home/Goods/need_details/id/_MARK_.html]
		 * @param  String  mark     [要替换元素的值]
		 * @author OJesusO
		 */
		tool.replaceHref = function (baseUrl, mark, open) {
			open = open||0;
			var nowURL = replaceMark(baseUrl, mark);
			openOrHref(open, nowURL);
		};

		/**
		 * [替换url 并跳转，多处需要替换]
		 * @param  String  baseUrl  [基础URL，例如：/Home/Ucenter/resumedesc/id/_id_/type/_type_.html]
		 * @param  String  mark     [要替换元素的值，例如：{'_id_':1, '_type_':2}]
		 * @author OJesusO
		 */
		tool.replaceHrefs = function (baseUrl, mark, open) {
			open = open||0;
			var nowURL = baseUrl;
			for (var i in mark) {
				nowURL = replaceMark(nowURL, mark[i], i);
			}
			openOrHref(open, nowURL);
		};

		function replaceMark (String1, String2, _MARK_) {
			return String1.replace(_MARK_||'_MARK_', String2);
		};
		function openOrHref (open, url) {
			if (open) {
				window.open(url);
			} else {
				window.location.href = url;
			}
		};
	})();


	//消息提示
	(function(){
		/**
		 * [成功消息显示]
		 * @param  String   info  [消息详情]
		 * @author OJesusO
		 */
		tool.successMsg = function (info, fun, noface) {
			var isNoface = fun === true ? true : null,
			isFun = tool.isFunction(fun) ? fun : function(){};
			showMsg(1, info||'操作成功！', isFun, noface ? true : isNoface);
			return true;
		};

		/**
		 * [失败消息显示]
		 * @param  String   info  [消息详情]
		 * @author OJesusO
		 */
		tool.errorMsg = function (info, fun, noface) {
			var isNoface = fun === true ? false : null,
			isFun = tool.isFunction(fun) ? fun : function(){};
			showMsg(2, info||'操作失败！', isFun, noface ? false : isNoface);
			return false;
		};

		/**
		 * [确认提示框]
		 * @param  String   info [提示信息]
		 * @param  Function fun1 [确认操作后执行函数]
		 * @param  Function fun2 [取消操作后执行函数]
		 * @param  Object   conf [配置信息]
		 * @author OJesusO
		 */
		tool.myConfirm = function (info, fun1, fun2, conf) {
			conf = conf||{};
			conf.icon = conf.icon||3;
			conf.title = conf.title||'提示';

			if (typeof(layer) == 'undefined') {
				if (confirm(info)) {
					if (typeof(fun1) == 'function') fun1();
				} else {
					if (typeof(fun2) == 'function') fun2();
				}
			} else {
				layer.confirm(info, conf, function(index){
					if (typeof(fun1) == 'function') fun1(); layer.close(index);
				}, function(index){
					if (typeof(fun2) == 'function') fun2();
				});
			}
		};

		/**
		 * [等待显示]
		 * @param   Mixed   config [object:配置信息，false|waitMark:关闭等待，true:需要手动关闭]
		 * @example TOOL.wait();		//默认开启 - 默认5秒后自动关闭
		 * @example TOOL.wait(true);	//守护开启 - 需用执行手动关闭
		 * @example TOOL.wait(false);	//关闭等待
		 * @example TOOL.wait(I waitMark);	//关闭等待 - 需传递waitMark值
		 * @example TOOL.wait(O config);	//配置信息
		 * @author OJesusO
		 */
		tool.wait = function (config) {
			var type = 0, time = 5000;
			if (config === false || config === waitMark) {
				layer.close(waitMark);
				waitMark = false;
				return;
			} else if (config === true) {
				time = 0;
			} else if (tool.isPlainObject(config)) {
				type = typeof(config.type) == 'undefined' ? type : config.type;
				time = typeof(config.time) == 'undefined' ? time : config.time;
			}
			waitMark = layer.load(type, {time:time});
			return waitMark;
		};
		var waitMark = false;

		function showMsg(state, info, fun, noface) {
			if (typeof(layer) == 'undefined') {
				alert(info);
				fun();
			} else {
				if (noface === true) {
					layer.msg(info||'　', {}, fun);
				} else if (noface === false) {
					layer.msg(info||'　', fun);
				} else {
					layer.msg(info||'　', {'icon':state, 'time':1500}, fun);
				}
			}
		};

		W.successMsg = tool.successMsg;
		W.errorMsg = tool.errorMsg;
		W.myConfirm = tool.myConfirm;
	})();


	//时间戳操作
	(function(){
		/**
		 * [获取时间戳]
		 * @param  String dateStr [日期字符串，为空返回当前时间戳]
		 * @return Number         [时间戳]
		 * @author OJesusO
		 */
		tool.getUnixTime = function(dateStr){
			if (!dateStr) {
				var date = new Date().getTime();
			} else {
	    	    var date =  new Date(dateStr.replace(/-/g,'/')).getTime(); 
			}
    	    return (date.toString().substr(0, 10)) * 1;
		};

		/**
		 * [格式化时间戳]
		 * @param  Number time   [时间戳，为空则操作当前的时间戳]
		 * @param  Mixed  format [格式（object:返回对象形式，不为空的string:返回指定格式的形式，其它:返回默认形式）]
		 * @return Mixed         [根据格式返回]
		 * @author OJesusO
		 */
		tool.getDate = function(time, format){
			time = time ? time*1000 : new Date().getTime();
    		var d = new Date(time), date = {
	    		y: d.getFullYear(),
	    		m: autoZero(d.getMonth() + 1),
	    		d: autoZero(d.getDate()),
	    		h: autoZero(d.getHours()),
	    		i: autoZero(d.getMinutes()),
	    		s: autoZero(d.getSeconds()),
    		};
    		return formatDate(date, format);
		};

		function autoZero (str) {
			return str < 10 ? '0' + str : str;
		};
		function formatDate (date, format) {
			if (tool.isObject(format)) {
				return date;
			} else if (tool.isString(format) && format) {
				for(var i in date) format = format.replace(i, date[i]);
				return format;
			} else {
				return date.y+'-'+date.m+'-'+date.d+' '+date.h+':'+date.i+':'+date.s;
			}
		}
	})();


	//ajax相关
	(function(defaultCB){
		/**
		 * [ajax请求操作]
		 * @param  String   url      [请求url]
		 * @param  Object   postData [发送数据]
		 * @param  Mixed 	callback [回调函数对象，如果该参数类型为函数，将作为success回调]
		 * @param  Object   conf     [配置]
		 * @author OJesusO
		 * conf {
		 *     data: 返回数据类型，默认json
		 *     type: 请求类型，默认post
		 *     timeout: 超时，默认10000
		 *     errorTofail: fail回调与error回调一致（submitType 不为2 时有效）
		 *     submitType: 2:手动处理回调（success/error），其它:自动处理回调（success/error/fail，判断返回数据状态）
		 * }
		 * callback {
		 *     success: 成功后的回调，submitType为2时 请求成功后执行该回调，submitType为其它时 请求成功后并数据状态大于0 执行该回调
		 *     error: 错误后的回调，submitType为2时 请求失败后执行该回调，submitType为其它时 请求成功但数据状态不大于0 执行该回调（配置启用errorTofail，请求失败后也会执行该回调）
		 *     fail: 失败后的回调，submitType不为2时 请求失败后执行（配置启用errorTofail，fail = error）
		 *     before: 请求前置操作，返回false将中断请求
		 *     after: 请求后置操作，请求完成后执行该回调
		 * }
		 */
		tool.ajax = function (url, postData, callback, conf) {
			if (!url || !tool.isString(url)) {
				return console.error('Tool-ajax: url error!');
			}

			var Url = url,
			Conf = conf||{},
			Callback = analysis(callback, Conf.errorTofail||false),
			PostData = tool.isObject(postData)||tool.isArray(postData) ? postData : {};

			if (Callback.before() === false) {
				return false;
			}
			$.ajax(Url, {
				data 	 : PostData,
				dataType : Conf.data||'json',
				type 	 : Conf.type||'post',
				timeout  : Conf.timeout||10000,
				success  : function (data) {
					Callback.after(true, data);
					if (Conf.submitType == 2) {
						Callback.success(data);
					} else {
						if (tool.isObject(data) && data.status > 0) {
							Callback.success(data);
						} else{
							Callback.error(data);
						}
					}
				},
				error   : function (xhr,type,errorThrown) {
					Callback.after(false, xhr);
					if (Conf.submitType == 2) {
						Callback.error(xhr,type,errorThrown);
					} else {
						Callback.fail(xhr,type,errorThrown);
					}
				},
			});
		};

		/**
		 * [简单ajax操作]
		 * @param  String   url       [请求url]
		 * @param  Object   postData  [发送数据]
		 * @param  Mixed  	successCB [请求成功后回调|配置]
		 * @param  Mixed  	errorCB   [请求错误后回调|配置]
		 * @param  Mixed  	beforeCB  [请求前置操作|配置]
		 * @param  Mixed  	afterCB   [请求后置操作|配置]
		 * @param  Object 	conf      [配置，优先级最高（即前面的回调参数存入配置将不会有效），默认开启errorTofail]
		 * @author OJesusO
		 */
		tool.simpleAjax = function (url, postData, successCB, errorCB, beforeCB, afterCB, conf){
			var Conf = getConfig(conf||false, [successCB, errorCB, beforeCB, afterCB]);
			tool.ajax(url, postData, {success:function(data){
				if (tool.isFunction(successCB)) {
					successCB(data);
				} else if (successCB == 'debug') {
					console.log(data);
				} else if (successCB == 'test') {
					console.log(tool.jsonStrify(data));
				}
			}, error:function(data){
				data = data||{};
				if (tool.isFunction(errorCB)) {
					errorCB(data);
				} else if (errorCB == 'auto') {
					mui.toast(data.info||'网络繁忙！请稍后重试！');
				} else if (errorCB == 'debug') {
					console.log(data);
				} else if (errorCB == 'test') {
					console.log(data.responseText||tool.jsonStrify(data));
				}
			}, before:beforeCB, after:afterCB}, Conf);
		};

		tool.waitAjax = function (postId, url, postData, successCB, errorCB, beforeCB, afterCB, conf) {
			if (!postId) {
				return console.error('PostId error.');
			}
			var Conf = getConfig(conf||false, [successCB, errorCB, beforeCB, afterCB]);
			if (waitAjaxMark.postId === true) {
				var wait = Conf.wait||{};
				waitAjaxMark.postId = false;
                tool.errorMsg(wait.errTitle||'请勿重复提交！', function(){
                    if (waitAjaxMark.postId) {
                    	tool.wait(wait);
                    }
                }, wait.errFace ? fase : true);
                waitAjaxMark.postId = true;
                return ;
			}
			tool.wait();
			waitAjaxMark.postId = true;
			TOOL.simpleAjax(url, postData, successCB, errorCB, beforeCB, function(){
				waitAjaxMark.postId = false;
                TOOL.wait(false);
                if (tool.isFunction(afterCB)) {
                	afterCB();
                }
			}, Conf);
		};
		var waitAjaxMark = {};

		function analysis (callback, error) {
			var isfun = tool.isFunction;
			return {
				fail	: error ? (isfun(callback.error) ? callback.error : defaultCB) : (isfun(callback.fail) ? callback.fail : defaultCB),
				success : isfun(callback) ? callback : (isfun(callback.success) ? callback.success : defaultCB),
				error 	: isfun(callback.error) ? callback.error : defaultCB,
				before 	: isfun(callback.before) ? callback.before : defaultCB,
				after 	: isfun(callback.after) ? callback.after : defaultCB,
			};
		};
		function getConfig (config, callback) {
			if (tool.isObject(config)) {
				return config;
			}
			for (var i in callback) {
				if (tool.isObject(callback[i])) {
					if (typeof(callback[i].errorTofail) == 'undefined') {
						callback[i].errorTofail = 1;
					}
					return callback[i];
				}
			}
			return {errorTofail: 1};
		};
	})(function(){});


	// - tool init - 
	(function(){
		/**
		 * 拓展插件写法
		 * W.toolReady||(W.toolReady = []);
		 * W.toolReady.push(function(){
		 *     TOOL.xxxx = xxxx;
		 * });
		 */
		tool.Ready = function (fun) {
			if (tool.isFunction(fun)) {
				fun();
			}
		};
		if (tool.isArray && tool.getObjLength(W.toolReady) > 0) {
			tool.each(W.toolReady, function() {
				tool.Ready(this);
			});
		}
		W.toolReady = {
			push: tool.Ready
		};
	})();
})(window, TOOL);
