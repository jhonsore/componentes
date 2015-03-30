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
    <link href="css/jquery-ui.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

	<style type="text/css">
		#response{ border:1px solid #CCC; min-height:200px; width:400px; display:block; margin:15px 0 0 0; padding:10px;}
		#response span{ display:block; margin-bottom:5px;}
		
		.select{ position:relative;}
		select{ opacity:0;}
		.ui-selectmenu-menu .ui-menu{height:210px;}
		
		.tema2 .ui-selectmenu-button{ background-color:#FF0; border-color:#333333;}
		.tema2 .ui-selectmenu-menu .ui-menu{ border-color:#F00; height:170px;}
		.tema2 .ui-selectmenu-text, .tema2 .ui-menu-item{ font-size:12px;}
		
		.tema3{ margin-bottom:10px;}
		.tema3 .ui-selectmenu-button{ background:url(img/bg-select.png) no-repeat 0 0; height:49px; display:block; border:none; position:relative; z-index:110;}
		.tema3 .ui-selectmenu-button .ui-selectmenu-text{ color:#ffffff; font-size:14px; margin:7px 0 0 10px; width:160px;}
		.tema3 .ui-selectmenu-button .ui-icon{ border:none; background:url(img/arrow.png) no-repeat 0 0; width:10px; height:6px; display:block; right:13px;}
		.tema3 .ui-selectmenu-menu{ background:url(img/select-itens.png) no-repeat 0 0; width:207px; height:241px; top:42px !important;}
		.tema3 .ui-selectmenu-menu .ui-menu{ background:none; border:none; padding:10px; height:220px;}
		.tema3 .ui-selectmenu-menu .ui-menu .ui-menu-item{ color:#ffffff; font-size:12px;}
		.tema3 .ui-selectmenu-menu .ui-menu .ui-menu-item.ui-state-focus{ background:none; color:#999;}
    
    </style>

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
                    	<h1>Custom select</h1>
                        
                        <p>Cria um select customizável</p>
                        <a href="http://jqueryui.com/selectmenu/">http://jqueryui.com/selectmenu/</a>
                        <div class="clear"></div>
                        
                     
                        <div class="destaque codigo">
            <p>Arquivos</p>
            <div class="response"><xmp><script src="js/jquery.js"></script>
<script src="js/jquery-ui.js"></script>
<link href="css/jquery-ui.css" rel="stylesheet"></xmp>
            </div>
             <p>HTML</p>
            <div class="response"><xmp><div id="select">
    <select>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
    </select>
</div></xmp>

            </div>
            <p>Instanciando select</p>
            <div class="response"><xmp>$('#select select').selectmenu(
{
    appendTo: "#select",
    change: function( event, ui ) {
        
    },
    select: function( event, ui ) {
        
    }
}
</xmp>
            </div>
        </div>
                        
                        <hr>
                        <p>Para adicionar um tema basta colocar a classe com o tema na <code>div</code> anterior ao select</p>
                        <hr>
                        <div id="select3" class="tema3 select">
                            <select>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                        <div id="select" class="select">
                            <select>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                        
                        <div id="select2" class="tema2 select">
                            <select>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                        
                        <div id="response"></div>
                    </div>                   
                   <!-- /////////////////////////////////// -->
                   <!-- /////////////////////////////////// -->
                   
                </div>
            </div>

        </div>

    </div>
    <!-- /.container -->

    <!-- jQuery -->
    <script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/scripts.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery-ui.js"></script>
<script>
$( document ).ready(function() {
	$('#select select').selectmenu(
		{
			appendTo: "#select",
			width:400,
			change: function( event, ui ) {
				
			},
			select: function( event, ui ) {
				$("#response").append('<span>item selected : '+ui.item.value+"</span>");
			}
		}
	);
	
	$('#select2 select').selectmenu(
	{
		appendTo: "#select2",
		width:200,
		change: function( event, ui ) {
			
		},
		select: function( event, ui ) {
			$("#response").append('<span>item selected #select2 : '+ui.item.value+"</span>");
		}
	});
	
	$('#select3 select').selectmenu(
	{
		appendTo: "#select3",
		width:206,
		change: function( event, ui ) {
			
		},
		select: function( event, ui ) {
			$("#response").append('<span>item selected #select3 : '+ui.item.value+"</span>");
			$("#response").append('<span>Mudnado o valor do select 3 para : '+$( "#select3 select" ).val()+"</span>");
		}
	});


});
</script>
</body>

</html>
