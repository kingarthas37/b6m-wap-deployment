!function(t){t.extend(gmu.Suggestion.options,{isHistory:!0,usePlus:!1,listCount:5,renderlist:null}),gmu.Suggestion.option("renderlist",function(){return"function"!==t.type(this._options.renderlist)},function(){var n=this,e=t("<div></div>"),i=function(t){return e.text(t).html()},o=function(e,o){var s,u,r,l=n._options,g=[],a="";if(!o||!o.length)return n.hide(),g;for(o=o.slice(0,l.listCount),e=i(e||""),r=0,u=o.length;u>r;r++)a=i(s=o[r]),e&&(a=t.trim(s).replace(e,"<span>"+e+"</span>")),l.usePlus&&(a+='<div class="ui-suggestion-plus" data-item="'+s+'"></div>'),g.push("<li>"+a+"</li>");return g};n.on("ready",function(){var n=this,e=n.eventNs,i=t(n._options.form||n.getEl().closest("form"));i.size()&&(n.$form=i.on("submit"+e,function(t){var e=gmu.Event("submit");n._options.isHistory&&n._localStorage(n.value()),n.trigger(e),e.isDefaultPrevented()&&t.preventDefault()})),n.$content.on("touchstart"+e,function(t){t.preventDefault()}),n.$content.on("tap"+e,function(e){var i=n.getEl(),o=t(e.target);o.hasClass("ui-suggestion-plus")?i.val(o.attr("data-item")):t.contains(n.$content.get(0),o.get(0))&&setTimeout(function(){i.val(o.text()),n.trigger("select",o).hide().$form.submit()},400)}).highlight("ui-suggestion-highlight"),n.on("destroy",function(){i.size()&&i.off(e),n.$content.off()})}),n.on("renderlist",function(t,n,e,i){var s=o(e,n);return i(s.length?"<ul>"+s.join(" ")+"</ul>":"")})})}(gmu.$);