!function(t,e){e.extend(!0,t.Slider,{options:{autoPlay:!0,interval:4e3}}),t.Slider.register("autoplay",{_init:function(){var t=this;t.on("slideend ready",t.resume).on("destory",t.stop),t.getEl().on("touchstart"+t.eventNs,e.proxy(t.stop,t)).on("touchend"+t.eventNs,e.proxy(t.resume,t))},resume:function(){var t=this,e=t._options;return e.autoPlay&&!t._timer&&(t._timer=setTimeout(function(){t.slideTo(t.index+1),t._timer=null},e.interval)),t},stop:function(){var t=this;return t._timer&&(clearTimeout(t._timer),t._timer=null),t}})}(gmu,gmu.$);