$.fn.countTime=function(options){
    // 设置默认属性

    var settings = {
            "startTime":0,
            "endTime":this.attr('data-end') || 0,
            "nowTime":0,
            "interval":1000,
            "minDigit":true,
            "showDay":true,
            "timeUnitCls":{
                "day":'m-d',
                "hour":'m-h',
                "min":'m-m',
                "sec":'m-s'
            },
            "startTips":'',
            "endTips":'',
            "stopTips":'',
            "timeStamp":true,
            "stampSet":
            {   "model":"normal",
                "set":{"day":'天',
                    "hour":'时',
                    "min":'分',
                    "sec":'秒'
                }
            }
        },
        opts = $.extend({}, settings, options);

    return this.each(function () {
        var $timer = null,
            $this = $(this),
            $block = $('<span></span>'),
            nowTime,
        // 匹配时间
            startTime = isNaN(opts.startTime) ? (Date.parse(opts.startTime.replace(/-/g, '/')) / 1000) : Math.round(opts.startTime),
            endTime = isNaN(opts.endTime) ? (Date.parse(opts.endTime.replace(/-/g, '/')) / 1000) : Math.round(opts.endTime);

        // 判断当前时间
        nowTime = opts.nowTime === 0 ? Math.round(new Date().getTime() / 1000) : Math.round(opts.nowTime);

        // 补零方法
        function addZero(isAdd, time) {
            if (!isAdd) return time;
            else return time < 10 ? time = '0' + time : time;
        }
        // 天、时、分、秒
        var timeStamp = {"day":'', "hour":'', "min":'', "sec":''};
        if (opts.timeStamp) timeStamp =opts.stampSet.set;// {"day":'天', "hour":'时', "min":'分', "sec":'秒'};

        (function remainTime() {
            var time = {},
                seconds,
                word = '';
            // 获取需要计时的毫秒数
            seconds = nowTime < startTime ? startTime - nowTime : endTime - nowTime;
            $this.html('');

            // 是否显示天数
            if (opts.showDay) {
                time.day = addZero(opts.minDigit, Math.floor(seconds / 3600 / 24));
                time.hour = addZero(opts.minDigit, Math.floor(seconds / 3600 % 24));
            } else {
                time.hour = addZero(opts.minDigit, Math.floor(seconds / 3600));
            }
            time.min = addZero(opts.minDigit, Math.floor(seconds / 60 % 60));
            time.sec = addZero(opts.minDigit, Math.floor(seconds % 60));

            // 活动开始倒计时
            if (nowTime < startTime) {
                if (opts.startTips) word = opts.startTips;
            } else {
                // 活动结束倒计时
                if (endTime > nowTime) {
                    if (opts.endTips) word = opts.endTips;
                }// 倒计时停止
                else {
                    if (opts.stopTips) {
                        word = opts.stopTips;
                        $this.html(word);
                    } else {
                        for (var i in time) {
                            if (i == 'day' && !opts.showDay) continue;
                            time[i] = 0;  // 时间置0
                            if(opts.timeStamp){
                                switch(opts.stampSet.model){
                                    case "after":
                                        var _stamp=$(timeStamp[i]);
                                        $block.clone().addClass(opts.timeUnitCls[i]).text(time[i]).appendTo($this);
                                        _stamp.appendTo($this);
                                        //$block.clone().addClass(opts.timeUnitCls[i]).text(time[i] + timeStamp[i]).appendTo($this);
                                        break;
                                    case "normal":
                                        $block.clone().addClass(opts.timeUnitCls[i]).text(time[i] + timeStamp[i]).appendTo($this);
                                        break;
                                }
                            }

                        }
                    }
                    clearTimeout($timer);
                    return false;
                }
            }
            // 写入
            $this.html(word);
            for (var i in time) {
                if (i == 'day' && !opts.showDay) continue;
                if(opts.timeStamp){
                    switch(opts.stampSet.model){
                        case "after":
                            var _stamp=$(timeStamp[i]);
                            $block.clone().addClass(opts.timeUnitCls[i]).text(time[i]).appendTo($this);
                            _stamp.appendTo($this);
                            //$block.clone().addClass(opts.timeUnitCls[i]).text(time[i] + timeStamp[i]).appendTo($this);
                            break;
                        case "normal":
                            $block.clone().addClass(opts.timeUnitCls[i]).text(time[i] + timeStamp[i]).appendTo($this);
                            break;
                    }
                }
            }

            // 累加时间
            nowTime = nowTime + opts.interval / 1000;
            // 循环调用
            $timer = setTimeout(function () {
                remainTime();
            }, opts.interval);
        })();
    });
}
// JavaScript Document
window.wapIndexFed = window.wapIndexFed || {};
//排序列表
wapIndexFed.getDataList = function(url, data){
    var html = '';
    $.getJSON(url+'?jsonpCallback=?',data, function(res){
        if (res.ok) {
            $('.sale-loading').hide();
            var items = res.data,
                len = items.length;
            for (var i=0; i<len; i++) {
                html += '<li><a class="sale-list-pic pic-top" href="'+items[i].url+'"><img src="'+items[i].index_image_url+'"></a><a class="sale-list-font" href="'+items[i].url+'">'+items[i].title+'</a><p class="sale-list-price cf"><span class="list-price-red">&yen;'+items[i].price+'</span><span class="list-price-gray">&yen;'+items[i].original_price+'</span></p><p class="sale-list-time"><span><em></em>剩余时间：<i class="time-left" start="'+parseInt((new Date()).getTime()/1000)+'" end="'+items[i].expire_time+'" time=""></i></span></p></li>';
            }
            $('#dataList').append(html).show();
            $("[time]").each(function(){
                var _this = $(this),
                    _start = _this.attr("start"),
                    _end=_this.attr("end");
                if (_start > _end) {
                    _this.html('--');
                } else {
                    _this.countTime({
                        startTime:_start,
                        endTime:_end

                    });
                }

            });
        } else {
            $('.sale-loading').hide();
        }
    });
};
wapIndexFed.sortList = function(){
    var getUrl= 'http://m.b5m.com/listing/100',
        root = this;
    //默认加载
    this.getDataList(getUrl,{order:'default',page:1});
    //滚屏
    var timer;
    $(window).on('scroll', function(){
        if ($(window).height()+$(window).scrollTop() == $(document).height()) {
            $('.sale-loading').show();
            var page = Math.ceil($('#dataList li').length / 10) + 1;
            clearTimeout(timer);
            timer = setTimeout(function(){
                root.getDataList(getUrl,{order:'default',page:page});
            }, 1000);
        } else {
            $('.sale-loading').hide();
        }
    });
};
//购物车页面
wapIndexFed.indexInit = function() {
	
	//tab绑定事件
	this.init.wapTab();
	
};
//载入方法
wapIndexFed.init = (function(){
	return {
		/***************************tab绑定事件***********************/
		wapTab: function(){
			//单选事件绑定事件
			$("section").on("touchend",".theme-list",function(){
				if($(this).hasClass("curre")){
					$(this).removeClass("curre");
					$(this).next(".theme-child").removeClass("now");
				}else{
					$(this).addClass("curre").siblings(".theme-list").removeClass("curre");
					$(this).next(".theme-child").addClass("now").siblings(".theme-child").removeClass("now");
				}
				return false;
			});

		}
	};
})();

