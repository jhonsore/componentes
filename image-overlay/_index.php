<?php
require_once 'Mobile_Detect.php';
$detect = new Mobile_Detect;
// Any mobile device (phones or tablets).
if ( $detect->isMobile() ) {
    $mobile = "mobile";
}
?>
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" >
<head>
<title>Image overlay</title>
<style type="text/css" media="all">
@import url(css/reset.css);
@import url(css/generic.css);
</style>
<style type="text/css" media="print">
@import url(css/print.css) print;
</style>
<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
<!-- fancybox -->
<script type="text/javascript" src="js/fancybox/source/jquery.fancybox.pack.min.js"></script>
<link rel="stylesheet" media="screen" type="text/css" href="js/fancybox/source/jquery.fancybox.css">
<!-- fim fancybox -->

<!-- photoswipe -->
<link href="js/PhotoSwipe-master/dist/photoswipe.css" type="text/css" rel="stylesheet" />
<link rel="stylesheet" href="js/PhotoSwipe-master/dist/default-skin/default-skin.css">
<script type="text/javascript" src="js/PhotoSwipe-master/dist/photoswipe.min.js"></script>
<script src="js/PhotoSwipe-master/dist/photoswipe-ui-default.min.js"></script>
<!--////////////////////-->
<script type="text/javascript">

$(function()
{	
	overlayImage ();
	//---------------------------------------
	//se for para celular ou tablet abre o photoswipe
	//se for desktop normal abre o fancybox
	function overlayImage ()
	{
		if($(".mobile").size()>0)
		{
			if($(".overlay-image").size()>0)
			{
				$(".overlay-image").click(function(e)
				{
					openPhotoSwipe ({ class:$(this).attr("href"), index:0});
					e.preventDefault();
				});
			}
	
			if($(".fancybox").size()>0)
			{
				$(".fancybox").click(function(e)
				{
					var _index = $(".fancybox").index($(this));
					openPhotoSwipe ({ class:$(this).attr("rel"), index:_index});
					e.preventDefault();
				});
			}
		}
		else
		{
			//abre uma galeria com vários itens
			$(".fancybox").fancybox({
				openEffect	: 'none',
				closeEffect	: 'none'
			});
	
			//abre uma galeria ao clicar em um único item
			if($(".overlay-image").size()>0)
			{
				$(".overlay-image").click(function(e)
				{
	
					var _selector = $(this).attr("href");
					var _arrayItens = $("."+_selector).toArray();
	
					$.fancybox.open(_arrayItens,{
							helpers : {
								title : {
									type : 'inside'
								}
							}
						}
					);
					e.preventDefault();
				});
			}
		}
	
	}
	
	function openPhotoSwipe (arg_)
	{
		//adiciona a estrutura do photoswipe
		if($(".pswp").size()>0)
		{
			$(".pswp").remove();
		}
	
		$("body").append(generatePhotoSwipe ());
	
		//cria o array com os itens a serem carregados
		var items = [];
		$("."+arg_.class).each(function(index,element)
		{
			items.push(
				{
					src: $(this).attr("href"),
					w: $(this).data("width"),
					h: $(this).data('height'),
					title: $(this).attr("title")
				}
			);
		});
	
		//---------------------------------------
		var pswpElement = document.querySelectorAll('.pswp')[0];
	
		// define options
		var options = {
			// history & focus options are disabled on CodePen
			history: false,
			focus: false,
			bgOpacity:.9,
			captionEl: true,
			fullscreenEl: false,
			zoomEl: false,
			shareEl: false,
			counterEl: false,
			arrowEl: true,
			preloaderEl: true,
			showAnimationDuration: 0,
			hideAnimationDuration: 0,
			closeOnScroll:false,
			index:arg_.index,
			errorMsg:"A imagem não pode ser carregada"
		};
	
		var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	
	}
	
	function generatePhotoSwipe ()
	{
		var _html="";
		_html = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">';
		_html += '<div class="pswp__bg"></div>';
		_html += '<div class="pswp__scroll-wrap">';
		_html += '<div class="pswp__container">';
		_html += '<div class="pswp__item"></div>';
		_html += '<div class="pswp__item"></div>';
		_html += '<div class="pswp__item"></div>';
		_html += '</div>';
		_html += '<div class="pswp__ui pswp__ui--hidden">';
		_html += '<div class="pswp__top-bar">';
		_html += '<div class="pswp__counter"></div>';
		_html += '<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>';
		_html += '<button class="pswp__button pswp__button--share" title="Share"></button>';
		_html += '<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>';
		_html += '<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>';
		_html += '<div class="pswp__preloader">';
		_html += '<div class="pswp__preloader__icn">';
		_html += '<div class="pswp__preloader__cut">';
		_html += '<div class="pswp__preloader__donut"></div>';
		_html += '</div>';
		_html += '</div>';
		_html += '</div>';
		_html += '</div>';
		_html += '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">';
		_html += '<div class="pswp__share-tooltip"></div>';
		_html += '</div>';
		_html += '<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">';
		_html += '</button>';
		_html += '<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">';
		_html += '</button>';
		_html += '<div class="pswp__caption">';
		_html += '<div class="pswp__caption__center"></div>';
		_html += '</div>';
		_html += '</div>';
		_html += '</div>';
		_html += '</div>';
		return _html;
	}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
		
});

</script>
<style type="text/css" media="screen">
.clear{clear:both !important; float:none !important; margin:0px !important; padding:0px !important; height:0px !important; width:0px !important}
.clearfix:after {content: "."; display: block; clear: both; visibility: hidden; line-height: 0; height: 0;}
.clearfix {display: inline-block;}
html[xmlns] .clearfix {display: block;}
* html .clearfix {height: 1%;}

img { display:block;}

.center{ width:980px; margin:0 auto; text-align:left; padding:30px 0;}

h1{ font-size:20px; text-align:center; margin-bottom:40px;}

.item{ width:20%; float:left;}
.item a{ display:block;}
.item span{ padding:10px; display:block;}
.item img{ width:100%;}

/*---------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------*/

</style>
</head>

<body>
	<div class="center">
    	<h1>Ao clicar em um item abre uma galeria com a lista de itens</h1>
    	<div>
            <!--<div class="item">
            	<span>
                    <a href="#">
                    	<img src="img/media/1fccfb522e0043419884136db7f669c3.jpg" />
                    </a>
                </span>
            </div>-->
            <div class="item">
                <div>
                    <a class="fancybox" rel="fancybox"  href="img/zoom/1fccfb522e0043419884136db7f669c3.jpg" data-width="970" data-height="647" title="Este é o título!!!">
                        <img src="img/media/1fccfb522e0043419884136db7f669c3.jpg" alt="" class="img-all-size"/>
                    </a>
                </div>
            </div>
            
            
            <div class="clear"></div>
        </div>
    </div>
</body>
</html>
