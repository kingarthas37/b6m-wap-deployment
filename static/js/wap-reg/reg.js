(function(window, $){

    var wapReg = window.wapReg = {};

    wapReg.regInit = function(){
        $('.dark-btn').on('touchstart', function(){
            $(this).addClass('dark-btn-touch');
        });
        $('.dark-btn').on('touchend', function(){
            $(this).removeClass('dark-btn-touch');
        });
        $('.light-btn').on('touchstart', function(){
            $(this).addClass('light-btn-touch');
        });
        $('.light-btn').on('touchend', function(){
            $(this).removeClass('light-btn-touch');
        });
    };

    wapReg.regFun = function(){
        var root = this;
        root.regInit();
        var refererUrl = $('#referer').val(),
            sendRedirectUrl = $('#sendRedirect').val();
        //root.inputHandler();
        //协议
        $('#toProtocol').click(function(e){
            e.preventDefault();
            window.location.href = B5M_UC.rootPath+'/protocol.html';
        });
        var registerForm = $('#register-form');
        //阻止表单提交
        registerForm.submit(function(){
            return false;
        });
        //定义表单验证
        jQuery.validator.addMethod('isAccount',function(value, element){
            if (root.isMobile(value)) {
                if (root.isMobileUse(value)) {
                    return true;
                } else {
                    this.settings.messages.mobile.isAccount = '手机号已经被占用，请更换手机号';
                    return false;
                }
            }
            this.settings.messages.mobile.isAccount = '请输入正确的手机号';
            return false;
        }, jQuery.validator.format('{0}'));
        jQuery.validator.addMethod('codeLength', function(value, element){
            if (root.codeLength(value))
                return true;
            return false;
        }, '验证码为6位数字');
        jQuery.validator.addMethod('isPasswordOk',function(value, element){
            return /^[a-zA-Z_0-9]{6,15}$/.test(value);
        }, '请输入正确格式的字母，数字');
        registerForm.validate({
            rules:{
                mobile:{
                    required:true,
                    isAccount:true
                },
                code:{
                    required:true,
                    codeLength:true
                },
                password:{
                    required:true,
                    rangelength:[6,15],
                    isPasswordOk:true
                }
            },
            messages:{
                mobile:{
                    required:'手机号不能为空'
                },
                code:{
                    required:'验证码不能为空'
                },
                password:{
                    required:'密码不能为空',
                    rangelength:'密码长度需{0}至{1}位'
                }
            },
            errorElement: "span",
            errorClass:'reg-error',
            errorPlacement:function(error, element){
                if($.trim(error.html()).length <= 0)
                    return;
                $('#server').hide().empty();
                $(element).parents('.field').find('.reg-error-box').empty().show().html(error.html());
            },
            success:function(label, element){
                $(element).parents('.field').find('.reg-error-box').hide().empty()
            },
            onkeyup:false
        });
        //获取验证码
        $('#getCode').click(function(){
            if ($.trim($('#mobile').val()).length < 1)
                return false;
            if (registerForm.valid())
                root.getCode();
        });
        //注册
        $('#registerBtn').click(function(){
            if (registerForm.valid()) {
                if(!$('#protocol').prop("checked")){
                    b5mwap.ui.msgDialog({
                        content   : '<div class="dialog-reg">请接受服务条款</div>', /*  内容  */
                        isOpen    : true,
                        btn       : {
                            '确定': function(){
                                $('#protocol').prop('checked',true);
                                this.close();
                            },
                            '取消': function(){
                                this.close();
                            }
                        }/*  默认按钮  */
                    });
                    return false;
                }
                root.loadingBox('open');
                $.getJSON(B5M_UC.rootPath+'/regist.html?jsonpCallback=?', registerForm.serializeArray(), function(data){
                    if (data.ok) {
                        var res = data.data,
                            semicolon = res.indexOf(';'),
                            threeHours = new Date(new Date().getTime()+1000*60*60*3);
                        if (semicolon > 0) {
                            var tokenTemp = res.substring(0, semicolon),
                                shownameTemp = encodeURIComponent(res.substring(semicolon+1));
                            Cookies.set('token', tokenTemp, threeHours, '/', '.b5m.com');
                            Cookies.set('showname', shownameTemp, threeHours, '/', '.b5m.com');
                        } else {
                            Cookies.set('token', data.data, threeHours, '/', '.b5m.com');
                        }
                        Cookies.set('login', true, threeHours, '/', '.b5m.com');

                        if (sendRedirectUrl.length) {
                            window.location.href = sendRedirectUrl;
                        } else if (refererUrl.length) {
                            window.location.href = refererUrl;
                        } else {
                            window.location.href = B5M_UC.rootPath+'/user/usercenter.html';
                        }
                    } else {
                        root.loadingBox('close');
                        $('#server').empty().show().html(data.data);
                    }
                });
            }
        });
	};

    wapReg.loginFun = function(){
        var root = this;
        root.regInit();
        root.getCode();
        var refererUrl = $('#referer').val(),
            sendRedirectUrl = $('#sendRedirect').val();
        //root.inputHandler();
        //忘记密码
        $('#toForget').click(function(e){
            e.preventDefault();
            window.location.href = B5M_UC.rootPath+'/findpassword.html';
        });
        //注册
        $('#regLink').click(function(e){
            e.preventDefault();
            window.location.href = B5M_UC.rootPath+'/toRegist.html';
        });

        var loginForm = $('#login-form');
        //阻止表单提交
        loginForm.submit(function(){
            return false;
        });
        //定义表单验证
        jQuery.validator.addMethod('isAccount',function(value, element){
            if(root.isMobile(value) || root.isEmail(value)) {
                return true;
            } else {
                this.settings.messages.userName.isAccount = '请输入正确的邮箱/手机';
                return false;
            }
        }, jQuery.validator.format('{0}'));

        loginForm.validate({
            rules:{
                userName:{
                    required:true,
                    isAccount:true
                },
                password:{
                    required:true,
                    rangelength:[6,15]
                }
            },
            messages:{
                userName:{
                    required: '邮箱/手机不能为空'
                },
                password:{
                    required:'密码不能为空',
                    rangelength:'密码长度需{0}至{1}位'
                }
            },
            errorElement: "span",
            errorClass:'error',
            errorPlacement:function(error, element){
                if($.trim(error.html()).length <= 0)
                    return;
                $('#server').hide().empty();
                var pa = $(element).parents('.field');
                pa.find('.reg-error-box').empty().show().html(error.html());
                if (pa.hasClass('field-login'))
                    setTimeout(function(){
                        pa.find('.reg-error-box').hide().empty();
                    }, 1500);
            },
            success:function(label, element){
                $(element).parents('.field').find('.reg-error-box').hide().empty()
            },
            onkeyup:false
        });
        //登录
        $('#loginBtn').click(function(){
            if (loginForm.valid()) {
                root.loadingBox('open');
                $.getJSON(B5M_UC.rootPath+'/login.html?jsonpCallback=?', loginForm.serializeArray(), function(data){
                    if (data.ok) {
                        var res = data.data,
                            semicolon = res.indexOf(';'),
                            threeHours = new Date(new Date().getTime()+1000*60*60*3);
                        if (semicolon > 0) {
                            var tokenTemp = res.substring(0, semicolon),
                                shownameTemp = encodeURIComponent(res.substring(semicolon+1));
                            Cookies.set('token', tokenTemp, threeHours, '/', '.b5m.com');
                            Cookies.set('showname', shownameTemp, threeHours, '/', '.b5m.com');
                        } else {
                            Cookies.set('token', data.data, threeHours, '/', '.b5m.com');
                        }
                        Cookies.set('login', true, threeHours, '/', '.b5m.com');

                        if (sendRedirectUrl.length) {
                            window.location.href = sendRedirectUrl;
                        } else if (refererUrl.length && refererUrl.indexOf('findpassword.html') < 0) {
                            window.location.href = refererUrl;
                        } else {
                            window.location.href = B5M_UC.rootPath+'/user/usercenter.html';
                        }
                    } else {
                        root.loadingBox('close');
                        $('#server').empty().show().html(data.data);
                    }
                });
            }
        });
    };

    wapReg.findFun = function(){
        var root = this;
        root.regInit();
        //root.inputHandler();
        var findForm = $('#find-form');
        //阻止表单提交
        findForm.submit(function(){
            return false;
        });
        //定义表单验证
        jQuery.validator.addMethod('isAccount',function(value, element){
            if (root.isMobile(value))
                return true;
            this.settings.messages.mobile.isAccount = '请输入正确的手机号';
            return false;
        }, jQuery.validator.format('{0}'));
        jQuery.validator.addMethod('codeLength', function(value, element){
            if (root.codeLength(value))
                return true;
            return false;
        }, '验证码为6位数字');
        jQuery.validator.addMethod('isPasswordOk',function(value, element){
            return /^[a-zA-Z_0-9]{6,15}$/.test(value);
        }, '请输入正确格式的字母，数字');
        findForm.validate({
            rules:{
                mobile:{
                    required:true,
                    isAccount:true
                },
                code:{
                    required:true,
                    codeLength:true
                },
                newPassword:{
                    required:true,
                    rangelength:[6,15],
                    isPasswordOk:true
                },
                confirmPassword:{
                    required:true,
                    rangelength:[6,15],
                    isPasswordOk:true,
                    equalTo:'#password'
                }
            },
            messages:{
                mobile:{
                    required:'手机号不能为空'
                },
                code:{
                    required:'验证码不能为空'
                },
                newPassword:{
                    required:'密码不能为空',
                    rangelength:'密码长度需{0}至{1}位'
                },
                confirmPassword:{
                    required:'密码不能为空',
                    rangelength:'密码长度需{0}至{1}位',
                    equalTo:'两次输入的密码不一致'
                }
            },
            errorElement: "span",
            errorClass:'reg-error',
            errorPlacement:function(error, element){
                if($.trim(error.html()).length <= 0)
                    return;
                $('#server').hide().empty();
                $(element).parents('.field').find('.reg-error-box').empty().show().html(error.html());
            },
            success:function(label, element){
                $(element).parents('.field').find('.reg-error-box').hide().empty()
            },
            onkeyup:false
        });
        //获取验证码
        $('#getCode').click(function(){
            if ($.trim($('#mobile').val()).length < 1)
                return false;
            if (findForm.valid())
                root.getCode();
        });
        //找回密码
        $('#findBtn').click(function(){
            if (findForm.valid()) {
                root.loadingBox('open');
                $.getJSON(B5M_UC.ucRootPath+'/user/info/findPwdByMobile3.do?jsonpCallback=?', findForm.serializeArray(), function(data){
                    if (data.ok) {
                        window.location.href = B5M_UC.rootPath+'/toLogin.html';
                    } else {
                        root.loadingBox('close');
                        $('#server').empty().show().html(data.data);
                    }
                });
            }
        });
    };

    wapReg.isMobile = function(value){
        return /^(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/.test(value);
    };
    wapReg.isEmail = function(value){
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]{2,})+$/.test(value);
    };
    wapReg.isMobileUse = function(value){
        var code = 0;
        $.ajax({
            type:'post',
            data:"mobile="+value,
            async:false,
            url:B5M_UC.rootPath+'/isMobileUse.html',
            success:function(r){
                code = eval(r).code;
            }
        });
        return code===1?true:false;
    };
    wapReg.codeLength = function(value){
        return /^[0-9]{6}$/.test(value);
    };
    wapReg.getCode = function(){
        var time = 60,
            codeUrl = '';
        var $this = $('#getCode');

        $this.prop('disabled', true);
        $('#code').removeClass('reg-disabled').prop('disabled', false).focus();
        $('.icon-reg-psw').removeClass('reg-disabled').prop('disabled',false);

        var timeTask = setInterval(function(){
            if(time <= 0){
                $this.val('重新获取验证码').prop('disabled',false);
                clearInterval(timeTask);
                return;
            }
            $this.val((--time)+"秒后重新获取");
        },1000);
        if ($this.hasClass('get-code-register')) {
            codeUrl = B5M_UC.ucRootPath+'/user/info/mobile/getCode4Registry.do';
        } else if ($this.hasClass('get-code-find')) {
            codeUrl = B5M_UC.ucRootPath+'/user/info/findPwdByMobile1.do';
        }
        $.ajax({
            type:'post',
            data:"mobile="+$("#mobile").val(),
            async: false,
            dataType: 'jsonp',
            jsonp:"jsonpCallback",
            url:codeUrl,
            success:function(data){
                if(data.ok==false){

                }
            }
        });
    };
    wapReg.inputHandler = function(){
        $('.reg-input').each(function(){
            var $this = $(this),
                regEmpty = $this.parent().find('.reg-empty');
            $this.on('keyup', function(){
                var val = $.trim($this.val());
                if (val.length) {
                    regEmpty.show();
                    regEmpty.click(function(e){
                        e.preventDefault();
                        $this.val('');
                        $(this).hide();
                    });
                } else {
                    regEmpty.hide();
                }
            });
        });
    };
    wapReg.loadingBox = function(src){
        if(!$("#ajaxLoadBox").length){
            var $ajaxLoad = '<div id="ajaxLoadBox" class="loadBox"><a href="javascript:void(0);"></a></div>';
            $("body").append($ajaxLoad);
        }
        if(src=="open"){
            $("#ajaxLoadBox").show();
        }
        if(src=="close"){
            $("#ajaxLoadBox").hide();
        }
    }
})(window, jQuery);