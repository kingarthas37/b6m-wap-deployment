// JavaScript Document

window.wapCartFed = window.wapCartFed || {};	
//购物车页面
wapCartFed.cartInit = function() {
	
	//防止touchstart多次被触发
	this.repeatTouch();
	//checkBox绑定事件
	this.init.checkBoxClick();
	//数量增加，减少绑定事件
	this.init.setNumber();
	//按钮绑定事件
	this.init.btnEvent();
	
};
//订单页面
wapCartFed.orderInit = function() {
	
	//防止touchstart多次被触
	wapCartFed.repeatTouch();
	//按钮绑定事件
	this.init.orderSubmit();
	
};
//防止touchstart多次被触发
wapCartFed.repeatTouch = function(){
	var last_click_time = new Date().getTime()
	document.addEventListener('touchstart', function (e) {
		var click_time = e['timeStamp'];
		if (click_time && (click_time - last_click_time) < 300) {
			e.stopImmediatePropagation();
			e.preventDefault();
			return false;
		}
		last_click_time = click_time;
	}, true);
};
//ajax载入等待
wapCartFed.ajaxLoad = function(src){
	if(!$("#ajaxLoadBox").length){
		var $ajaxLoad = '<div id="ajaxLoadBox" class="loadBox"><a></a></div>';
		$("body").append($ajaxLoad);
	}
	if(src=="open"){
		$("#ajaxLoadBox").show();
	}
	if(src=="close"){
		setTimeout(function(){
			$("#ajaxLoadBox").hide();
		}, 500)
	}
}
//计算全部商品总金额
wapCartFed.allTotalAmount = function(){
	var price = 0, //总金额
		freight = 0, //总运费
		id = "";
	$(".cart-items.checked").each(function(index, element) {
     	id = $(this).attr("id");
		price = price + parseFloat($("#price"+id).text()) * parseInt($("#quantity"+id).val()) ;
    });
	$("#price_total").text("￥"+(price).toFixed(2));
};
//载入方法
wapCartFed.init = (function(){
	return {
		/***************************表单提交事件***********************/
		orderSubmit : function(){
			var isClick = true;
			$(".orders-container").on("touchstart",".btn-red",function(){
				if(isClick){
					isClick = false;
					return true;
				}
			});
		},
		/***************************checkBox绑定事件***********************/
		checkBoxClick: function(){
			//单选事件绑定事件
			$(".cart-items").on("touchstart",".check-box",function(){
				console.log("check-box");
				var $items = $(this).parent(),
					isCheceked = $items.hasClass("checked");
				if(isCheceked){
					$items.removeClass("checked");
				}else{
					$items.addClass("checked");
				}
				var maxRow = $(".cart-items").length,
					ckRow =  $(".cart-items.checked").length;
				if(maxRow == ckRow){
					$(".cart-header").addClass("checked");
				}else{
					$(".cart-header").removeClass("checked");
				}
				//计算总金额
				wapCartFed.allTotalAmount();
			});
			//全选事件绑定事件
			$(".cart-header").on("touchstart",".check-all",function(){
				var $items = $(this).parent(),
					isCheceked = $items.hasClass("checked");
				if(isCheceked){
					$items.removeClass("checked");
					$(".cart-items").removeClass("checked")
				}else{
					$items.addClass("checked");
					$(".cart-items").addClass("checked");
				}
				//计算总金额
				wapCartFed.allTotalAmount();
			});
		},
		/**************************数量增加，减少绑定事件***********************/
		setNumber: function(){
			//减少数量
			$(".cart-items-quantity").on('touchstart','.btn-subtraction',function(){
				var id = $(this).data("id"),
					$input = $("#quantity"+id),
					value =	parseInt($input.val());
				if( value != 1 &&  value > 1){
					$input.val(value-1);
					//计算总金额
					wapCartFed.allTotalAmount();
				}
				
			});
			//增加数量
			$(".cart-items-quantity").on('touchstart','.btn-add',function(){
				var id = $(this).data("id"),
					$input = $("#quantity"+id),
					value =	parseInt($input.val());
				if(value < 999){
					$input.val(value+1);
					//计算总金额
					wapCartFed.allTotalAmount();
				}
			});
		},
		/***************************按钮绑定事件***********************/
		btnEvent: function(){
			//ajax提交事件
			var ajaxSubmit = function(json,id){
				wapCartFed.ajaxLoad("open");
				$.ajax({
					type: 'DELETE',
					url: '/delete_product.html',
					data: json,
					dataType: 'json',
					timeout: 1000,
					success: function(data){
						wapCartFed.ajaxLoad("close");
						if (data && data.code == 100){
							$("#"+id).remove();
							//计算总金额
							wapCartFed.allTotalAmount();
						}else if(data.code == 101){
							b5mwap.ui.msgDialog({
								content : "<p>"+data.msg+"</p>",
								isOpen  : true,
							});
						}
					},
					error: function(xhr, type){
						wapCartFed.ajaxLoad("close");
						b5mwap.ui.msgDialog({
							content : "<p>商品删除失败</p>",
							isOpen  : true,
						});
					}
				});
			}
			//提交绑定事件
			$(".cart-header").on("touchstart","#cartSubmit",function(){
				var checekedRows = $(".cart-items.checked").length;
				if(checekedRows){
					var json = {},id = "", uuid = "", quantity = "";
					$(".cart-items.checked").each(function(index,element){
						id = $(this).attr("id"),
						uuid = $("#checkbox"+id).val(),
						quantity = $("#quantity"+id).val();
						json[uuid] = quantity;
					});
					$("#json").val(JSON.stringify(json));
					$("#saveCart").submit();
				}else{
					b5mwap.ui.msgDialog({
						 content : "<p>亲，您还没选择商品！</p>",
						 isOpen  : true
					});
				}
			});
			//删除事件绑定
			$(".cart-items").on("touchstart",".cart-item-dele",function(){
				var id = $(this).parent("div").attr("id"),
					json = JSON.stringify({product_id_ext : id});
				b5mwap.ui.msgDialog({
					content : "<p>你确定要删除这件商品？</p>",
					isOpen  : true,
					btn     : {
						'确定': function(){
							//console.log(json);
							ajaxSubmit(json,id);
							this.close();
						},
						'取消': function(){
							this.close();
						}
					}
				});
				
			});
			
		}
	};
})();

