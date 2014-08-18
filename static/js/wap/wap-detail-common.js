window.b5mwap = window.b5mwap || {};	

function _namespace(ns_string) {
	var parts = ns_string.split('.'),
		parent = this,
		i;

	for(i=0;i<parts.length;i++) {
		if(typeof parent[parts[i]] === 'undefined') {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
}

b5mwap.namespace = function(s) {
	return _namespace.call(this,s);
}

b5mwap.ui = {};
b5mwap.info = {};
b5mwap.utils = {};

/* cookie */
window.Cookies = {
	set:function(name,value) {
		var argv = arguments;
		var argc = arguments.length;
		var expires = (argc > 2) ? argv[2] : null;
		var path = (argc > 3) ? argv[3] : '/';
		var domain = (argc > 4) ? argv[4] : null;
		var secure = (argc > 5) ? argv[5] : false;
		document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
	},
	get:function(name) {
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		var j = 0;
		while (i < clen) {
			j = i + alen;
			if (document.cookie.substring(i, j) == arg)
				return Cookies.getCookieVal(j);
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0)
				break;
		}
		return null;
	},
	clear:function(name) {
		if (Cookies.get(name)) {
			var expdate = new Date();
			expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
			Cookies.set(name, "", expdate);
		}
	},
	getCookieVal:function(offset) {
		var endstr = document.cookie.indexOf(";", offset);
		if (endstr == -1) {
			endstr = document.cookie.length;
		}
		return unescape(document.cookie.substring(offset, endstr));
	},
	//编码不同
	setEn:function(name,value) {
		var argv = arguments;
		var argc = arguments.length;
		var expires = (argc > 2) ? argv[2] : null;
		var path = (argc > 3) ? argv[3] : '/';
		var domain = (argc > 4) ? argv[4] : null;
		var secure = (argc > 5) ? argv[5] : false;
		document.cookie = name + "=" + encodeURI(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
	},
	getEn:function(name) {
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		var j = 0;
		while (i < clen) {
			j = i + alen;
			if (document.cookie.substring(i, j) == arg)
				return Cookies.getCookieValEn(j);
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0)
				break;
		}
		return null;
	},
	clearEn:function(name) {
		if (Cookies.get(name)) {
			var expdate = new Date();
			expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
			Cookies.set(name, "", expdate);
		}
	},
	getCookieValEn:function(offset) {
		var endstr = document.cookie.indexOf(";", offset);
		if (endstr == -1) {
			endstr = document.cookie.length;
		}
		return decodeURI(document.cookie.substring(offset, endstr));
	}
};

/************************* 消息框 start **************************/
/*
b5mwap.namespace('ui.msgDialog');
b5mwap.ui.msgDialog = function(data) {
	
	'use strict';
	
	var obj = {
		title     : "", //  标题
		content   : "", //  内容
		className : "wap-dialog-box", //  自定义CLASS
		isOpen    : false,//  是否打开
		isClose   : false,//  是否关闭
		btn       : {
			'确定': function(){
				this.close();
			}
		}//  默认按钮
	};
	$.extend(obj,data);	
	var $dialogBox = gmu.Dialog({
		autoOpen : false,
		closeBtn : false,
		buttons  : obj.btn,
		title    : obj.title,
		content  : obj.content
	});
	$dialogBox._options['_wrap'].addClass(obj.className);
	if(obj.isOpen && !obj.isClose){
		$dialogBox.open();
	}
	if(!obj.isOpen && obj.isClose){
		$dialogBox.close();
	}
};
*/
$(function() {
	/************************* wap 公共登录 **************************/
	b5mwap.namespace('ui.loginBox');
	b5mwap.ui.loginBox = (function(){
		
		'use strict';
		
		var _this = this,
			_html = "";
			
		var host = "http://ucenter.m.b5m.com";
			
		var isLogin = Cookies.get('login') === 'true' && Cookies.get('token');  //判断登录状态
		
		b5mwap.info.isLogin = isLogin; //给外部调用
		
		var userId = Cookies.get('token');
		
		var userName =  Cookies.get('showname');
		
		_html = '<footer id="footer">\r\n'
			  + '	<div class="f-qk-tl">\r\n'
			  + '		<div class="f-login">\r\n';
				if(isLogin){
					_html += '<a href="'+host+'/user/usercenter.html">'+decodeURIComponent(userName)+'</a><span>|</span><a href="'+host+'/logout.html">退出</a>\r\n';
				}else{
					_html += '<a href="'+host+'/toLogin.html">登录</a><span>|</span><a href="'+host+'/toRegist.html">注册</a>\r\n';
				}
		_html+= '		</div>\r\n'
			  + '		<div class="f-go-top"><a id="goTop" >回到顶部</a></div>\r\n'
			  + '	</div>\r\n'
			  + '	<div class="f-ch-cp">\r\n'
			  + '		<div class="item"><a href="http://www.b5m.com/m.html">电脑版</a>&nbsp;|&nbsp;<a href="http://m.b5m.com" class="cur">手机版</a></div>\r\n'
			  + '		<div class="item">Copyright 2012-2014 B5M.COM版权所有</div></div>\r\n'
			  + '</footer>';
	
		$("body").append(_html);
		
		//添加header右上角LOG链接
		$("header").find("a.gohome").attr('href','http://m.b5m.com/');
	})();
	
	//返回顶部，事件绑定
	$("body").on("click",'#goTop',function(){
		window.scrollTo(0, 1);
        return false;
	});

    //cookies uuid
    var cid = Cookies.get('cookieId');
    if(!cid){
        Cookies.set('cookieId',b5mwap.utils.guid(),new Date(new Date().getTime() +  1000*60*60*24*365),'/','.b5m.com');
    }

	/************************* wap 公共菜单 **************************/
	b5mwap.namespace('ui.topMenu');
	b5mwap.ui.topMenu = (function(){
		
		'use strict';
		
		var _this = this,
			_html = "";
			
		_html = ' <div class="r-menu">'
			+ '<i></i>'
			+ '<a href="http://cart.m.b5m.com/"><em class="icon-menu-cart"></em>购物车<em class="icon-red-dot" style="display:none"></em></a>'
			+ '<a href="http://m.b5m.com/"><em class="icon-menu-home"></em>首页</a>'
			+ '<a href="http://s.m.b5m.com/"><em class="icon-menu-search"></em>搜索</a>'
			+ '</div>';
		$("body").append(_html);
	})();
	//头部更多显示
	$(".h-right").on("click",'#topMenu',function(){
		var $menu = $(".r-menu"),
			isShow = $menu.css("display");
		if(isShow == "none"){
			$menu.show();
		}else{
			$menu.hide();
		}
	});
	//显示购物车内是否有物品
    /*
	$.getJSON({
		url     : 'http://cart.m.b5m.com/get_product_num?jsonpCallback=?',
		success : function(data){
			if(data.count && data.count > 0){
				$(".r-menu").find(".icon-red-dot").css("display","inline-block");
			}
		}
	});
	*/
	/************************* wap 底部浮动 **************************/
	b5mwap.namespace('ui.footBox');

	b5mwap.ui.footBox = (function(){
		
		'use strict';

        //用户中心，不需要加载
        if(location.host === 'cart.m.b5m.com' || location.host === 'ucenter.m.b5m.com'  || location.host === 'korea.b5m.com' ){
           return false;
        }
		var _html = "";
			
		_html = '<footer id="footbar">'
			+ '<em class="footbar-logo"></em>'
			+ '<p class="footbar-text">点一点，安装手机版</p>'
			+ '<a href="http://a.b5m.com/downloadapp/wap/" class="footbar-download">立刻下载</a>'
			+ '<span class="footbar-close"></span>'
			+ '</footer>';
	
		$("body").prepend(_html);
	})();
	//底部关闭绑定事件
	$("#footbar").on("click",'.footbar-close',function(e){
		$('#footbar').remove();
		e.stopPropagation();
		return false;
	});

});

function pageBack(){
	window.history.go(-1);
	event.stopPropagation();
	return false;
}


b5mwap.utils.guid = function() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};
