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
    <script type="text/javascript" src="js/jquery.js"></script>
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
                    	<h1>Como trabalhar com esse arquivo?</h1>
                        <p>Copie e renomeio o arquivo <code>_boilerplate.php</code> para o nome da sua seção e coloque o conteúdo dentro da div <code>.wrapper-geral > div</code></p>
                        <h2>Adicionando a nova página no menu</h2>
                        <p>Abra o arquivo <code>menu.php</code> e insira dentro da div <code>content-sticker</code> o seu conteúdo.</p>
                        <p class="red">Adicionando as seções menu</p>
                        <div class="destaque codigo">
                        	<p>Um botão simples sem um subgrupo</p>
                            <div class="response"><xmp>    <div class="list-group">
        <a href="comandos.php" class="list-group-item active link-item">Comandos</a>
    </div>
</xmp></div>
<p>Criando um subgrupo</p>
<div class="response"><xmp><div class="list-group">
        <a href="#" class="list-group-item active menu-open">GIT essencial</a>
        <div class="wrapper-menu">
            <a href="item-1.php" class="list-group-item link-item">Item 1</a>
            <a href="item-2.php" class="list-group-item link-item">Item 2</a>
            <a href="item-3.php" class="list-group-item link-item">Item 3</a>
        </div>
    </div></xmp></div>


                        </div>
                        <hr>
                        <h1>Lorem ipsum sonec sidenuc</h2>
                        <h2>Lorem ipsum sonec sidenuc</h2>
                        <p class="red">Lorem ipsum sonec sidenuc</p>
                        <hr>
                        <p class="red">Olá, sou vermelho</p>
                        <p class="blue">Olá, sou azul</p>
                        <p class="yellow">Olá, sou amarelo</p>
                        <p class="green">Olá, sou verde</p>
                        <hr>
                        <span class="obs">Eu sou uma observação importante</span>
                        <hr>
                        <p>Lorem ipsum <code>sonec</code> sidenuc</p>
                        <p>Lorem ipsum <span class="red">sonec</span> sidenuc</p>
                        <p>Lorem ipsum <span class="red obs">sonec</span> sidenuc</p>
                        <hr>
                        <div class="destaque codigo">
                            <p>Lorem ipsum sonec sidenuc</p>
                            <p>Lorem ipsum sonec sidenuc</p>
                        </div>
                        <div class="destaque codigo">
        	<p class="red">Lorem ipsum sonec sidenuc</p>
            <p>Lorem ipsum sonec sidenuc</p>
            <div class="response"><xmp><p></p><span></span>
<div></div>
            </xmp>
            </div>
        </div>
        
        <div class="destaque codigo green">
            <xmp><!DOCTYPE html>
<html lang="en">
<head>
  <title>A Crazy Experiment</title>
  <meta charset="utf-8" />
</head>
<body>
  <h1>A Crazy Experiment</h1>
  <p>We're trying out a <span style="color: #F0F">crazy</span>
  <span style="color: #06C">experiment</span>!
    
  <p><a href="index.html">Return to home page</a></p>
</body>
</html>

</xmp>
            
        </div>
                        <hr>
                        <p class="codigo">Olá, sou uma Courier New :)</p>
                        <hr>
                        <img src="img/54bcd684f12fd.jpg" class="img-center">
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
