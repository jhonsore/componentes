/**
 * DropKick . Backstage Digital
 *
 * Highly customizable <select> lists
 * https://github.com/JamieLottering/DropKick
 *
 * &copy; 2011 Jamie Lottering <http://github.com/JamieLottering>
 *                        <http://twitter.com/JamieLottering>
 * 
 */
(function ($, window, document) {

  var ie6 = false;

  // Help prevent flashes of unstyled content
  if ($.browser.msie && Math.floor($.browser.version) < 7) {
    ie6 = true;
  } else {
    document.documentElement.className = document.documentElement.className + ' dk_fouc';
  }
  
  var
    // Public methods exposed to $.fn.dropkick()
    methods = {},

    // Cache every <select> element that gets dropkicked
    lists   = [],

    // Convenience keys for keyboard navigation
    keyMap = {
      'left'  : 37,
      'up'    : 38,
      'right' : 39,
      'down'  : 40,
      'enter' : 13,
	  'esc'	  : 27,
	  'tab'	  : 9,
	  'fnkeys': [17,18,91]
    },

    // HTML template for the dropdowns
    dropdownTemplate = [
      '<div class="dk_container" id="dk_container_{{ id }}" tabindex="{{ tabindex }}">',
        '<a class="dk_toggle">',
          '<strong><span class="dk_label">{{ label }}</span></strong>',
		  '<em>&nbsp;</em>',
        '</a>',
        '<div class="dk_options">',
          '<ul class="dk_options_inner">',
          '</ul>',
        '</div>',
      '</div>'
    ].join(''),

    // HTML template for dropdown options
    optionTemplate = '<li class="{{ current }}"><a data-dk-dropdown-value="{{ value }}"><span>{{ text }}</span></a></li>',

    // Some nice default values
    defaults = {
      startSpeed : 50,  // I recommend a high value here, I feel it makes the changes less noticeable to the user
	  z	     : 999,
	  hOption: 19,
	  nItens : 5,
	  wIcon : 30,
      theme  : false,
      change : false
    },

    // Make sure we only bind keydown on the document once
    keysBound = false,
	
	//control function keys (control, option, command)
	fnkey     = false,
	
	//find option with letters pressed
	findtxt   = "",
	
	//text item active
	activetxt = "",
	
	timeOutID
  ;

  // Called by using $('foo').dropkick();
  methods.init = function (settings) {
    settings = $.extend({}, defaults, settings);

    return this.each(function () {
      var
        // The current <select> element
        $select = $(this),

        // Store a reference to the originally selected <option> element
        $original = $select.find(':selected').first(),

        // Save all of the <option> elements
        $options = $select.find('option'),

        // We store lots of great stuff using jQuery data
        data = $select.data('dropkick') || {},

        // This gets applied to the 'dk_container' element
        id = $select.attr('id') || $select.attr('name'),

        // This gets updated to be equal to the longest <option> element
        width  = settings.width || $select.outerWidth(),
		
        // Check if we have a tabindex set or not
        tabindex  = $select.attr('tabindex') ? $select.attr('tabindex') : '',

        // The completed dk_container element
        $dk = false,

        theme
      ;
	  
      // Dont do anything if we've already setup dropkick on this element
      if (data.id) {
        return $select;
      } else {
        data.settings  = settings;
        data.tabindex  = tabindex;
        data.id        = id;
        data.$original = $original;
        data.$select   = $select;
        data.value     = _notBlank($select.val()) || _notBlank($original.attr('value'));
        data.label     = $original.text();
        data.options   = $options;
		data.wRealSelect = ($select.outerWidth() > width) ? $select.outerWidth() : width;
      }
	  
      // Build the dropdown HTML
      $dk = _build(dropdownTemplate, data);
	  
	  $dk.css({
        'z-index' : settings.z
      });

      // Make the dropdown fixed width if desired
      $dk.find('.dk_toggle').css({
        'width' : width + 'px'
      });
	  
	  // Define elements of dropdown
	  $dk.find('.dk_toggle > strong').css({
        'width' : (width-settings.wIcon) + 'px'
      });
	  $dk.find('.dk_toggle > em').css({
        'width' : (settings.wIcon) + 'px'
      });
	  
	  $dk.find('.dk_options').css({
		 'width' : $select.outerWidth() + 'px'
	  });
	  $dk.find('.dk_options_inner').css({
		 'max-height' : (settings.nItens*settings.hOption)+'px'
	  });

      // Hide the <select> list and place our new one in front of it
      $select.before($dk);

      // Update the reference to $dk
      $dk = $('#dk_container_' + id).fadeIn(settings.startSpeed);

      // Save the current theme
      theme = settings.theme ? settings.theme : 'default';
      $dk.addClass('dk_theme_' + theme);
      data.theme = theme;

      // Save the updated $dk reference into our data object
      data.$dk = $dk;

      // Save the dropkick data onto the <select> element
      $select.data('dropkick', data);

      // Do the same for the dropdown, but add a few helpers
      $dk.data('dropkick', data);

      lists[lists.length] = $select;

      // Focus events
      $dk.bind('focus.dropkick', function (e) {
        $dk.addClass('dk_focus');
		activetxt = $dk.find('.dk_label').text();
      }).bind('blur.dropkick', function (e) {
		$dk.find('.dk_label').text(activetxt);
        $dk.removeClass('dk_open dk_focus');
      });
	  
      setTimeout(function () {
        $select.hide();
      }, 0);
    });
  };

  // Allows dynamic theme changes
  methods.theme = function (newTheme) {
    var
      $select   = $(this),
      list      = $select.data('dropkick'),
      $dk       = list.$dk,
      oldtheme  = 'dk_theme_' + list.theme
    ;

    $dk.removeClass(oldtheme).addClass('dk_theme_' + newTheme);

    list.theme = newTheme;
  };

  // Reset all <selects and dropdowns in our lists array
  methods.reset = function () {
    for (var i = 0, l = lists.length; i < l; i++) {
      var
        listData  = lists[i].data('dropkick'),
        $dk       = listData.$dk,
        $current  = $dk.find('li').first()
      ;

      $dk.find('.dk_label').text(listData.label);
      $dk.find('.dk_options_inner').animate({ scrollTop: 0 }, 0);

      _setCurrent($current, $dk);
      _updateFields($current, $dk, true);
    }
  };

  // Expose the plugin
  $.fn.dropkick = function (method) {
    if (!ie6) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || ! method) {
        return methods.init.apply(this, arguments);
      }
    }
  };

  //selector custom
  jQuery.expr[':'].contains = function(a, i, m)
  {
	  var 
	    text       = _removeAccent(jQuery(a).text()),
	  	strSearch  = m[3],
		regex      = new RegExp("^"+strSearch,"i"); 
	  ;
	
	  return regex.test(text);
  };		

  // private
  function _handleKeyBoardNav(e, $dk) {
    var
	  type     = e.type,
      code     = e.keyCode,
      data     = $dk.data('dropkick'),
      options  = $dk.find('.dk_options'),
      open     = $dk.hasClass('dk_open'),
      current  = $dk.find('.dk_option_current:visible'),
      first    = options.find('li:visible').first(),
      last     = options.find('li:visible').last(),
      next,
      prev
    ;
	
    switch (code) {
      case keyMap.tab:
      case keyMap.enter:
	  	if(type == "keydown")
		{
			var prevent = true;
			
			if (open) {
			  if(current.size())
			  {
			    _updateFields(current.find('a'), $dk);
			  }
			  _closeDropdown($dk);
			} else {
				if(keyMap.tab != code)
				{
			  		_openDropdown($dk);
				}
				else
				{
					prevent = false;
				}
			}
			
			if(prevent == true)
			{
				e.preventDefault();
			}
		}
      break;

      case keyMap.up:
	  	if(type == "keydown")
		{
			prev = current.prev('li:visible');
			if (open) {
			  if (prev.length) {
				_setCurrent(prev, $dk);
			  } else {
				_setCurrent(last, $dk);
			  }
			} else {
			  _openDropdown($dk);
			}
			e.preventDefault();
		}
      break;

      case keyMap.down:
	  	if(type == "keydown")
		{
			if (open) {
			  next = current.next('li:visible').first();
			  if (next.length) {
				_setCurrent(next, $dk);
			  } else {
				_setCurrent(first, $dk);
			  }
			} else {
			  _openDropdown($dk);
			}
			e.preventDefault();
		}
      break;
	  
	  case keyMap.esc:
	  	if(type == "keydown")
		{
			 if (open) {
				_closeDropdown($dk);
				e.preventDefault();
			 }
		}
	  break;

      default:
		if(open)
		{
			if(type == "keydown" && fnkey == false)
			{
				if(jQuery.inArray(code,keyMap.fnkeys) > -1)
				{
					fnkey = true;
				}
				
				if(((code >= 48 && code <= 90) || (code >= 96 && code <= 105) || code == 32 || code == 8) && fnkey == false)
				{
					findtxt = (code == 8) ? findtxt.substr(0,(findtxt.length-1)) : findtxt+String.fromCharCode(code);
					
					//clearTimeout(timeOutID);
					//timeOutID = setTimeout(function(){findtxt = ""},500);
					
					_listOption($dk)
					e.preventDefault();
				}
			}
			
			if(type == "keyup")
			{
				if(jQuery.inArray(code,keyMap.fnkeys) > -1)
				{
					fnkey = false;
				}
			}		
		}
      break;
    }
  }
  
  //function show
  function _listOption($dk)
  {
	var 
	  allItens = $(".dk_options_inner li",$dk),
	  container = $dk.find('.dk_options_inner'),
	  wItem = $dk.find('.dk_toggle').width()+_getSize(container,'border-left')+_getSize(container,'border-right'),
	  newWidth
	;
		
	if(findtxt)
	{
		 itens = $("a:contains('"+findtxt+"')",allItens).parent();
		 
		 if(itens.size())
		 {
			_setCurrent(itens.eq(0), $dk);
			$('.dk_label',$dk).text($('span',itens.eq(0)).text());
		 }
	}

	clearTimeout(timeOutID);
	timeOutID = setTimeout(function(){findtxt = ""},1000);
	
	$dk.find('.dk_options').css({
	  'width' : $dk.data("data").wRealSelect + 'px'
	});
	
	/*
	itens.each(function(index)
	{
	  wContainer = $(this).attr('rel');

      if(wItem < parseInt(wContainer))
	  {
	    wItem = wContainer;  
	  }
    });
	
	newWidth = (allItens.size() == itens.size()) ? $dk.data("data").wRealSelect : wItem;
	$dk.find('.dk_options').css({
	  'width' : newWidth + 'px'
	});
	*/
  }
  
  //
  function _removeAccent(str)
  {
	var 
	  charFind = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ',
	  charReplace = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC',
	  newStr = '',
	  char,
	  charPos
	;
	
	for(i=0;i<str.length;i++)
	{
		char = String(_utf8_encode(str.substr(i,1)));
		charPos = charFind.indexOf(char);
		
	  	newStr += (charPos>=0) ? charReplace.substr(charPos,1) : str.substr(i,1);
	}
	
	return newStr;
  }
  
  function _getSize(_obj,_css)
  {
	  var _regExp = new RegExp("[a-z][A-Z]","g");
	  return (_obj.css(_css)) ? parseFloat(_obj.css(_css).replace(_regExp,"")) : 0;
  }
  
  function _utf8_encode(argString)
  {
	  if (argString === null || typeof argString === "undefined") {
		return "";
	  }
	
	  var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	  var utftext = '',
		start, end, stringl = 0;
	
	  start = end = 0;
	  stringl = string.length;
	  for (var n = 0; n < stringl; n++) {
		var c1 = string.charCodeAt(n);
		var enc = null;
	
		if (c1 < 128) {
		  end++;
		} else if (c1 > 127 && c1 < 2048) {
		  enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
		} else {
		  enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);
		}
		if (enc !== null) {
		  if (end > start) {
			utftext += string.slice(start, end);
		  }
		  utftext += enc;
		  start = end = n + 1;
		}
	  }
	
	  if (end > start) {
		utftext += string.slice(start, stringl);
	  }
	
	  return utftext;
  }
  
  function _utf8_decode ( str_data ) {
	var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;
 
	str_data += '';
 
	while ( i < str_data.length ) {
		c1 = str_data.charCodeAt(i);
		if (c1 < 128) {
			tmp_arr[ac++] = String.fromCharCode(c1);
			i++;
		} else if ((c1 > 191) && (c1 < 224)) {
			c2 = str_data.charCodeAt(i+1);
			tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = str_data.charCodeAt(i+1);
			c3 = str_data.charCodeAt(i+2);
			tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
 
	return tmp_arr.join('');
  }  

  // Update the <select> value, and the dropdown label
  function _updateFields(option, $dk, reset) {
    var value, label, data;

    value = option.attr('data-dk-dropdown-value');
    label = option.text();
    data  = $dk.data('dropkick');

    $select = data.$select;
    $select.val(value);

    $dk.find('.dk_label').text(label);
	activetxt = label;

    reset = reset || false;

    if (data.settings.change && !reset) {
      data.settings.change.call($select, value, label);
    }
  }

  // Set the currently selected option
  function _setCurrent($current, $dk) {
    $dk.find('.dk_option_current').removeClass('dk_option_current');
    $current.addClass('dk_option_current');

    _setScrollPos($dk, $current);
  }

  function _setScrollPos($dk, anchor) {
    var height = anchor.prevAll('li').outerHeight() * anchor.prevAll('li').length;
    $dk.find('.dk_options_inner').animate({ scrollTop: height + 'px' }, 0);
  }

  // Close a dropdown
  function _closeDropdown($dk) {
	findtxt = "";
    $dk.removeClass('dk_open');
    $dk.parent().removeClass('focusCampoSelect');
	_listOption($dk);
	
	$('.dk_label',$dk).text(activetxt);	
  }

  // Open a dropdown
  function _openDropdown($dk) {
    findtxt = "";
	activetxt = $dk.find('.dk_label').text();
	
	_listOption($dk);
	
	
    var data = $dk.data('dropkick');
    $dk.find('.dk_options').css({ top : $dk.find('.dk_toggle').outerHeight() - 1 });
    $dk.toggleClass('dk_open');
	
	var indexActive = $("option",$dk.parent().find('select')).index($("option:selected",$dk.parent().find('select')));
	_setCurrent($(".dk_options_inner li",$dk).eq(indexActive), $dk);
		
	$(".dk_options_inner li",$dk).each(
		function(index)
		{
			var 
			  a = $(this).find("a"),
			  span = $(this).find("a span"),
	  	      container = $dk.find('.dk_options_inner'),
              wItem = span.outerWidth()+_getSize(a,'padding-left')+_getSize(a,'padding-right')+_getSize(container,'border-left')+_getSize(container,'border-right')
			;
			
			$(this).attr('rel',wItem);
		}
	)
  }

  /**
   * Turn the dropdownTemplate into a jQuery object and fill in the variables.
   */
  function _build (tpl, view) {
    var
      // Template for the dropdown
      template  = tpl,
      // Holder of the dropdowns options
      options   = [],
      $dk
    ;

    template = template.replace('{{ id }}', view.id);
    template = template.replace('{{ label }}', view.label);
    template = template.replace('{{ tabindex }}', view.tabindex);

    if (view.options && view.options.length) {
      for (var i = 0, l = view.options.length; i < l; i++) {
        var
          $option   = $(view.options[i]),
          current   = 'dk_option_current',
          oTemplate = optionTemplate
        ;

        oTemplate = oTemplate.replace('{{ value }}', $option.val());
        oTemplate = oTemplate.replace('{{ current }}', (_notBlank($option.val()) === view.value) ? current : '');
        oTemplate = oTemplate.replace('{{ text }}', $option.text());

        options[options.length] = oTemplate;
      }
    }

    $dk = $(template);
    $dk.find('.dk_options_inner').html(options.join(''));

	$dk.data("data",view);
    return $dk;
  }

  function _notBlank(text) {
    return ($.trim(text).length > 0) ? text : false;
  }
  
  $(function () {

    // Handle click events on the dropdown toggler
    $('.dk_toggle').live('click', function (e) {
      var $dk  = $(this).parents('.dk_container').first();

      _openDropdown($dk);

      if ("ontouchstart" in window) {
        $dk.addClass('dk_touch');
        $dk.find('.dk_options_inner').addClass('scrollable vertical');
      }

      e.preventDefault();
      return false;
    });

    // Handle click events on individual dropdown options
    $('.dk_options a').live(($.browser.msie ? 'mousedown' : 'click'), function (e) {
      var
        $option = $(this),
        $dk     = $option.parents('.dk_container').first(),
        data    = $dk.data('dropkick')
      ;
    
      _updateFields($option, $dk);
      _closeDropdown($dk);
      _setCurrent($option.parent(), $dk);
    
      e.preventDefault();
      return false;
    });

    // Setup keyboard nav
    $(document).bind('keydown.dk_nav keyup.dk_nav', function (e) {
      var
        // Look for an open dropdown...
        $open    = $('.dk_container.dk_open'),

        // Look for a focused dropdown
        $focused = $('.dk_container.dk_focus'),

        // Will be either $open, $focused, or null
        $dk = null
      ;

      // If we have an open dropdown, key events should get sent to that one
      if ($open.length) {
        $dk = $open;
      } else if ($focused.length && !$open.length) {
        // But if we have no open dropdowns, use the focused dropdown instead
        $dk = $focused;
      }

      if ($dk) {
        _handleKeyBoardNav(e, $dk);
      }
    });
  });
})(jQuery, window, document);