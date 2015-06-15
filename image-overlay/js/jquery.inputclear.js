/*
	Input Clear Value plugin by Backstage Digital
*/

(function($) {	
	$.fn.inputClearValue = function(options)
	{
	   var settings = $.extend( {
		  'enable-color'	: '#000000',
		  'disable-color'	: '#CCCCCC'
		}, options);
	   
		function setSelectionRange(input, selectionStart, selectionEnd)
		{
			if (input.setSelectionRange)
			{
				input.focus();
				input.setSelectionRange(selectionStart, selectionStart);
			}
			else if (input.createTextRange)
			{
				var range = input.createTextRange();
				range.collapse(true);
				range.moveEnd('character', selectionEnd);
				range.moveStart('character', selectionStart);
				range.select();
			}
		}
		
		function addMask(input)
		{
			if(input.hasClass('mask'))
			{
				if(input.hasClass('maskCPF'))
				{
					input.mask("999.999.999-99");
				}

				if(input.hasClass('maskCNPJ'))
				{
					input.mask("99.999.999/9999-99");
				}
				
				if(input.hasClass('maskData'))
				{
					input.mask("99/99/9999");
				}
				
				if(input.hasClass('maskTelefone'))
				{
					input.mask("(99) 9999-9999?9");
				}
				
				if(input.hasClass('maskTelOutDDD'))
				{
					input.mask("9999-9999?9");
				}
				
				if(input.hasClass('maskCEP'))
				{
					input.mask("99.999-999");
				}
				
				if(input.hasClass('mask6Number'))
				{
					input.mask("9?99999");
				}
				
				if(input.hasClass('mask4Number'))
				{
					input.mask("9?999");
				}
				
				if(input.hasClass('mask2Number'))
				{
					input.mask("9?9");
				}
			}
		}
			
		return this.each(
			function()
			{
				$(this).bind('focus.clear click.clear',
					function()
					{
						if($(this).val() == $(this).attr('rel'))
						{
							$(this).css('color',settings['disable-color']);
							
							var inputSelected = $(this);
							
							window.setTimeout(
								function()
								{
									setSelectionRange(inputSelected.get(0),0,0);
								},1
							);							
							
							$(this).bind('keydown.clear',														
								function(e)
								{
									var arrayBlockedCode = [8,9];						
									var code = (e.keyCode ? e.keyCode : e.which);
									
									if(jQuery.inArray(code,arrayBlockedCode) == -1)
									{
										if($(this).val() == $(this).attr('rel'))
										{
											$(this).val('');
											$(this).css('color',settings['enable-color']);
											$(this).unbind('keydown.clear');
											
											addMask($(this));
										}
									}
								}
							);
						}
						
						if($(this).val() != $(this).attr('rel'))
						{
							addMask($(this))
						}
					}
				).bind('blur.clear',
					function()
					{
						$(this).unmask();
						
						if($(this).val() == '')
						{
							$(this).val($(this).attr('rel'));
						}						
						$(this).css('color',settings['enable-color']);
						$(this).unbind('keypress.clear');
					}
				)						
			}
		)
	}
			  
	})(jQuery);