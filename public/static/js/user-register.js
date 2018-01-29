/**
 * Created by OJesusO on 2018/01/29.
 * @description 注册页面主功能
 * @author OJesusO
 * @last 2018/01/29
 */
layui.define(['layer'], function(exports){
    var layer = layui.layer,
    initData = layui.data('init').initData;
               layui.data('init', null);
               //console.log(initData);

    if (initData.isLogin) {
        TOOL.myConfirm('已有登录账号是否继续注册？', function(){
            window.location.href = initData.uhomeURL;
        }, null, {btn:['否，去用户中心', '是，继续注册']});
    }

    //密码状态切换
    (function(){
        var Pwd = $('input[name="password"]'),
        changeStateBtn = $('#changePwdStatus');
        changeStateBtn.click(function(){
            var obj = $(this).find('span');
            if (obj.hasClass('glyphicon-eye-open')) {
                Pwd.attr('type', 'text');
                obj.removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close')
            } else {
                Pwd.attr('type', 'password');
                obj.removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open')
            }
        });
    })();

    //验证功能操作
    function Validate () {
        this.elementObj = {};
        this.ischecked = false;
        this.value = function () {
            return this.elementObj.val().trim();
        };
        this.toggleState = function (state) {
            var obj = this.elementObj.parent();
            if (state) {
                obj.removeClass('has-error').addClass('has-success');
            } else {
                obj.removeClass('has-success').addClass('has-error');
                this.elementObj.focus();
            }
        };
    };

    //用户名验证操作
    var UsernameValidate = new (function(){
        Validate.call(this);
        this.elementObj = $('input[name="username"]');
        this.checkValue = function () {
            this.ischecked = null;
            var username = this.value();
            if (!username) {
                this.ischecked = false;
                this.toggleState(0);
                return TOOL.errorMsg('用户名格式错误！');
            }
            var _obj = this;
            $.ajax(initData.checkuser, {
                type: 'POST',
                data: {username:username, type:'username'},
                success: function(data, textStatus, xhr){
                    switch (xhr.status) {
                        case 204:
                            _obj.ischecked = true;
                            _obj.toggleState(1);
                            break;
                        case 200:
                            _obj.ischecked = false;
                            _obj.toggleState(0);
                            TOOL.errorMsg('该用户名已注册！');
                            break;
                        default:
                            _obj.ischecked = false;
                            _obj.toggleState(0);
                            TOOL.errorMsg(data.info||'验证用户名失败！');
                    }
                },
                error: function(){console.log(1)
                    TOOL.errorMsg('服务器无法响应！请稍后重试！');
                },
            });
        };
        this.elementObj.change(this.checkValue.bind(this));
    });

    //密码验证操作
    var PasswordValidate = new (function(){
        Validate.call(this);
        this.elementObj = $('input[name="password"]');
        this.checkValue = function () {
            this.ischecked = null;
            var password = this.value();
            if (!password) {
                this.ischecked = false;
                this.toggleState(0);
                return TOOL.errorMsg('请输入密码！');
            } else {
                this.ischecked = true;
                this.toggleState(1);
            }
        };
        this.elementObj.change(this.checkValue.bind(this));
    });

    //提交表单处理
    $('#signupForm').submit(function(){
        if (UsernameValidate.ischecked === false) {
            UsernameValidate.toggleState(0);
            return TOOL.errorMsg('请输入正确的用户名！');
        } else if (UsernameValidate.ischecked === null) {
            layer.msg('验证用户名中…');
            return false;
        } else if (PasswordValidate.ischecked === false) {
            PasswordValidate.toggleState(0);
            return TOOL.errorMsg('请输入密码！');
        }

        var url = $(this).attr('action')||'#';
        $.ajax(url, {
            type: 'POST',
            data: $(this).serializeArray(),
            success: function(data, textStatus, xhr){
                data = data || {};
                switch (xhr.status) {
                    case 200:
                        TOOL.successMsg('注册成功！', function(){
                            if (data.jump) {
                                window.location.href = data.jump;
                            }
                        });
                        break;
                    default:
                        TOOL.errorMsg(data.info||'请求失败！请稍后重试！');
                }
            },
            error: function(){
                TOOL.errorMsg('服务器无法响应！请稍后重试！');
            },
        });

        return false;
    });

    exports('user-register', {});
});
