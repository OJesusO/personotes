/**
 * Created by OJesusO on 2018/01/29.
 * @description 登录页面主功能
 * @author OJesusO
 * @last 2018/01/29
 */
layui.define(['layer'], function(exports){
    var layer = layui.layer,
    initData = layui.data('init').initData;
               layui.data('init', null);
               //console.log(initData);

    $(function () {
        //ajax设置
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!(/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type)) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", initData.csrftoken);
                }
            }
        });

        //动画特效
        $('#login #password').focus(function () {
            $('#owl-login').addClass('password');
        }).blur(function () {
            $('#owl-login').removeClass('password');
        });
    });

    //数据提交
    $(function(){
        var successJumpURL = initData.successJumpURL,
        Shade = $('#progress-shade');

        $('#loginform').submit(function(){
            $.ajax(initData.loginURL, {
                type: 'POST',
                data: {
                    username: $('input[name="username"]').val(),
                    password: $('input[name="password"]').val(),
                },
                success: function(data, textStatus, xhr){
                    data = data || {};
                    switch (xhr.status) {
                        case 200:
                            TOOL.successMsg('登录成功！您好，' + (data.uname || '???'), function(){
                                window.location.href = data.jump ? data.jump : successJumpURL;
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
    });

    exports('user-login', {});
});
