!function(t,i){var e=i.fx.cssPrefix,n=i.fx.transitionEnd,s=" translateZ(0)";t.define("Slider",{options:{loop:!1,speed:400,index:0,selector:{container:".ui-slider-group"}},template:{item:'<div class="ui-slider-item"><a href="<%= href %>"><img src="<%= pic %>" alt="" /></a><% if( title ) { %><p><%= title %></p><% } %></div>'},_create:function(){var t=this,e=t.getEl(),s=t._options;t.index=s.index,t._initDom(e,s),t._initWidth(e,t.index),t._container.on(n+t.eventNs,i.proxy(t._tansitionEnd,t)),i(window).on("ortchange"+t.eventNs,function(){t._initWidth(e,t.index)})},_initDom:function(t,e){var n,s,r=e.selector,h=e.viewNum||1;for(s=t.find(r.container),s.length||(s=i("<div></div>"),e.content?this._createItems(s,e.content):t.is("ul")?(this.$el=s.insertAfter(t),s=t,t=this.$el):s.append(t.children()),s.appendTo(t)),(n=s.children()).length<h+1&&(e.loop=!1);e.loop&&s.children().length<3*h;)s.append(n.clone());this.length=s.children().length,this._items=(this._container=s).addClass("ui-slider-group").children().addClass("ui-slider-item").toArray(),this.trigger("done.dom",t.addClass("ui-slider"),e)},_createItems:function(t,i){for(var e=0,n=i.length;n>e;e++)t.append(this.tpl2html("item",i[e]))},_initWidth:function(t,i,e){var n,s=this;(e||(n=t.width())!==s.width)&&(s.width=n,s._arrange(n,i),s.height=t.height(),s.trigger("width.change"))},_arrange:function(t,i){var e,n,s=this._items,r=0;for(this._slidePos=new Array(s.length),n=s.length;n>r;r++)e=s[r],e.style.cssText+="width:"+t+"px;left:"+r*-t+"px;",e.setAttribute("data-index",r),this._move(r,i>r?-t:r>i?t:0,0);this._container.css("width",t*n)},_move:function(t,i,e,n){var s=this._slidePos,r=this._items;s[t]!==i&&r[t]&&(this._translate(t,i,e),s[t]=i,n&&r[t].clientLeft)},_translate:function(t,i,n){var r=this._items[t],h=r&&r.style;return h?(h.cssText+=e+"transition-duration:"+n+"ms;"+e+"transform: translate("+i+"px, 0)"+s+";",void 0):!1},_circle:function(t,i){var e;return i=i||this._items,e=i.length,(t%e+e)%i.length},_tansitionEnd:function(t){~~t.target.getAttribute("data-index")===this.index&&this.trigger("slideend",this.index)},_slide:function(t,i,e,n,s,r){var h,o=this;return h=o._circle(t-e*i),r.loop||(e=Math.abs(t-h)/(t-h)),this._move(h,-e*n,0,!0),this._move(t,n*e,s),this._move(h,0,s),this.index=h,this.trigger("slide",h,t)},slideTo:function(t,i){if(this.index===t||this.index===this._circle(t))return this;var e=this._options,n=this.index,s=Math.abs(n-t),r=s/(n-t),h=this.width;return i=i||e.speed,this._slide(n,s,r,h,i,e)},prev:function(){return(this._options.loop||this.index>0)&&this.slideTo(this.index-1),this},next:function(){return(this._options.loop||this.index+1<this.length)&&this.slideTo(this.index+1),this},getIndex:function(){return this.index},destroy:function(){return this._container.off(this.eventNs),i(window).off("ortchange"+this.eventNs),this.$super("destroy")}})}(gmu,gmu.$);