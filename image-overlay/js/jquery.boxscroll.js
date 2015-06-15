/*
	Scroll plugin by Backstage Digital
	$("#boxRolagem").boxscroll({'rate':2});
*/

(function($) {	
	$.fn.boxscroll = function(options)
	{
		var settings = $.extend( {
		'hideBar'			: false,
		'resetPosition'		: true,
		'rate'				: 1
		}, options);
		
		return this.each(
			function()
			{
		  		var box = $(this);
				
		  		var barra = $('.barraRolagem',box);
		  		var drag = $('.drag',box);
		  		var container = $('.container',box);
		  		var content = $('.content',box);
				
				var hBarra, hDrag, hDragMove, hContentMove;
				
				function initScroll()
				{
					if(!box.filter(':visible').size())
					{
						box.addClass('boxScrollHide');
						box.css('visibility','hide')
						box.show();
					}
					
					if(settings['resetPosition'] == true)
					{
						container.scrollTop(0);
						drag.css('top','0px');
					}
					
					hBarra = parseFloat(barra.height());
					hDrag = parseFloat(drag.height());
					hDragMove = hBarra-hDrag;
					
					hContentMove = content.height()-container.height();
					
					if(settings['resetPosition'] == false)
					{
						var pctRolagem = container.scrollTop()/hContentMove;
						drag.css('top',(hDragMove*pctRolagem)+'px');
					}
					
					if(content.height() < container.height())
					{
						barra.hide();
						
						container.scrollTop(0);
						drag.css('top','0px');
					}
					else
					{
						if(settings['hideBar'] == false)
						{
							barra.css('visibility','visible');
						}
						
						barra.show();
						
						initDrag();
						initWheel();
					}
					
					if(box.hasClass('boxScrollHide'))
					{
						box.removeClass('boxScrollHide');
						box.hide();
						box.css('visibility','visible')
					}
				}
				
				function initDrag()
				{
					drag.draggable({
						axis: 'y',
						containment: 'parent',
						cursor: 'pointer',
						appendTo: 'body',
						scroll: false,
						drag: function(event, ui)
						{
							dragMove();
						}
					});					
				}

				function dragMove()
				{
					var posDrag = parseFloat(getSize(drag,"top"));
					var pctMove = posDrag/hDragMove;
					
					container.scrollTop(parseInt(hContentMove*pctMove));
				}
				
				function initWheel()
				{
					container.bind('mousewheel',
						function(event, delta)
						{
							var posDrag = parseFloat(getSize(drag,"top"));
							var pctBox = (container.height()/content.height())*5;
							
							if(posDrag-(delta*settings['rate']*pctBox) >= 0 && posDrag-(delta*settings['rate']*pctBox) <= hDragMove)
							{
								drag.css('top',(posDrag-(delta*settings['rate']*pctBox))+"px");
							}
							else
							{
								if(posDrag-(delta*settings['rate']) < 0)
								{
									drag.css('top',"0px");
								}
								
								if(posDrag-(delta*settings['rate']) > hDragMove)
								{
									drag.css('top',hDragMove+"px");
								}
							}
							
							dragMove();
							
							return false;
						}
					);
				}
				
				function objectSize(_item,_type)
				{
					var _size;
					
					switch(_type)
					{
						case 'width':
							_size = _item.width() + getSize(_item,'margin-left') + getSize(_item,'margin-right') + getSize(_item,'padding-left') + getSize(_item,'padding-right') + getSize(_item,'border-left-width') + getSize(_item,'border-right-width');
							break;
						case 'height':
							_size = _item.height() + getSize(_item,'margin-top') + getSize(_item,'margin-bottom') + getSize(_item,'padding-top') + getSize(_item,'padding-bottom') + getSize(_item,'border-top-width') + getSize(_item,'border-bottom-width');
							break;
					}
					
					return _size;
				}
				
				function getSize(_obj,_css)
				{
					var _regExp = new RegExp("[a-z][A-Z]","g");
					return parseFloat(_obj.css(_css).replace(_regExp, ""));
				}				
				
				initScroll();
			}
		)
	}
			  
	})(jQuery);