jQuery(document).ready(
	function()
	{
		resize();
		$(window).resize(resize);
		
		function resize () {
			if($(window).width() <= 992){
				$("#sticker").css({position:"static"});
				$("#sticker").css({width:"100%"});
			}else{
				$("#sticker").width($("#sticker").parent().width());
				$("#sticker").css({position:"fixed"});
			}
			
			if($(window).height() <= $("#sticker .content-sticker").height()){
				$("#sticker").height($(window).height()-70);
			}else{
				$("#sticker").css({height:"auto"});
			}
		}
		//--------------------------------------
		//abre menu
		if($(".wrapper-menu-ativo").size()>0){
			$(".wrapper-menu-ativo").slideDown(0);
		}
		
		//click menu
		$(".list-group .menu-open").click(function(){
			
			var _wrapper = $(this).parent().find(".wrapper-menu");
			
			if(!_wrapper.hasClass("wrapper-menu-ativo")){
				if($(".wrapper-menu-ativo").size()>0){
					$(".wrapper-menu-ativo").slideUp(300);
					var _wrapper_ativo = $(".wrapper-menu-ativo");
					_wrapper_ativo.removeClass("wrapper-menu-ativo");
				}
				
				_wrapper.addClass("wrapper-menu-ativo");
				_wrapper.slideDown(300);
			}
			return false;
		});
		//------------------------------------
		$(".dica .button").click(function(){
			if(!$(this).parent().hasClass("dica-open")){
				if($(".dica-open").size()>0){
					$(".dica-open .item").slideUp(200);
					$(".dica-open").removeClass("dica-open");
				}
				
				var _item = $(this).parent().find(".item");
				$(this).parent().addClass("dica-open");
				_item.slideDown(300);
			}
			return false;
		});
				
		//-------------------------------------
	}
)
