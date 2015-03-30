<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Componentes</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/shop-item.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="js/jquery-1.7.1.min"></script>
    <script type="text/javascript" src="js/jquery.slider.js"></script>
	<script type="text/javascript" src="js/jquery.timers-1.2.js"></script>
	<script type="text/javascript" src="js/scripts.js"></script>

</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <a class="navbar-brand" >Componentes</a>
            </div>
        </div>
        <!-- /.container -->
    </nav>
	
    <!-- Page Content -->
    <div class="container">

        <div class="row">

            <?php
				$secao = "primeiros_passos";
			 include "menu.php"; ?>

            <div class="col-md-9">

                <div class="thumbnail wrapper-geral">
                   
                   <!-- /////////////////////////////////// -->
                   <!-- /////////conteúdo da seção///////// -->
                   <!-- /////////////////////////////////// -->
                    <div>
                    	
                        <h1>Slider</h1>
                        
<div class="destaque codigo">
            <p>Arquivos</p>
            <div class="response"><xmp><script type="text/javascript" src="js/jquery.slider.js"></script>
<script type="text/javascript" src="js/jquery.timers-1.2.js"></script></xmp>
            </div>
             <p>HTML</p>
            <div class="response"><xmp><div class="slide">
    <a href="#" class="seta-esq setaEsq"></a>
    <div class="container">
      <div class="content">
      	<!-- conteúdo -->
        <div class="item"><img src="file.[ext]"></div>
        <div class="item"><img src="file.[ext]"></div>
        <div class="item"><img src="file.[ext]"></div>
        <div class="item"><img src="file.[ext]"></div>
        <div class="item"><img src="file.[ext]"></div>
        <!-- fim conteúdo -->
        <div class="clear"></div>
      </div>
    </div>
    <a href="#" class="seta-dir setaDir"></a>
</div></xmp>
            </div>
            <p>Instanciando select</p>
            <div class="response"><xmp>$(".slide").slider({'time': .7, 'nItens': 1, 'auto': false, 'infinite': true});</xmp>
            </div>
        </div> 
        			<style type="text/css">
                    .container{width: 100%; position: relative; overflow: hidden;}
					.content {width: 5000px}
					.content .item {float: left;}
					.seta-esq{}
					.seta-dir{}
					
					.item img{ background:#999; height:200px; width:100px;}
                    </style>
                    <script type="text/javascript">
						$(function () {
							$(".slide").slider({'time': .7, 'nItens': 1, 'auto': true, 'infinite': true});
						});
					</script>
        			<div class="slide">
                        <a href="#" class="seta-esq setaEsq"></a>
                        <div class="container">
                          <div class="content">
                            <!-- conteúdo -->
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <div class="item"><img src=""></div>
                            <!-- fim conteúdo -->
                            <div class="clear"></div>
                          </div>
                        </div>
                        <a href="#" class="seta-dir setaDir"></a>
                    </div>
        
                               
                    </div>                   
                   <!-- /////////////////////////////////// -->
                   <!-- /////////////////////////////////// -->
                   
                </div>
            </div>

        </div>

    </div>
    <!-- /.container -->

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

</body>

</html>
