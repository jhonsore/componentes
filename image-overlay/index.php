<?php
require_once 'Mobile_Detect.php';
$detect = new Mobile_Detect;
// Any mobile device (phones or tablets).
if ( $detect->isMobile() ) {
    $mobile = "mobile";
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//PT"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
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
			if($(".single-galery-image").size()>0)
			{
				$(".single-galery-image").click(function(e)
				{
					openPhotoSwipe ({ class:$(this).attr("rel"), index:0});
					e.preventDefault();
				});
			}
	
			if($(".list-galery-image").size()>0)
			{
				$(".list-galery-image").click(function(e)
				{
					var _index = $(".list-galery-image").index($(this));
					openPhotoSwipe ({ class:$(this).attr("rel"), index:_index});
					e.preventDefault();
				});
			}
		}
		else
		{
			//abre uma galeria com vários itens
			$(".list-galery-image").fancybox({
				openEffect	: 'none',
				closeEffect	: 'none'
			});
	
			//abre uma galeria ao clicar em um único item
			if($(".single-galery-image").size()>0)
			{
				$(".single-galery-image").click(function(e)
				{
					
					var _selector = $(this).attr("rel");
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

h1{ font-size:20px; text-align:center; margin-bottom:40px; line-height:24px;}

.item{ width:20%; float:left; margin-bottom:20px;}
.item > div{ padding:0 10px;}
.item a{ display:block;}
.item span{ padding:10px; display:block;}
.item img{ width:100%;}

.wrapper-imagens-overlay{ display:block;}

/*
	* < 768
*/
@media(max-width: 48em) {
    .center{ width:100%;}
	.item{ width:50%;}
}

/*---------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------*/

</style>
</head>
<!--
	* Pics by
    * https://www.behance.net/gallery/26769147/Craft-Stories-South-Africa
    * https://www.behance.net/gallery/20482451/Treebeard
    * https://www.behance.net/gallery/26883213/Helen
-->
<body class="<?php  echo $mobile; ?>">
	<div class="center">
    	<h1>Ao clicar em um item abre uma galeria com a lista de itens</h1>
    	<div>
            <div class="item">
                <div>
                    <a class="list-galery-image" rel="list-galery-image"  href="img/1fccfb522e0043419884136db7f669c3.jpg" data-width="970" data-height="647" title="Este é o título!!!">
                        <img src="img/1fccfb522e0043419884136db7f669c3.jpg" alt=""/>
                    </a>
                </div>
            </div>
            <div class="item">
                <div>
                    <a class="list-galery-image" rel="list-galery-image"  href="img/5a9cc9f9b75407684cf6b8220f4fc3fd.jpg" data-width="970" data-height="647" title="Este é o título!!!">
                        <img src="img/5a9cc9f9b75407684cf6b8220f4fc3fd.jpg" alt=""/>
                    </a>
                </div>
            </div>
            <div class="item">
                <div>
                    <a class="list-galery-image" rel="list-galery-image"  href="img/5e2c22eab15c480f78971386bd96b8fd.jpg" data-width="970" data-height="647" title="Este é o título!!!">
                        <img src="img/5e2c22eab15c480f78971386bd96b8fd.jpg" alt=""/>
                    </a>
                </div>
            </div>
            <div class="item">
                <div>
                    <a class="list-galery-image" rel="list-galery-image"  href="img/5e2caf78384532f10a8f2889360fd414.jpg" data-width="970" data-height="647" title="Este é o título!!!">
                        <img src="img/5e2caf78384532f10a8f2889360fd414.jpg" alt=""/>
                    </a>
                </div>
            </div>
            <div class="item">
                <div>
                    <a class="list-galery-image" rel="list-galery-image"  href="img/5ea7fe229289906d30b30b56d6183e86.jpg" data-width="970" data-height="647" title="Este é o título!!!">
                        <img src="img/5ea7fe229289906d30b30b56d6183e86.jpg" alt=""/>
                    </a>
                </div>
            </div>
            <div class="item">
                <div>
                    <a class="list-galery-image" rel="list-galery-image"  href="img/9c4c58a771391151126ebf71682a2bbd.jpg" data-width="970" data-height="647" title="Este é o título!!!">
                        <img src="img/9c4c58a771391151126ebf71682a2bbd.jpg" alt=""/>
                    </a>
                </div>
            </div>
            <div class="item">
                <div>
                    <a class="list-galery-image" rel="list-galery-image"  href="img/18d7e894caa6ac79e0337d2e6a444bb0.jpg" data-width="970" data-height="647" title="Este é o título!!!">
                        <img src="img/18d7e894caa6ac79e0337d2e6a444bb0.jpg" alt=""/>
                    </a>
                </div>
            </div>
            <div class="item">
                <div>
                    <a class="list-galery-image" rel="list-galery-image" href="img/34adb8545f82e653031d877ae1ce6161.jpg" data-width="970" data-height="647" title="Este é o título!!!">
                        <img src="img/34adb8545f82e653031d877ae1ce6161.jpg" alt=""/>
                    </a>
                </div>
            </div>
            
            
            <div class="clear"></div>
        </div>
        <br><br><br><br><br><br>
        <hr style="border:none; display:block; height:1px; background-color:#999;" />
        <br><br><br><br>
        <h1>Ao clicar em um item abre uma galeria relacionada a um item específico</h1>
    	<div>
            <div class="item">
                <div>
                    <a class="single-galery-image" rel="_single_galery_image_" href="#">
                        <img src="img/1fccfb522e0043419884136db7f669c3.jpg" alt=""/>
                    </a>
                    <div class="wrapper-imagens-overlay">
                    	<a href="img/1fccfb522e0043419884136db7f669c3.jpg" title="Este é um título" class="_single_galery_image_" data-width="1202" data-height="900"></a>
                        <a href="img/5a9cc9f9b75407684cf6b8220f4fc3fd.jpg" title="Este é um título" class="_single_galery_image_" data-width="1202" data-height="900"></a>
                        <a href="img/5e2c22eab15c480f78971386bd96b8fd.jpg" title="Este é um título" class="_single_galery_image_" data-width="1202" data-height="900"></a>
                        <a href="img/5e2caf78384532f10a8f2889360fd414.jpg" title="Este é um título" class="_single_galery_image_" data-width="1202" data-height="900"></a>
                        <a href="img/5ea7fe229289906d30b30b56d6183e86.jpg" title="Este é um título" class="_single_galery_image_" data-width="1202" data-height="900"></a>
                        <a href="img/9c4c58a771391151126ebf71682a2bbd.jpg" title="Este é um título" class="_single_galery_image_" data-width="1202" data-height="900"></a>
                        <a href="img/18d7e894caa6ac79e0337d2e6a444bb0.jpg" title="Este é um título" class="_single_galery_image_" data-width="1202" data-height="900"></a>
                        <a href="img/34adb8545f82e653031d877ae1ce6161.jpg" title="Este é um título" class="_single_galery_image_" data-width="1202" data-height="900"></a>
                   	</div>
                </div>
            </div>
            <div class="item">
                <div>
                    <a class="single-galery-image" rel="_single_galery_image_2" href="#">
                        <img src="img/__22beb53ecebf41cd2781d4b77976e16a.jpg" alt=""/>
                    </a>
                    <div class="wrapper-imagens-overlay">
                    	<a href="img/9b20201355318275f7bcb14ac7b5e058.jpg" title="Este é um título" class="_single_galery_image_2" data-width="800" data-height="1200"></a>
                        <a href="img/22beb53ecebf41cd2781d4b77976e16a.jpg" title="Este é um título" class="_single_galery_image_2" data-width="1200" data-height="800"></a>
                        <a href="img/48af2feb6d7c505a38102cd6b106a0e3.jpg" title="Este é um título" class="_single_galery_image_2" data-width="1200" data-height="800"></a>
                        <a href="img/945a0c46e93d87f603be515e0279fb0b.jpg" title="Este é um título" class="_single_galery_image_2" data-width="800" data-height="1200"></a>
                        <a href="img/b409762c5ad7728ce8ec926cf51806c4.jpg" title="Este é um título" class="_single_galery_image_2" data-width="800" data-height="1200"></a>
                        <a href="img/c43a38862464b2b28ce558d6bc1744bf.jpg" title="Este é um título" class="_single_galery_image_2" data-width="800" data-height="1200"></a>
                   	</div>
                </div>
            </div>
            <div class="item">
                <div>
                    <a class="single-galery-image" rel="_single_galery_image_3" href="#">
                        <img src="img/_1db488d4f87d5d0abc03f3f5bb4cff4a.jpg" alt=""/>
                    </a>
                    <div class="wrapper-imagens-overlay">
                    	<a href="img/1db488d4f87d5d0abc03f3f5bb4cff4a.jpg" title="Este é um título" class="_single_galery_image_3" data-width="1200" data-height="800"></a>
                        <a href="img/30dd190e044f5d7bd605f1db6c6d8a9d.jpg" title="Este é um título" class="_single_galery_image_3" data-width="1200" data-height="917"></a>
                        <a href="img/60a9586be85d333c7d56c8b294e27972.jpg" title="Este é um título" class="_single_galery_image_3" data-width="1240" data-height="886"></a>
                        <a href="img/84e863d0719c9e116458b20216657f81.jpg" title="Este é um título" class="_single_galery_image_3" data-width="1200" data-height="886"></a>
                        <a href="img/901f272c6a78ab73d58d3d45b3a81eb8.jpg" title="Este é um título" class="_single_galery_image_3" data-width="1240" data-height="1628"></a>
                   	</div>
                </div>
            </div>
            
            
            <div class="clear"></div>
        </div>
    </div>
</body>
</html>
