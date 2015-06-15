jQuery(document).ready(
	function()
	{
        menuInternoMobile();
        overlayImage();
        initMenu();
        menuMobile();

        $(window).resize(windowResized);

        if($(".fale-conosco").size()>0)
        {
            $('#select-loja select').selectmenu(
                {
                    appendTo: "#select-loja",
                    width:"100%",
                    change: function( event, ui ) {

                    },
                    select: function( event, ui ) {

                    }
                }
            );

            $('#select-assunto select').selectmenu(
                {
                    appendTo: "#select-assunto",
                    width:"100%",
                    change: function( event, ui ) {

                    },
                    select: function( event, ui ) {

                    }
                }
            );
        }

        if($(".box-check").size()>0)
        {
            $('.item-box-check').click(function()
            {
                var _parent = $(this).parent();

                //box com múltiplas escolhas
                if(_parent.hasClass("multiple-option"))
                {
                    if($(this).hasClass('ativo'))
                    {
                        $(this).removeClass('ativo');
                    }
                    else
                    {
                        $(this).addClass('ativo');
                    }
                }
                else//box com uma escolha apenas
                {
                    if($(".ativo",_parent).size()>0)
                    {
                        $(".ativo",_parent).removeClass('ativo');
                    }

                    $(this).addClass('ativo');
                }

                return false;
            });
        }
	}
);

function menuMobile ()
{
    $("#bt-busca-mobile").click(function ()
    {
        if($(this).hasClass('open'))
        {
            $(this).removeClass('open');
            $(".wrapper-busca-mobile").hide();
        }
        else
        {
            $(this).addClass('open');
            $(".wrapper-busca-mobile").show();
        }

        return false;
    });

    if($(".button-menu-mobile").size()>0)
    {
        $(".button-menu-mobile").click(function()
        {
            if($(this).hasClass("active") === true)
            {
                closeMenuMobile();
            }
            else
            {
                $(".button-menu-mobile").addClass("active");
                $("#menu-secoes-mobile").stop(true,true).slideDown(300);
            }

            return false;
        });
    }

    $(".bt-menu-mobile").click(function() {
        if (!$(this).hasClass('href'))
        {

            var _wrapper = $("> .menu-interno-mobile", $(this).parent());

            //--------------
            //fecha os menus internos a frente do botão
            var _menusAbertos = $(".menu-interno-mobile", $(this).parent());
            _menusAbertos.each(function (index, element) {
                var _el = $(element);
                if (!_wrapper.is(_el)) {
                    _el.stop(true, true).slideUp(100);
                    _el.removeClass("menu-interno-mobile-open");
                    $(".bt-menu-mobile-ativo", _el.parent()).removeClass("bt-menu-mobile-ativo");
                }
            });

            //-------------
            //fecha todos os menus internos antecessores abertos
            var _menusOutsideAbertos = $((".bt-menu-mobile-ativo"), $(this).parent().parent());

            _menusOutsideAbertos.each(function (index, element) {
                $(".menu-interno-mobile", $(this).parent()).stop(true, true).slideUp(100);
                $(".menu-interno-mobile", $(this).parent()).removeClass("menu-interno-mobile-open");
                $(element).removeClass("bt-menu-mobile-ativo");
            });

            //--------------
            if (_wrapper.is(':visible')) {
            }
            else {
                _wrapper.stop(true, true).slideDown(100);
                _wrapper.addClass("menu-interno-mobile-open");
                $(this).addClass("bt-menu-mobile-ativo");
            }

            return false;
        }
    });

}

function closeMenuMobile ()
{
    $(".button-menu-mobile").removeClass("active");
    $("#menu-secoes-mobile").stop(true,true).slideUp(300);

    setTimeout(function(){
        $(".menu-interno-mobile").removeAttr('style');
    },301);

    //fecha o menu interno
    $(".menu-interno-mobile").stop(true,true).slideUp(100);
    $(".menu-interno-mobile").removeClass("menu-interno-mobile-open");
    $(".bt-menu-mobile-ativo").removeClass("bt-menu-mobile-ativo");
}

//---------------------------------------
var windowWidth = 0;//tamanho da tela do navegador
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

function initMenu()
{
    $(".item-submenu ").mouseenter(function()
    {
        var _submenu = $(".submenu",$(this));

        if(_submenu.size()>0)
        {
            var _delay =  ($(".submenu-open").size()>0) ? 300 : 0;//delay para esperar ou não que o menu aberto feche
            _submenu.removeAttr("style");
            _submenu.stop(true,true).delay(_delay).slideDown(200);
            _submenu.addClass("submenu-open");
        }

    });

    $(".item-submenu ").mouseleave(function()
    {
        var _submenu = $(".submenu",$(this));

        if(_submenu.size()>0)
        {
            _submenu.stop(true,true).slideUp(200,function(){ _submenu.removeClass("submenu-open");});
            //fecha o menu das lojas
            if(_submenu.hasClass("submenu-lojas"))
            {
                openCidades('');
            }
        }
    });

    //menu lojas
    $("#header .box-estados a").click(function()
    {
        if(!$(this).hasClass('href'))
        {
            var _id = $(this).attr('href');
            openCidades(_id);
            $(this).parent().addClass('bt-lojas-ativo');
            return false;
        }
    });

    $("#header .box-cidades a").click(function()
    {
        if(!$(this).hasClass('href'))
        {
            var _id = $(this).attr('href');
            openBairros(_id);
            $(this).parent().addClass('bt-lojas-ativo');
            return false;
        }
    });

    $("#header .box-bairros a").click(function()
    {
        if(!$(this).hasClass('href'))
        {
            var _id = $(this).attr('href');
            openLocal(_id);
            $(this).parent().addClass('bt-lojas-ativo');
            return false;
        }
    });
    //fim menu lojas
}

function openCidades (_id)
{
    //----
    //reset itens
    $(".submenu-lojas .box-local").hide();
    $(".submenu-lojas .box-cidades").hide();
    $(".submenu-lojas .box-bairros").hide();

    $(".submenu-lojas .box-local .bt-lojas-ativo").removeClass('bt-lojas-ativo');
    $(".submenu-lojas .box-cidades .bt-lojas-ativo").removeClass('bt-lojas-ativo');
    $(".submenu-lojas .box-bairros .bt-lojas-ativo").removeClass('bt-lojas-ativo');
    $(".submenu-lojas .box-estados .bt-lojas-ativo").removeClass('bt-lojas-ativo');

    if($(".submenu-lojas .box-cidades .ativo").size()>0)
    {
        $(".submenu-lojas .box-cidades .ativo").hide();
        $(".submenu-lojas .box-cidades .ativo").removeClass('ativo');
    }

    //----
    if($(".submenu-lojas #box-cidades-"+_id).size()>0)
    {
        $(".submenu-lojas .box-cidades").show();
        $(".submenu-lojas #box-cidades-"+_id).fadeIn(200);
        $(".submenu-lojas #box-cidades-"+_id).addClass('ativo');
    }
}

function openBairros (_id)
{
    //-----
    //reset itens
    $(".submenu-lojas .box-local").hide();
    $(".submenu-lojas .box-bairros").hide();

    $(".submenu-lojas .box-local .bt-lojas-ativo").removeClass('bt-lojas-ativo');
    $(".submenu-lojas .box-bairros .bt-lojas-ativo").removeClass('bt-lojas-ativo');
    $(".submenu-lojas .box-cidades .bt-lojas-ativo").removeClass('bt-lojas-ativo');

    if($(".submenu-lojas .box-bairros .ativo").size()>0)
    {
        $(".submenu-lojas .box-bairros .ativo").hide();
        $(".submenu-lojas .box-bairros .ativo").removeClass('ativo');
    }

    //-----
    if($(".submenu-lojas #box-bairros-"+_id).size()>0)
    {
        $(".submenu-lojas .box-bairros").show();
        $(".submenu-lojas #box-bairros-"+_id).fadeIn(200);
        $(".submenu-lojas #box-bairros-"+_id).addClass("ativo");
    }
}

function openLocal (_id)
{
    //----
    //reset itens
    $(".submenu-lojas .box-local").hide();
    $(".submenu-lojas .box-local .bt-lojas-ativo").removeClass('bt-lojas-ativo');
    $(".submenu-lojas .box-bairros .bt-lojas-ativo").removeClass('bt-lojas-ativo');

    if($(".submenu-lojas .box-local .ativo").size()>0)
    {
        $(".submenu-lojas .box-local .ativo").hide();
        $(".submenu-lojas .box-local .ativo").removeClass('ativo');
    }

    //----
    if($(".submenu-lojas #box-local-"+_id).size()>0)
    {
        $(".submenu-lojas .box-local").show();
        $(".submenu-lojas #box-local-"+_id).fadeIn(200);
        $(".submenu-lojas #box-local-"+_id).addClass("ativo");
    }
}

function menuInternoMobile ()
{
    if($(".bt-menu-trigger").size()>0)
    {
        $(".bt-menu-trigger").click(function()
        {
            if($(this).hasClass("active") === true)
            {
                closeMenuInterno ();
            }
            else
            {
                openMenuInterno();
            }

            return false;
        });
    }
}

function closeMenuInterno ()
{
    $(".wrapper-menu-interno .bt-menu-interno").stop().slideUp(200);
    $(".wrapper-menu-interno").removeClass("menu-interno-open");
    $(".bt-menu-trigger").removeClass("active");
}

function openMenuInterno()
{
    $(".bt-menu-trigger").addClass("active");
    $(".wrapper-menu-interno .bt-menu-interno").stop().slideDown(200);
    $(".wrapper-menu-interno").addClass("menu-interno-open");
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

function windowResized ()
{
    windowWidth = $(window).width();

    //breakpoints
    //xs
    if(windowWidth < 568)
    {

    }

    //sm
    if(windowWidth > 568 && windowWidth < 768)
    {

    }

    //md
    if(windowWidth > 768 && windowWidth < 1024)
    {
        checkSubmenu ();
        checkMenuMobile();
    }

    //lg
    if(windowWidth > 1024 && windowWidth < 1280)
    {

    }

    //xl
    if(windowWidth >= 1280)
    {

    }

}

function checkMenuMobile ()
{
    $("#menu-secoes-mobile").removeAttr("style");
    $("#menu-secoes-mobile").stop(true,true).slideUp(300);
    closeMenuMobile ();
}

function checkSubmenu ()
{
    if($(".menu-interno-open").size()>0)
    {
        closeMenuInterno ();
    }
}

