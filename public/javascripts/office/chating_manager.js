var ChatingManager = (function ChatingManagerFunction()
{
	this.init_manager = undefined;
	
	this.Init = function ChatingManager()
	{
		if(io === undefined)
		{
			console.error("The socket.io is not initialized. Can't locate io variable, please check the initialization of socket.js.");
			this.init_manager = false;
		}
		if(this.init_manager === undefined)
		{
			console.log("Everything is all right, you can use ChatingManager");
			this.init_manager = true;
		}
	}

	this.sendMessage = function ChatingManager_sendMessage(textinput)
	{
		var text = jQuery(textinput);
		io.emit('chat', {message: text.val()});
		text.val("");
	}
	
	this.writeGeneralMessages = function ChatingManager_writeGeneralMessages(message)
	{
		my_text = jQuery("#text_history").html();
		my_text += message+"<br/>";
		jQuery("#text_history").html(my_text);
		jQuery("div#div_text_history").scrollTop(jQuery("div#div_text_history").height());
	}
	
	this.writeUserMessage = function ChatingManager_writeUserMessage(data)
	{
		this.writeGeneralMessages("<b>"+data.user+":</b> "+ data.message);
	}
	
	this.clearText = function ChatingManager_clearText()
	{
		jQuery("#text_history").html("");
	}
	
	this.Init();
});