!function(t){function s(s){return this.each(function(o){var f=t(this),i=t.isFunction(s)?s.call(this,o,f.offset()):s,p=f.css("position"),a="absolute"===p||"fixed"===p||f.position();"relative"===p&&(a.top-=parseFloat(f.css("top"))||-1*parseFloat(f.css("bottom"))||0,a.left-=parseFloat(f.css("left"))||-1*parseFloat(f.css("right"))||0),parentOffset=f.offsetParent().offset(),props={top:e(i.top-(a.top||0)-parentOffset.top),left:e(i.left-(a.left||0)-parentOffset.left)},"static"==p&&(props.position="relative"),i.using?i.using.call(this,props,o):f.css(props)})}var o=t.fn.offset,e=Math.round;t.fn.offset=function(t){return t?s.call(this,t):o.call(this)}}(Zepto);