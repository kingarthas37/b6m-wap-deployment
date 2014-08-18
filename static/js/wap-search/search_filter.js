(function($){
	"use strict";
	window.WapSearchFilter = window.WapSearchFilter || {
		init:function(){
			var $filters = $('.t-sort-ctn .btn a');
			var $cents = $('.s-items .s-item');
			$filters.on('click', function(e){
				var $btn = $(this);
				$cents.hide();
				if($btn.hasClass('cur')){
					$btn.removeClass('cur').find('.arrow').html('▼');
				}else{
					if($btn.hasClass('a-sort')){
						$cents.filter('.c-sort').show();
					}else if($btn.hasClass('a-filter')){
						$cents.filter('.c-filter').show();
					}
					$filters.removeClass('cur').find('.arrow').html('▼');
					$btn.addClass('cur').find('.arrow').html('▲');
				}
				e.preventDefault();
				return false;
			});
			$('.s-items .c-sort').on('click', 'li', function(e){
				var $cent = $(this.parentNode);
				$cent.hide().find('.r-icon.sel').removeClass('sel');
				$('.r-icon', this).addClass('sel');
				if($cent.hasClass('c-sort')){
					var $tit = $filters.filter('.a-sort');
					$tit.removeClass('cur').find('.s-name').html($('.s-name', this).html());
					$tit.find('.arrow').html('▼');
					if($(this).attr("datasort")=="PriceAsc"){
						$("#sortField").val("Price");
						$("#sortType").val("asc");
					}else if($(this).attr("datasort")=="PriceDesc"){
						$("#sortField").val("Price");
						$("#sortType").val("desc");
					}else if($(this).attr("datasort")=="SalesAmountAsc"){
						$("#sortField").val("SalesAmount");
						$("#sortType").val("asc");
					}else if($(this).attr("datasort")=="SalesAmountDesc"){
						$("#sortField").val("SalesAmount");
						$("#sortType").val("desc");
					}else{
						$("#sortField").val("");
						$("#sortType").val("desc");
					}
					$("#sForm").submit();
				}else if($cent.hasClass('c-filter')){
					$filters.filter('.a-filter').removeClass('cur').find('.arrow').html('▼');
				}
			});
			$('.s-items .c-filter').on('click', '.item', function(){
				var $btn = $(this);
				$btn.toggleClass('cur');
				$btn.find('.r-arrow').html($btn.hasClass('cur') ? '∨' : '&gt;');
				var $sub = $(this).next();
				if($sub.hasClass('sub')){
					if($btn.hasClass('cur')){
						$sub.show().find('.s-item').show();
					}else{
						$sub.hide();
					}
				}
			});
			$('.s-items .c-filter').on('click', '.sub .sub-item', function(){
				var $sel = $(this);
				var $pm = $sel.closest('.sub').hide().prev();
				if( $sel.hasClass('cur') ){
					$sel.closest('.sub').find('.sub-item').removeClass('cur');
					$pm.find('.selected').html('');
					$pm.removeClass('cur seled');
					if($(this).attr("dataattr")!=null){
						var setv = $(this).attr("dataattr");
						var varr = setv.split("=====");
						$("#item"+varr[0]).val('');						
					}
				}else{
					$sel.closest('.sub').find('.sub-item').removeClass('cur');
					$sel.addClass('cur');
					$pm.removeClass('cur').addClass('seled').find('.selected').html($sel.find('.s-name').html());
					if($(this).attr("datafilter")!=null){
						$("#categoryValue").val($(this).attr("datafilter"));
						$("#sForm").submit();
					}else if($(this).attr("dataattr")!=null){
						var setv = $(this).attr("dataattr");
						var varr = setv.split("=====");
						$("#item"+varr[0]).val(varr[1]);
					}
					
				}
				$pm.find('.r-arrow').html('&gt;');
			});
		}
	}
})(Zepto); 
