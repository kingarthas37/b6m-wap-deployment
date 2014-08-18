(function($){
	"use strict";
	window.WapFilter = window.WapFilter || {
		init: function(){
			var $sf = $('.sf-c');
			$sf.on('click', '.op', function(){
				var $op = $(this);
				if($op.hasClass('selected')){
					$op.removeClass('selected');
					$op.next().hide();
				}else{
					$sf.find('.op').removeClass('selected');
					$sf.find(' .sub').hide();
					$op.addClass('selected');
					$op.next().show();
				}
				if($op.hasClass('price')){
					var sp = $('#sprice').val();
					var ep = $('#eprice').val();
					if(sp && ep && !isNaN(sp) && !isNaN(ep) && Number(sp)<=Number(ep)){
						$op.find('.s-c span').html(sp+'-'+ep);
						$op.addClass('choosed');
					}else{
						$op.find('.s-c span').html('');
						$op.removeClass('choosed');
					}
				}
			});
			$sf.on('click', '.sub li', function(){
				var $ch = $(this);
				if($ch.hasClass('price')) return;
				var $p = $ch.closest('.sub').hide().prev().toggleClass('selected');
				$ch.toggleClass('selected');
				if($ch.hasClass('selected')){
					$ch.siblings().removeClass('selected');
					$p.addClass('choosed').find('.s-c span').html($ch.html());
					window.chooseOptionCallback($ch.attr('data'), $ch.html(), this);
				}else{
					$p.removeClass('choosed').find('.s-span').html('');
				}
			});
			$('#clear-filter').on('click', function(){
				$sf.find('.sub li').removeClass('selected');;
				$sf.find('.op').removeClass('choosed');
				$sf.find('.s-c span').html('');
				$('#sprice, #eprice').val('');
				window.clearFilterCallback();
			});
		}
	};
})(Zepto);
