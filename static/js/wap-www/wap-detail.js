$(function(){
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
});
///////////////////////////////////////////////////
var WapDetail=window.WapDetail||{}
  WapDetail.detail=function(){
      //hightchart
      $("#container").highcharts({
          chart: {
              width:320,
              height:210,
              type: 'spline',
              style: {
                  overflow: "visible"
              }
          },
          colors: ["#E97D01", "#D24A7D", "#64AD10", "#0C7F1A", "#1C98C5", "#4F90B5", "#EECFA1", "#EE82EE", "#DB7093", "#BFEFFF"],
          title: {
              text: '',
              align: "left",
              style: {
                  color: "#3E576F",
                  fontSize: "14px"
              }
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              type: "datetime",
              dateTimeLabelFormats: {
                  day: "%m-%d",
                  week: "%m-%d",
                  month: "%m-%d"
              },
              categories: ['Jan', 'Feb', 'Mar',"aa","aav","ccc",'Jan', 'Feb', 'Mar',"aa","aav","ccc",'Jan', 'Feb', 'Mar',"aa","aav","ccc",'Jan', 'Feb', 'Mar',"aa","aav","ccc"],
              alternateGridColor: "#eeeeee",
              minorGridLineColor: "#dfdfdf",
              minorTickInterval: "auto"
          },
          yAxis: {
              title: {
                  text: ''
              },
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: "#808080"
              }],
              gridLineColor: "#c0d0e0",
              minorGridLineColor: "#dfdfdf",
              minorTickInterval: "auto"

          },
          tooltip: {
              xDateFormat: "%Y-%m-%d",
              valuePrefix : '￥',
              crosshairs: [{
                  color: "#ff1919",
                  width: 1
              }, {
                  color: "#ff1919",
                  width: 1
              }],
              backgroundColor: "#ffffff",
              borderColor: "#E97D01",
              shared: true,
              style: {
                  color: "#333333",
                  fontSize: "12px",
                  padding: "8px"
              }
          },
          plotOptions: {
              spline: {
                  lineWidth: 2,
                  states: {
                      hover: {
                          lineWidth: 2
                      }
                  },
                  marker: {
                      enabled:false
                  }
              }
          },
          legend: {
              enabled:false,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
              borderWidth: 0,
              margin: 10
          },
          credits:{
              enabled: false,
              href: "http://www.b5m.com",
              position: {
                  align: "right",
                  x: -10,
                  verticalAlign: "bottom",
                  y: -15
              },
              text: "www.b5m.com"
          },
          series: [{
              name:" ",

              data: [4.0, 6.9, 6.5,6.0,8.0,7.1,4.0, 6.9, 6.5,6.0,8.0,7.1,4.0, 6.9, 6.5,6.0,8.0,7.1,4.0, 6.9, 6.5,6.0,8.0,7.1]

          }]
      });




      //hightchart end
     // $("#slider").slider({loop:true});
      $("#footer").css("margin-bottom","75px");
     var animate=function(){}
     //使用return this 表示可以链式操作
     animate.prototype.showPopup=function(){
         //$(".wc-detail-attr").fadeIn(400);
         //alert($("header").outerHeight());
         //alert($(window).height());
         var window_h=$(window).height()-$("header").outerHeight()-74;
         var attr_h=$(".wc-detail-attr").outerHeight();
         if(attr_h>window_h){
             $(".wc-detail-attr").height(window_h);
         }
         $(".wc-detail-attr").fadeIn(400)
         return this;
     }
     animate.prototype.hidePopup=function(){
         $(".wc-detail-attr").fadeOut(400);
         return this;
     }
      animate.prototype.expiredShow=function(){
          $(".detail-nofound").fadeIn(100);
          return this;
      }
      animate.prototype.expiredHide=function(){
          $(".detail-nofound").fadeOut(50);
          return this;
      }
      animate.prototype.isSelAll=function(ele,c){
          //my.isSelAll(".wc-detail-attr dl.stuff-sels","dd[class='current']")
           var all=$(ele).length;
          var curr=$(ele).find(c).length;
          if(curr!=all){
              //未选择参数
              return 0;
          }
          else if(all==0&&curr==0){
              //无sku参数
              return 2;
          }
          else{
              //已选择sku
              return 1;
          }
      }
      animate.prototype.showminipop=function(txt){
             if($(".temp-cover").length>0){
                 $(".temp-cover").text(txt);
                 $(".temp-cover").show(100);
                 setTimeout(function(){
                     $(".temp-cover").hide(60);
                 },2000);
             }
          else{
                 var div=$("<div class=\"temp-cover\"></div> ");
                 div.text(txt);
                 $("body").append(div);
               //var w= parseInt(($(window).width()-div.width())/2);
              // var h=  parseInt(($(window).height()-div.height())/2);
                 div.show(100);
                 //alert(w)
                 div.css({"top":"284px","left":"80px"});
                 setTimeout(function(){
                     $(".temp-cover").hide(60);
                 },2000);
             }
          return this;
      }
      //点击选择商品参数

     animate.prototype.selAttr=function(sbd){

        var price=$(".stuff-price");
         var priceID=$("#priceId");
         var price_arr=[];
         var next=sbd.parent().next(".stuff-sels");
         var mt= $(".wc-detail-attr").find(".stuff-wrap");
        // var t=parseInt(mt.css("margin-top"));
        // var _top=next.length>0?(next.position().top-92):sbd.parent(".stuff-sels").last().position().top;


       // var top= $(".wc-detail-attr").scrollTop();

         //alert(mt.length);
         //$(mt[0]).css("margin-top",(t-top).toString()+"px");
        // $(mt[0]).css("margin-top",t-_top);
         //t=-top;
         //寻找数组最大
        function sort (arr) {
            arr.sort(function(a,b){return a<b?1:-1});
             return arr[0];
         }
         var stuff=$(".stuff-sels");
         var all_param="";
        // alert(stuff.length);
         sbd.addClass("current");
         sbd.siblings("dd").removeClass("current");
         var dt=sbd.siblings("dt");
         //var dl=sbd.parent("dl").attr("parameter");
         var patter=dt.text()+":"+sbd.text();
         sbd.parent("dl").attr("parameter",patter);
         $.each(SKU,function(k,v){
             price_arr.push(v);
         });

         //alert(sort(price_arr));
         $(".stuff-sels").each(function(){
             var _thisarr=$(this).attr("parameter")==""?"":$(this).attr("parameter")+";";
             all_param=all_param+_thisarr;
         });
          all_param=all_param.substr(0,all_param.length-1);
           // alert(all_param);
         $("[selattr]").html(all_param+"<span class=\"icon\"></span>");
          if(SKU[all_param]!=undefined){
             //alert(SKU[all_param]);

              priceID.text(SKU[all_param]);
              price.text("￥"+SKU[all_param]);
          }
          else{

              priceID.text(sort(price_arr));
              price.text("￥"+sort(price_arr));
          }
         return this;
     }
     animate.prototype.coverShow=function(){
         $(".gray-cover").height(document.documentElement.scrollHeight);
         $(".gray-cover").width($(window).width());
         $(".gray-cover").fadeIn(200);

         return this;
     }
     animate.prototype.coverHide=function(){
         $(".gray-cover").fadeOut(200);

         return this;
     }
      animate.prototype.loading=function(){
          //wc-loading
          if($(".wc-loading").length>0){
             // $(".wc-loading").text(txt);
              $(".wc-loading").fadeIn(100);

          }
          else{
              var div=$("<div class=\"wc-loading\"></div> ");

              $("body").append(div);
              //var w= parseInt(($(window).width()-div.width())/2);
              // var h=  parseInt(($(window).height()-div.height())/2);
              div.fadeIn(100);
              //alert(w)
              div.css({"top":"280px","left":"142px"});

          }
          return this;
      }
      animate.prototype.loadingHide=function(){
          $(".wc-loading").fadeOut(50);
          return this;
      }
     var my=new animate();

     //事件注册器
     $("[selattr]").on("click",function(){
         //my.coverShow().showPopup();
         var _this=$(this);
         //alert();
         //alert(_this.attr("exp"));
         if(_this.attr("exp")==undefined){
             my.coverShow().showPopup();
         }
         else{
             //console.log(_this.attr("[exp]"));
             my.coverShow().expiredShow();
         }
         //
     });
      $(".detail-nofound").on("click",".close",function(){
          my.expiredHide().coverHide();
      });
      //关闭属性选择框
     $(".wc-detail-attr").find(".close").on("click",function(){
         my.hidePopup().coverHide();
         /*
         if(my.isSelAll(".wc-detail-attr dl.stuff-sels","dd[class='current']")==true){
             my.hidePopup().coverHide();
         }
         else{
             my.showminipop("请选择完整的商品类别");
         }
         */
     });
     $(".stuff-sels").find("dd").on("click",function(){
       my.selAttr($(this));
     });
       //tab切换
      $(".tabs").find("li").click(function(){
          var idx=$(this).index();
          var controls=$(".detail-liner").children();
          $(this).addClass("cur");
          $(this).siblings().removeClass("cur");
          $(controls.eq(idx)).fadeIn(200);
          $(controls.eq(idx)).siblings().fadeOut(100);
      });
      //增加购买数字
     $(".wc-detail-attr").on("click","[add]",function(){
         var num=$(this).siblings("input[type='text']");
         var pattern=/[1-9]{1,}[0-9]{0,}/;
         var val=num.val();
         if(val==""){
             num.val(1);
         }
         if(pattern.test(val)==false){
              //alert("请输入数字");
             num.val(1);
         }
         else{
             num.val(parseInt(num.val())+1);
         }
     });
      //减少购买数字
     $(".wc-detail-attr").on("click","[sub]",function(){

         var num=$(this).siblings("input[type='text']");
         var pattern=/[1-9]{1,}[0-9]{0,}/;
         var val=num.val();
         if(val==""){
             num.val(1);
         }
         if(pattern.test(val)==false){
             //alert("请输入数字");
             num.val(1);
         }
         else{
             if(parseInt(num.val())>1){
                 num.val(parseInt(num.val())-1);
             }

         }
     });
      //点击打开更多详情页面
      $("[openurl]").on("click",function(){
          //alert("open");
          var _this=$(this);

          var _url=$(this).attr("openurl");
          if(_this.attr("open")==false){

                  $.ajax({
                      beforeSend:function(xhr,setting){
                          my.loading();
                      },
                      type:"get",
                      dataType:"json",
                      url:_url,
                      async:false,
                      success:function(data){
                          _this.find("img").remove();
                          my.loadingHide();
                         /// _this.attr("open","1");
                          if(data&&data.code==0){
                              if(data.result.length>0){
                                  for(var i=0;i<data.result.length;i++){
                                      if(data.result[i]!=""){
                                          var img=$("<img src=\""+data.result[i]+"\" />");

                                          _this.append(img);
                                      }

                                  }

                              }
                              else{
                                  my.loadingHide();
                                  my.showminipop("没有更多了..");
                              }
                             // alert(_this.html());


                          }

                       }
                  });


          }

      });

      //代购
      $("[buyOnSb]").on("click",function(){
          var par='';
          var $this=$(this);
          var href=$("[addToCart]").attr("href");
          var num=$(".wc-detail-attr").find("input[type='text']");
          var priceID=$("#priceId");
          $(".wc-detail-attr").find(".stuff-sels").each(function(){
              var _par=$(this).attr("parameter");
              par=par+_par+";";
          });
          var _data={}
          if(my.isSelAll(".wc-detail-attr dl.stuff-sels","dd[class='current']")==1){
              //未加入购物车，加入购物车，并跳转
              //my.expiredShow();显示已过期
              if($(this).attr("iscart")==undefined){
                  my.loading();

                  _data.priceAvg=priceID.text();
                  _data.goodsSpec=decodeURIComponent(par);
                  _data.count=num.val();
                  $.getJSON(

                      href+"&jsonCallback=?",
                      _data,
                      function(data){
                          if(data){
                              if(data.code==1||data.code==106){
                                  my.loadingHide();
                                  my.showminipop("添加成功！");
                                  //$("[buyOnSb]").attr("iscart","");
                                  setTimeout(function(){
                                      window.location.href=$this.attr("href");
                                  },2000);

                              }
                              else{
                                  my.loadingHide();
                                  my.showminipop(data.msg);
                              }
                          }

                      }
                  );
              }
              //已加入购物车,跳转页面
              else{
                  return true;
              }
          }
          else if(my.isSelAll(".wc-detail-attr dl.stuff-sels","dd[class='current']")==2){
              _data.priceAvg=priceID.text();
              _data.goodsSpec="";
              _data.count=num.val();
              if($(this).attr("iscart")==undefined){
              $.getJSON(

                  href+"&jsonCallback=?",
                  _data,
                  function(data){
                      if(data){
                          if(data.code==1||data.code==106){
                              my.loadingHide();
                              my.showminipop("添加成功！");
                              //$("[buyOnSb]").attr("iscart","");
                              setTimeout(function(){
                                  window.location.href=$this.attr("href");
                              },2000);

                          }
                          else{
                              my.loadingHide();
                              my.showminipop(data.msg);
                          }
                      }

                  }
              );
              }
              else{
                  return true;
              }
          }
          else{
              my.coverShow().showPopup();
          }
          return false;
      });
      //点击更多
      $("#moreComment").on("click",function(){

         $("[said]").show(200);
      });
      //加入购物车
      $("[addToCart]").on("click",function(){
          var par='';
          var href=$(this).attr("href");
          var num=$(".wc-detail-attr").find("input[type='text']");
          var priceID=$("#priceId");
          $(".wc-detail-attr").find(".stuff-sels").each(function(){
                var _par=$(this).attr("parameter");
                par=par+_par+";";
          });
          par=par.substr(0,par.length-1);
         // console.log(href+"&jsonCallback=?");
          var _data={}
          if(my.isSelAll(".wc-detail-attr dl.stuff-sels","dd[class='current']")==1){
              my.loading();

                  _data.priceAvg=priceID.text();
                  _data.goodsSpec=decodeURIComponent(par);
                  _data.count=num.val();
                    //console.log(_data);
                   /// alert(href+"&jsonCallback=mycallback");

                     $.getJSON(

                          href+"&jsonCallback=?",
                          _data,
                          function(data){
                             //alert(data);
                              if(data){
                                  if(data.code==1||data.code==106){
                                      my.loadingHide();
                                      my.showminipop("添加成功");
                                      $("[buyOnSb]").attr("iscart","");
                                  }
                                  else{
                                      my.loadingHide();
                                      my.showminipop(data.msg);
                                  }
                              }

                          }
                      );

            }
          else if(my.isSelAll(".wc-detail-attr dl.stuff-sels","dd[class='current']")==2){
              _data.priceAvg=priceID.text();
              _data.goodsSpec="";
              _data.count=num.val();

              $.getJSON(
                  href+"&jsonCallback=?",
                   _data,
                   function(data){
                          // alert(data.msg);
                           if(data){
                                   if(data.code==1||data.code==106){
                                           my.loadingHide();
                                           my.showminipop("添加成功");
                                           $("[buyOnSb]").attr("iscart","");
                                   }
                                   else{
                                       my.loadingHide();
                                       my.showminipop(data.msg);
                                   }
                           }

                   }
               );

          }
          else{
              my.coverShow().showPopup();
          }
          return false;
      });
 }
WapDetail.special=function(){
    //alert(typeof $.fn.countTime);
    $("[time]").each(function(){
        var _this = $(this),
            _start = _this.attr("start"),
            _end=_this.attr("end");
        _this.countTime({
            startTime:_start,
            endTime:_end,
            stampSet:
            {  model:"after",
                set:{"day":'<dfn>天</dfn>',
                    "hour":'<dfn>时</dfn>',
                    "min":'<dfn>分</dfn>',
                    "sec":'<dfn>秒</dfn>'
                }
            }

        });
    });
}
WapDetail.index=function(){
    $("#slider").slider({
        loop:true,
        dots :true
    });
   $(".sel-m-r a,.sel-m-l a,.index-market a").mouseenter(function(){
     $(this).addClass("sel-hover");
   });
    $(".sel-m-r a,.sel-m-l a,.index-market a").mouseleave(function(){
        $(this).removeClass("sel-hover");
    });
}