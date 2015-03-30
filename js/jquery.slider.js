/*
	Slider plugin by Backstage Digital
	$(".slider").slider({'time':.7,'nItens':5,'orientation':'vertical'});
*/

(function($) {	
	$.fn.slider = function(options)
	{
	   var settings = $.extend( {
		  'nItens'		: 3,
		  'time'		: 1,
		  'auto'		: false,
		  'timeAuto'	: 5,
		  'infinite'	: false,
		  'slideGroup'	: false,
		  'addMargin'	: false,
		  'orientation' : "horizontal",
		  'pause'		: false,
		  'adjustHeight': false
		}, options);
	
		return this.each(
			function()
			{
		  		var box = $(this);
		  		var nItens = settings['nItens'];
		  		var time = settings['time'];
		  		var orientation = settings['orientation'];
				
		  		var setaDir = $('.setaDir',box);//seta-dir
		  		var setaEsq = $('.setaEsq',box);//seta-esq
		  		var setaUp = $('.setaUp',box);
		  		var setaDown = $('.setaDown',box);
		  		var bullet = $('.bullet ul li',box)

		  		var container = $('.container',box);
		  		var content = $('.content',box);
		  		var item = $('.item',content);
		  		
		  		var _item = item.eq(0);
		  		var wItem = objectSize(_item,'width');
		  		var hItem = objectSize(_item,'height') ;
				
				var tamanhoContent = 0;
				
				var statusMove = false;
				
				if(orientation == "horizontal")
				{
					var tamanhoContainer = container.width();
					var tamanhoItem = wItem;
					var margin_previous = "margin-left";
					var seta_previous = setaEsq;
					var seta_next = setaDir;
					
				}
				else
				{
					var tamanhoContainer = container.height();
					var tamanhoItem = hItem;
					var margin_previous = "margin-top";
					var seta_previous = setaUp;
					var seta_next = setaDown;
				}
				
				function initSlider()
				{
					bullet.eq(0).addClass('ativo');

					if((settings['auto'] != false || settings['infinite'] == true) && item.size() > nItens)
					{
						for(i=0;i<nItens;i++)
						{
							item.eq(i).clone().insertAfter(item.eq(item.size()-1));
							item = $('.item',content);
						}

						if(settings['auto'] != false)
						{
							autoSlider();
						}
					}
					
					if(orientation == "horizontal")
					{
						container.attr('rel',0).scrollLeft(0);
						item.each(
							function(index)
							{
								tamanhoContent += objectSize($(this),'width');
							}
						)
						content.width(tamanhoContent);
					}
					else
					{
						container.attr('rel',0).scrollTop(0);
						item.each(
							function(index)
							{
								tamanhoContent += objectSize($(this),'height');
							}
						)
						content.height(tamanhoContent);

					}
					
					if(tamanhoContainer >= tamanhoContent)
					{
						if(orientation == "horizontal")
						{
							_newMargin = getSize(container,margin_previous)+objectSize(seta_previous,'width');
						}
						else
						{
							_newMargin = getSize(container,margin_previous)+objectSize(seta_previous,'height');
							
						}
						
						if(settings['addMargin'])
						{
							container.css(margin_previous,_newMargin);
						}
						
						seta_previous.hide();
						seta_next.hide();
					}
					else
					{
						seta_previous.css('visibility','visible');
						seta_next.css('visibility','visible');
					}

					if(settings['adjustHeight'] == true)
					{
						var _newHeight = 0;

						item.each(function()
						{
							_elHeight = objectSize($(this),'height');
							_newHeight = (_elHeight > _newHeight) ? _elHeight : _newHeight;
						})

						container.height(_newHeight);

						if(orientation == "vetical")
						{
							item.each(function()
							{
								$(this).height(_newHeight);
							})
						}
					}
				}
				
				function autoSlider()
				{
					box.oneTime(1000*settings['timeAuto'], function(){
						if(container.attr('rel') == item.size()-1)
						{
							if(orientation = "horizontal")
							{
								container.scrollLeft(tamanhoItem*0);
							}
							else
							{
								container.scrollTop(tamanhoItem*0);
							}
							container.attr('rel',0);
						}
						sliderMove('next');
					});			
				}
				
				function initNav()
				{
					seta_next.mouseover(
						function()
						{
							var _rel = parseInt(container.attr('rel'));
							
							if(_rel < item.size()-nItens && !statusMove || (settings['auto'] || settings['infinite']) && !statusMove)
							{
								$(this).css('cursor','pointer');
								$(this).addClass('over');
							}
							else
							{
								$(this).css('cursor','default');
							}
						}
					).mouseout(
						function()
						{
							$(this).css('cursor','default');
							$(this).removeClass('over');
						}
					).click(
						function()
						{
							box.stopTime();
							sliderMove('next');
							return false;
						}
					)
					
					seta_previous.mouseover(
						function()
						{
							var _rel = parseInt(container.attr('rel'));
							
							if(_rel > 0 && !statusMove || (settings['auto'] || settings['infinite']) && !statusMove)
							{
								$(this).css('cursor','pointer');
								$(this).addClass('over');
							}
							else
							{
								$(this).css('cursor','default');
							}
						}
					).mouseout(
						function()
						{
							$(this).removeClass('over');
						}
					).click(
						function()
						{
							box.stopTime();
							sliderMove('previous');
							return false;
						}
					)

					bullet.click(
						function(e)
						{
							e.preventDefault();
							if(!statusMove && !$(this).hasClass('ativo'))
							{
								box.stopTime();
								slideTransition(bullet.index($(this)));

								bullet.removeClass('ativo');
								$(this).addClass('ativo');								
							}
						}
					)


					if(settings['pause'] == true)
					{
						item.mouseenter(function()
						{
							box.stopTime();
						}).mouseleave(function(){
							triggerNext(container.attr('rel'));
						})
					}
				}				

				function sliderMove(_type)
				{
					if(!statusMove)
					{
						var nSlideMove = 1;
						var rel = parseInt(container.attr('rel'));
						
						switch(_type)
						{
							case 'next':
								_bt = seta_next;
								
								if(settings['slideGroup'] && !settings['auto'])
								{
									if(rel+settings['slideGroup'] > item.size()-nItens)
									{
										nSlideMove = item.size()-nItens-rel;
									}
									else
									{
										nSlideMove = settings['slideGroup'];
									}
								}
								
								_n = rel+nSlideMove;
								
								break;
							case 'previous':
								_bt = seta_previous;

								if(settings['slideGroup'] && !settings['auto'])
								{
									if(rel-settings['slideGroup'] < 0)
									{
										nSlideMove = rel;
									}
									else
									{
										nSlideMove = settings['slideGroup'];
									}
								}

								_n = rel-nSlideMove;
								
								break;
						}
						
						if(_n >= 0 && _n <= item.size()-nItens)
						{
							if(_n == 0 && !(settings['auto'] || settings['infinite']) || _n == item.size()-nItens && !(settings['auto'] || settings['infinite']))
							{
								_bt.css('cursor','default');
								_bt.removeClass('over');
							}				
							
							slideTransition(_n);
						}
						else
						{
							if(settings['auto'] || settings['infinite'])
							{
								switch(_n)
								{
									case -1:
										container.scrollLeft((item.size()-nItens)*tamanhoItem);
										_n = item.size()-nItens-1;
										break;
									case (item.size()-nItens)+1:
										container.scrollLeft(0);
										_n = 1;
										break;
								}

								slideTransition(_n);
							}
						}
					}	
				}
				
				function slideTransition(n)
				{
					statusMove = true;
					
					if(orientation == "horizontal")
					{
						container.stop().animate({scrollLeft: tamanhoItem*n}, time*1000,
							function()
							{
								triggerNext(n);
							}
						);
					}
					else
					{
						container.stop().animate({scrollTop: tamanhoItem*n}, time*1000,
							function()
							{
								triggerNext(n);
							}
						);
					}
				}

				function triggerNext(n)
				{
					statusMove = false;
					container.attr('rel',n);

					bullet.removeClass('ativo');
					bullet.eq(n).addClass('ativo');

					if(settings['auto'] != false)
					{
						if(n == item.size()-1)
						{
							bullet.eq(0).addClass('ativo');
						}

						autoSlider();						
					}
				}

				function objectSize(_item,_type)
				{
					var _size;
					
					switch(_type)
					{
						case 'width':
							_size = _item.width() + getSize(_item,'margin-left') + getSize(_item,'margin-right') + getSize(_item,'padding-left') + getSize(_item,'padding-right') + getSize(_item,"border-left-width") + getSize(_item,"border-right-width");
							break;
						case 'height':
							_size = _item.height() + getSize(_item,'margin-top') + getSize(_item,'margin-bottom') + getSize(_item,'padding-top') + getSize(_item,'padding-bottom') + getSize(_item,"border-top-width") + getSize(_item,"border-bottom-width");
							break;
					}
					
					return _size;
				}
				
				function getSize(_obj,_css)
				{
					var _regExp = new RegExp("[a-z][A-Z]","g");
					return parseFloat(_obj.css(_css).replace(_regExp, ""));
				};

				$.when(
				    $.getScript( "js/jquery.timers-1.2.js" )
				).done(
					function()
					{
				  		initSlider();
						initNav();
					}
				);				
			}
		)
	}
			  
	})(jQuery);