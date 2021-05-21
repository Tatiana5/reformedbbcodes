    function insert_listitem()
    {
    	var textarea = document.forms[form_name].elements[text_name];
    	if (!textarea.selectionEnd || (textarea.selectionEnd - textarea.selectionStart == 0))
    	{
    		//insert_text('[*]');
    	}
    	else
    	{
    		// Automatic [*] for each line
    		var selLength = (typeof(textarea.textLength) == 'undefined') ? textarea.value.length : textarea.textLength;
    		var selStart = textarea.selectionStart;
    		var selEnd = textarea.selectionEnd;
    		var scrollTop = textarea.scrollTop;
     
    		if (selEnd == 1 || selEnd == 2) 
    		{
    			selEnd = selLength;
    		}
     
    		var before = (textarea.value).substring(0,selStart);
    		var selected = (textarea.value).substring(selStart, selEnd);
    		var after = (textarea.value).substring(selEnd, selLength);
     
    		var parts = selected.match(/^(\s*\[list[\w\d=]*\])((?:.|[\r\n])*)(\[\/list\]\s*)$/i);
    		if (parts)
    		{
    			before += parts[1];
    			selected = parts[2];
    			after = parts[3] + after;
    		}
     
    		var items = selected.split(/\r\n|\r|\n/);
    		selected = '';
    		var is_first = true;
    		jQuery.each(items, function(index, value)
    		{
    			if (!is_first) selected += '\n';
    			value = jQuery.trim(value);
    			if (!value) return true;
    			if (value.indexOf('[*]') !== 0 && !is_first) selected += '[*]';
    			selected += value;
				is_first = false;
    		});
     
    		textarea.value = before + selected + after;
    		textarea.selectionStart = before.length-3;
    		textarea.selectionEnd = before.length + selected.length;
    		textarea.scrollTop = scrollTop;
    	}
    	textarea.focus();
    }

$(document).ready(function() {
	$('#format-buttons .bbcode-asterisk, #abbc3_buttons .abbc3_button[name="addlistitem"]').click(function () {
		insert_listitem();
	});
});


// Color pallete
phpbb.colorPalette = function(dir, width, height) {
	$color_list = [
		{color: '#000000', title: rbbLang.black},
		{color: '#ffffff', title: rbbLang.white},
		{color: '#d54e21', title: rbbLang.red},
		{color: '#78a300', title: rbbLang.green},
		{color: '#0e76a8', title: rbbLang.blue},
		{color: '#9cc2cb', title: rbbLang.teal},
		{color: '#73716e', title: rbbLang.grey},
		{color: '#ff7700', title: rbbLang.orange},
		{color: '#ffcc00', title: rbbLang.yellow},
		{color: '#ff66b5', title: rbbLang.pink},
		{color: '#6a5a8c', title: rbbLang.purple}
		
	];
	
	$('#color_palette_placeholder').html('<div class="color-picker-wrap cp-lg"></div>');

	$('.color-picker-wrap').each(function() {
		var self = $(this);
		self.append('<input class="color-picker cp-lg" /><input type="color" style="display:none;" />');
		var $foundactive = false;

		for (var i = 0; i <	$color_list.length; i++) {
			var $active = '';

			if (self.children(".color-picker").val() == $color_list[i].color) {
				$active = 'class="active"';
				$foundactive = true;
			}

			self.append('<a ' + $active + ' style="background-color:' + $color_list[i].color + '" data-color="' + $color_list[i].color.slice(1) + '" title="' + $color_list[i].title + '"></a>');
		}

		if (!$foundactive && self.children(".color-picker").val() != '' ) {
			self.append('<a class="active" title="' + rbbLang.customColor + ' ' + self.children(".color-picker").val() + '" style="background-color:' + self.children(".color-picker").val() + '" data-color="' + self.children(".color-picker").val().slice(1) + '"></a>');
		}

		self.append('<span class="add_new" title="' + rbbLang.addNew + '">+</span>');
	});

	$('.color-picker-wrap').on('click','a, span', function() {
		var self = $(this);

		if (!self.hasClass('add_new')) {	 
			if (!self.hasClass('active')) {
				self.siblings().removeClass('active');
				var color = rgb2hex(self.css("backgroundColor"));
				self.parents('.color-picker-wrap').children(".color-picker").val(color);
				self.addClass('active');
			}
		} else {
			self.parents('.color-picker-wrap').children("input[type='color']").trigger('click');
		}
	});

	$(".color-picker-wrap input[type='color']").on("change",function() {
		var self = $(this);
		self.parents('.color-picker-wrap').children('a').removeClass('active');
		self.parents('.color-picker-wrap').children('span.add_new').remove();
		self.parents('.color-picker-wrap').append('<a class="active" title="' + rbbLang.customColor + ' ' + self.val() + '" style="background-color:' + self.val() + '" data-color="' + self.val().slice(1) + '"></a>');
		self.parents('.color-picker-wrap').children(".color-picker").val(self.val());
		self.parents('.color-picker-wrap').append('<span class="add_new" title="' + rbbLang.addNew + '">+</span>');
	});

	var hexDigits = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

	function rgb2hex(rgb) {
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}

	function hex(x) {
		return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
	}
}


/**
* Apply bbcodes
*/
function rbb_is_empty(val) {
	return !('undefined' !== typeof val && val !== null && val.length > 0);
}

function rbb_is_null(val) {
	return val === null;
}

function rbb_contain_url(text, offsetLeft, offsetRight) {
	var new_text = text;
	var result = false;
	var start_index = end_index = false;
	var in_bbcode = false;

	if (rbb_is_empty(text)) {
		return [result, offsetLeft, offsetRight, new_text];
	}

	var contain_url = /(((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?)/g;

	var url_obj = text.matchAll(contain_url);
	url_obj = Array.from(url_obj);

	url_obj.forEach(function(url, i, url_obj) {
		if (!rbb_is_empty(url) && !rbb_is_empty(url[0])) {
			//test [url= or [img]
			start_index = url.index - '[url]'.length;
			if (!rbb_is_empty(text[start_index])) {
				// test [url=
				end_index = url.index + url[0].length + ']'.length;
				if (!rbb_is_empty(text[end_index - 1])
					&& (text.substr(start_index, end_index) == ('[url=' + url[0] + ']'))) {
					in_bbcode = true;
				}

				// test [/img]
				end_index = url.index + url[0].length + '[/img]'.length;
				if (!rbb_is_empty(text[end_index - 1])
					&& (text.substr(start_index, end_index) == ('[img]' + url[0] + '[/img]'))) {
						in_bbcode = true;
				}
			}

			//test [media]
			start_index = url.index - '[media]'.length;
			if (!rbb_is_empty(text[start_index])) {
				// test [/media]
				end_index = url.index + url[0].length + '[/media]'.length;
				if (!rbb_is_empty(text[end_index - 1])
					&& (text.substr(start_index, end_index) == ('[media]' + url[0] + '[/media]'))) {
						in_bbcode = true;
				}
			}

			// url not in the bbcode
			if (!in_bbcode && !result) {
				offsetLeft += url.index;
				offsetRight -= (text.length - url.index - url[0].length);
				new_text = new_text.substr(url.index, url[0].length);
				result = true;
			}

			in_bbcode = false;
		}
	});

	return [result, offsetLeft, offsetRight, new_text];
}

function bbfontstyle(bbopen, bbclose) {
	var bbcodeUrl = '',
		bbcodeText = '',
		bbcodeFlag = true;

	if (!rbbSettings.abbc3) {
		if (bbopen == '[spoiler]') {
			bbcodeText = prompt(rbbLang.spoilerText, '');

			if (!rbb_is_empty(bbcodeText)) {
				bbopen = '[spoiler title=' + bbcodeText + ']';
			} else if (rbb_is_null(bbcodeText)) {
				bbcodeFlag = false;
			}
		} else if (bbopen == '[quote]') {
			bbcodeText = prompt(rbbLang.quoteAuthor, '');

			if (!rbb_is_empty(bbcodeText)) {
				bbopen = '[quote="' + bbcodeText + '"]';
			} else if (rbb_is_null(bbcodeText)) {
				bbcodeFlag = false;
			}
		}
		else if (bbopen == '[list=]') {
			bbcodeText = prompt(rbbLang.listMarker, '1');

			if (!rbb_is_empty(bbcodeText)) {
				bbopen = '[list=' + bbcodeText + ']';
			} else if (rbb_is_null(bbcodeText)) {
				bbcodeFlag = false;
			}
		} else if (bbopen == '[flash=]') {
			bbcodeText = prompt(rbbLang.flashSize, '640,480');

			if (!rbb_is_empty(bbcodeText)) {
				bbopen = '[flash=' + bbcodeText + ']';
			} else if (rbb_is_null(bbcodeText)) {
				bbcodeFlag = false;
			}
		}
	}

	theSelection = false;

	var textarea = document.forms[form_name].elements[text_name];

	textarea.focus();

	// Close button
	if (!bbcodeFlag && !rbbSettings.abbc3) {
		return false;
	}

	var selStartOld = textarea.selectionStart,
		selEndOld = textarea.selectionEnd;

	//Select word
	if (textarea.selectionEnd
		&& bbclose !== '') {

		var punctuation_marks = ['.', ',', '?', '!', ':', ';', '(', ')', '{', '}', '<', '>'];

		if (bbopen == '[img]' || bbopen == '[url]' || bbopen == '[media]') {
			punctuation_marks.push('"');
			punctuation_marks.push('\'');
		}

		var selStart = textarea.selectionStart,
			selEnd = textarea.selectionEnd,
			space = /\s/;

		if (!(selEnd && (selEnd - selStart > 0))
			&& 'undefined' !== typeof(textarea.value[selStart])
			&& 'undefined' !== typeof(textarea.value[selStart - 1])
			&& !space.test(textarea.value[selStart])
			&& !space.test(textarea.value[selStart - 1])) {

				// find start of the word
				while ('undefined' !== typeof(textarea.value[selStart - 1])
						&& !space.test(textarea.value[selStart - 1])) {
					selStart -= 1;
				}

				// find end of the word
				while ('undefined' !== typeof(textarea.value[selEnd])
						&& !space.test(textarea.value[selEnd])) {
					selEnd += 1;
				}				

				//remove punctuation
				while (punctuation_marks.indexOf(textarea.value[selStart]) !== -1
					|| (textarea.value[selStart] == '"' && (textarea.value[selEnd - 1] !== '"'))
					|| (textarea.value[selStart] == '\'' && (textarea.value[selEnd - 1] !== '\''))) {
					selStart += 1;
				}

				while (punctuation_marks.indexOf(textarea.value[selEnd - 1]) !== -1
						|| (textarea.value[selEnd - 1] == '"' && (textarea.value[selStart] !== '"'))
						|| (textarea.value[selEnd - 1] == '\'' && (textarea.value[selStart] !== '\''))) {
					selEnd -= 1;
				}

				if (selStart < selEnd) {
					textarea.selectionStart = selStart;
					textarea.selectionEnd = selEnd;
					//theSelection = true;
				}
		}// else if (selEnd && (selEnd - selStart > 0)) {
			//theSelection = true;
		//}
	}

	//The new position for the cursor after adding the bbcode
	var caret_pos = getCaretPosition(textarea).start;
	var new_pos = caret_pos + bbopen.length;

	//BBcodes img, media, url
	if ((bbopen == '[img]' || bbopen == '[media]' || bbopen == '[url]') && !rbbSettings.abbc3) {

		if (bbopen == '[img]') {
			var BBalertTitle = rbbLang.img;
		} else if (bbopen == '[url]') {
			var BBalertTitle = rbbLang.url;
		} else if (bbopen == '[media]') {
			var BBalertTitle = rbbLang.media;
		}

		bbcodeSel = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd);

		//Check if bbcodeSel contain link
		var contain_url = rbb_contain_url(bbcodeSel, textarea.selectionStart, textarea.selectionEnd);

		if (!rbb_is_empty(bbcodeSel) && contain_url[0]) {
			bbcodeUrl = contain_url[3];;

			textarea.selectionStart = contain_url[1];
			textarea.selectionEnd = contain_url[2];

			bbcodeSel = true;
		//Check if bbcodeSel is text
		} else if (!rbb_is_empty(bbcodeSel)) {
			bbcodeText = bbcodeSel;
			bbcodeUrl = prompt(BBalertTitle, bbcodeUrl);
			bbcodeSel = false;
		//Check if bbcodeSel is empty
		} else {
			bbcodeUrl = prompt(BBalertTitle, bbcodeUrl);
			bbcodeSel = null;
		}

		//Check if bbcodeUrl contain link
		contain_url = rbb_contain_url(bbcodeUrl, textarea.selectionStart, textarea.selectionEnd);
		if (contain_url[0] && bbcodeSel === true) {
			bbcodeUrl = contain_url[3];

			textarea.selectionStart = contain_url[1];
			textarea.selectionEnd = contain_url[2];
		}

		// Close button
		if (rbb_is_null(bbcodeUrl)) {
			textarea.focus();
			return false;
		//link is not a link
		} else if (!contain_url[0]) {
			// remove selection for insert [bbcode][/bbcode] after old selection
			/*if (rbb_is_empty(selEnd)) {
				selEnd = textarea.selectionEnd;
			}*/
			textarea.selectionStart = selEndOld;
			textarea.selectionEnd = selEndOld;
			if (bbcodeSel === true) {
				bbopen = ((selEndOld) ? ' ' : '') + bbopen;
			} else {
				bbopen = ((selEndOld && (selEndOld - selStartOld > 0) || bbcodeUrl) ? ' ' : '')
							+ ((bbcodeUrl) ? (bbcodeUrl + ' ') : '')
							+ bbopen;
			}
			new_pos = selEndOld + bbopen.length;
			bbcodeUrl = '';
		} else if (bbopen == '[url]') {
			if (bbcodeSel === true) {
				bbcodeText = prompt(rbbLang.urlText, bbcodeText);

				if (!rbb_is_empty(bbcodeText)) {
					bbopen = '[url=';
					bbclose = ']' + bbcodeText + '[/url]';
					new_pos = caret_pos + bbopen.length;
				//Close button
				} else if (rbb_is_null(bbcodeText)) {
					textarea.focus();
					return false;
				}
			} else if (bbcodeSel === false) {
				bbopen = '[url=' + bbcodeUrl + ']';
				new_pos = caret_pos + bbopen.length;
			} else {
				bbcodeText = prompt(rbbLang.urlText, bbcodeText);

				if (!rbb_is_empty(bbcodeText)) {
					bbopen = '[url=' + bbcodeUrl + ']' + bbcodeText + bbclose;
				} else {
					bbopen = bbopen + bbcodeUrl + bbclose;
				}

				bbclose = '';
				bbcodeUrl = '';

				if (rbb_is_empty(selEnd)) {
					selEnd = textarea.selectionEnd;
				}

				textarea.selectionStart = selEnd;
				textarea.selectionEnd = selEnd;
				new_pos = selEnd + bbopen.length;
			}
		} else {
			if (bbcodeSel === false || bbcodeSel === null) {
				bbopen = ((bbcodeSel === false) ? ' ' : '') + bbopen + bbcodeUrl + bbclose;
				bbclose = '';
				bbcodeUrl = '';
				if (rbb_is_empty(selEnd)) {
					selEnd = textarea.selectionEnd;
				}
				textarea.selectionStart = selEnd;
				textarea.selectionEnd = selEnd;
				new_pos = selEnd + bbopen.length;
			} else {
				new_pos = caret_pos + bbopen.length + bbcodeUrl.length + bbclose.length;
			}
		}
	}

	//Size button
	if (bbclose == '[/size]') {
		selStart = (textarea.selectionStart - 12 >= 0) ? (textarea.selectionStart - 12) : 0; //12 is fix for [size=num]
		selEnd = textarea.selectionEnd + bbclose.length;
		bbcodeSel = textarea.value.slice(selStart, selEnd);

		var contain_size_check = /\[size=(\d+)\](.*)\[\/size\]$/;
		var new_text_size_check = /\[size=(\d+|\+|-)\]/;

		var new_text_size = bbopen.match(new_text_size_check)[1];

		var contain_size = false;
		if (!rbb_is_empty(bbcodeSel)) {
			var old_text_size = bbcodeSel.match(contain_size_check);

			if (!rbb_is_empty(old_text_size) && !rbb_is_empty(old_text_size[1])) {
				old_text_size = parseInt(old_text_size[1]);
				contain_size = true;
			}
		}

		if (!contain_size) {
			var old_text_size = 100;
		}

		if (new_text_size == '+' || new_text_size == '-') {
			new_text_size = old_text_size + ((new_text_size == '+') ? 15 : -15);
		}

		if (new_text_size < 1 || new_text_size > 200) {
			textarea.focus();
			return false;
		}

		if (new_text_size == 100 || contain_size) {
			var old_text_length = bbcodeSel.length;
			var scrollTop = textarea.scrollTop;
			selStartOld = textarea.selectionStart;
			selEndOld = textarea.selectionEnd;

			if (new_text_size == 100) {
				bbcodeSel = bbcodeSel.replace(contain_size_check, '$2');
			} else {
				bbopen = '[size=' + new_text_size + ']';
				bbcodeSel = bbcodeSel.replace(contain_size_check, bbopen + '$2' + bbclose);
			}

			textarea.selectionStart = selStart;
			textarea.selectionEnd = selEnd;
			textarea.setRangeText(bbcodeSel);

			var fix = (new_text_size == 100 && contain_size) ? bbclose.length : 0;
			textarea.selectionStart = selStartOld - old_text_length + bbcodeSel.length + fix;
			textarea.selectionEnd = selEndOld - old_text_length + bbcodeSel.length + fix;

			textarea.focus();
			textarea.scrollTop = scrollTop;

			return false;
		} else {
			bbopen = '[size=' + new_text_size + ']';
			var new_pos = caret_pos + bbopen.length;
		}
	}

	if ((clientVer >= 4) && is_ie && is_win) {
		// Get text selection
		theSelection = document.selection.createRange().text;

		if (theSelection) {
			// Add tags around selection
			document.selection.createRange().text = bbopen + theSelection + bbclose;
			textarea.focus();
			theSelection = '';
			return;
		}
	} else if (textarea.selectionEnd && (textarea.selectionEnd - textarea.selectionStart > 0)) {
		mozWrap(textarea, bbopen, bbclose);
		textarea.focus();
		theSelection = '';
		return;
	}

	// Open tag
	insert_text(bbopen + bbcodeUrl + bbclose);

	// Center the cursor when we don't have a selection
	// Gecko and proper browsers
	if (!isNaN(textarea.selectionStart)) {
		textarea.selectionStart = new_pos;
		textarea.selectionEnd = new_pos;
	}
	// IE
	else if (document.selection) {
		var range = textarea.createTextRange();
		range.move("character", new_pos);
		range.select();
		storeCaret(textarea);
	}

	textarea.focus();
}

/**
* Insert text at position
*/
function insert_text(text, spaces, popup) {
	var textarea;

	if (!popup) {
		textarea = document.forms[form_name].elements[text_name];
	} else {
		textarea = opener.document.forms[form_name].elements[text_name];
	}

	if (spaces) {
		text = ' ' + text + ' ';
	}

	// Since IE9, IE also has textarea.selectionStart, but it still needs to be treated the old way.
	// Therefore we simply add a !is_ie here until IE fixes the text-selection completely.
	if (!isNaN(textarea.selectionStart) && !is_ie) {
		var sel_start = textarea.selectionStart;
		var sel_end = textarea.selectionEnd;

		mozWrap(textarea, text, '');
		textarea.selectionStart = sel_start + text.length;
		textarea.selectionEnd = sel_end + text.length;
	} else if (textarea.createTextRange && textarea.caretPos) {
		if (baseHeight !== textarea.caretPos.boundingHeight) {
			textarea.focus();
			storeCaret(textarea);
		}

		var caret_pos = textarea.caretPos;
		caret_pos.text = caret_pos.text.charAt(caret_pos.text.length - 1) === ' ' ? caret_pos.text + text + ' ' : caret_pos.text + text;
	} else {
		if (textarea.setRangeText) {
			textarea.setRangeText(text);
		} else {
			textarea.value = textarea.value + text;
		}
	}

	if (!popup) {
		textarea.focus();
	}
}

/**
* From http://www.massless.org/mozedit/
*/
function mozWrap(txtarea, open, close) {
	var selLength = (typeof(txtarea.textLength) === 'undefined') ? txtarea.value.length : txtarea.textLength;
	var selStart = txtarea.selectionStart;
	var selEnd = txtarea.selectionEnd;
	var scrollTop = txtarea.scrollTop;

	if (txtarea.setRangeText) {
		let selected = txtarea.value.slice(selStart, selEnd);
		txtarea.setRangeText(open + selected + close);
	} else {
		var s1 = (txtarea.value).substring(0,selStart);
		var s2 = (txtarea.value).substring(selStart, selEnd);
		var s3 = (txtarea.value).substring(selEnd, selLength);

		txtarea.value = s1 + open + s2 + close + s3;
	}
	txtarea.selectionStart = selStart + open.length;
	txtarea.selectionEnd = selEnd + open.length;
	txtarea.focus();
	txtarea.scrollTop = scrollTop;

	return;
}

// Font size button
$(document).on('click', '#format-buttons .bbcode-size a[data-size], #abbc3_buttons .bbcode-size a[data-size]', function(e) {
	e.preventDefault();

	bbfontstyle('[size=' + $(this).attr('data-size') + ']', '[/size]');

	$(this).parents('.dropdown-container').find('.dropdown-trigger').click();
});

// File button
$(document).on('click', '#format-buttons .bbcode-file, #abbc3_buttons .bbcode-file', function(e) {
	e.preventDefault();

	$(document).find('#tabs a[data-subpanel="attach-panel"]').click();
	$(document).find('#add_files').click();
});

$(document).ready(function() {
	new IntersectionObserver(
		([e]) => e.target.toggleAttribute('stuck', e.intersectionRatio < 1),
		{threshold: [1]}
	).observe(document.querySelector('.format-buttons'));
});



var rbb_scroll_flag = false;

$(window).scroll(function() {
	rbb_scroll_flag = true;
});

$('#message').scroll(function() {
	rbb_scroll_flag = true;
});

$(window).resize(function () {
	rbb_scroll_flag = true;
});

$(document).on('focus keydown', '#message', function() {
	if (rbb_scroll_flag) {
		var $rbb_txtarea = $('<textarea>')
							.css('postion', 'absolute')
							.css('top', '-9999px')
							.css('height', '1px')
							.css('width', $('#message').width())
							.css('font-size', $('#message').css('font-size'))
							.css('line-height', $('#message').css('line-height'))
							.css('border', $('#message').css('border'))
							.css('padding', $('#message').css('padding'))
							.attr('class', 'rbb_txtarea')
							.val($('#message')[0].value.slice(0, $('#message')[0].selectionEnd));

		$('#message').after($rbb_txtarea);
		var rbb_text_height = Math.max($rbb_txtarea[0].scrollHeight - parseInt($('#message').css('line-height')) - 3, 0),
			rbb_message_offset = $('#message').offset().top
			rbb_page_offset = window.pageYOffset;

		if (Math.abs($('#message')[0].scrollHeight - $('#message').innerHeight()) > Number.EPSILON) {
			if (rbb_text_height > $('#message')[0].scrollTop) {
				rbb_text_height -= $('#message')[0].scrollTop;
			} else {
				$('#message')[0].scrollTop = rbb_text_height;
				rbb_text_height = 0;
			}
		}


		if ((rbb_message_offset - rbb_page_offset) < parseInt($('#format-buttons').outerHeight())) {
			rbb_page_offset += Math.min(Math.abs(rbb_message_offset - rbb_page_offset), parseInt($('#format-buttons').outerHeight()));
		}

		//rbb_message_offset -= parseInt($('#message').css('padding-bottom'));
		rbb_message_offset += rbb_text_height;
				
		//console.log('answer = ' + (rbb_message_offset - rbb_page_offset));
		if ((rbb_message_offset - rbb_page_offset) < 0) {
			window.scrollBy(0, (rbb_message_offset - rbb_page_offset));
		}

		$('.rbb_txtarea').remove();
		rbb_scroll_flag = false;
	}
});

