    function insert_listitem()
    {
    	var textarea = document.forms[form_name].elements[text_name];
    	if (!textarea.selectionEnd || (textarea.selectionEnd - textarea.selectionStart == 0))
    	{
    		insert_text('[*]');
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
	$('#format-buttons .bbcode-asterisk').click(function () {
		insert_listitem();
	});
});