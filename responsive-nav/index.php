<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML.0 Strict//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="pt" xml:lang="pt-br">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>
<meta name="title" content="" />
<meta name="description" content="" />
<meta name="keywords" content="" />
<meta name="resource-type" content="document" />
<meta name="distribution" content="global" />
<meta name="rating" content="general" />
<meta name="robots" content="ALL" />    
<meta name="viewport" content="width=device-width, initial-scale=1">        
	<style type="text/css" media="all">@import url(css/pure.css); @import url(css/reset.css);  @import url(css/generic.css);  </style> 
    <link rel="stylesheet" media="screen" type="text/css" href="geral.css">
    <script src="respond.min.js"></script>
    <script src="jquery-1.7.1.min.js"></script>
    <script type="text/javascript">
    $(document).ready(function(){
		$("#bt-menu-responsive").click(function(){
			if(!$("body").hasClass("menu-open")){
				$('body').addClass("menu-open");
				$("#responsive-menu").slideDown(300);
			}else{
				$('body').removeClass("menu-open");
				$("#responsive-menu").slideUp(300);
			}
			return false;
		});
	});
    </script>
</head>
<body>
	<div id="center">
    	<div id="menu" class="ALIZARIN">
        	<div class="ORANGE"></div>
        	<ul>
            	<li> item</li>
                <li> item</li>
                <li> item</li>
                <li> item</li>
            </ul>
            <div class="clear"></div>
        </div>
        <div id="wrapper-responsive-menu">
        	<a href="#" id="bt-menu-responsive"><span class="ORANGE"></span><span class="ORANGE"></span><span class="ORANGE"></span></a>
            <div class="clear"></div>
            <div id="responsive-menu">
            	 <ul >
            	<li> item</li>
                <li> item</li>
                <li> item</li>
                <li> item</li>
            </ul>
            </div>
        </div>
        <div id="conteudo-principal" class="AMETHYST"></div>
        <div id="conteudo-lateral" class="BELIZE"></div>
        <div class="clear"></div>
        <div id="footer" class=" EMERALD"></div>
    </div>
</body>
</html>
