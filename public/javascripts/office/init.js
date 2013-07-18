jQuery(document).ready(function(){
	jQuery(".main_panel").corner();
	jQuery("#office_block").accordion({
		collapsible: true,
		heightStyle: "content"
	});
	jQuery("#option_block").accordion({
		collapsible: true,
		active: false,
		heightStyle: "content"
	});
	showStartPage();

	jQuery("input#register_password").keypress(function(event){
		if(event.which == 13)
		{
			jQuery("button#register_submit").click();
		}
	});
	jQuery("input#chat_text_input").keypress(function(event){
		if(event.which == 13)
		{
			jQuery("button#chat_send_text").click();
		}
	});
	jQuery("input#kick_text_input").keypress(function(event){
		if(event.which == 13)
		{
			jQuery("button#kick_send_text").click();
		}
	});
	jQuery("span#drawing_select_color").jPicker({
		window:
		{
			expandable: true,
			position:
			{
				x: "screenCenter",
				y: "screenCenter",
			},
		},
	});
});

