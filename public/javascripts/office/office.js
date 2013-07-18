var chating_enabled = false;
var drawing_enabled = false;

// Connect to the Node.js Server
io = io.connect('/office');

io.on('connect',function(data){
	console.log("I guess that connection worked!");

	/* Check if you can initialize the ChatingManager */
	if(typeof ChatingManager == 'function')
	{
		cm = new ChatingManager();
		if(cm.init_manager)
		{
			chating_enabled = true;
		}
	}
	else
	{
		console.error("Chating Manager is not enabled, chat function is going to be disabled for the Office.");
	}

	/* Check if you can initialize the DrawingManager */
	if(paper !== undefined && typeof DrawingManager == 'function')
	{
		var canvas = document.getElementById("draw");
		paper.setup(canvas);
		dm = new DrawingManager();
		if(dm.init_manager)
		{
			drawing_enabled = true;
		}
	}
	else
	{
		console.error("Drawing Manager is not enabled or paper.js is not found, drawing function is going to be disabled for the Office.");
	}
});

io.socket.of("/office").on('connect_failed',function(reason)
{
	/* Should redirect to the login page */
	console.error("Connect Failed event: "+reason);
	window.location.replace("/");
});

io.socket.of("/office").on('error',function(reason)
{
	/* Should redirect to the login page */
	console.error("Error event: "+reason);
	window.location.replace("/");
});

io.on('error', function (error)
{
	showStartPage();
	cm.clearText();
	dm.clearCanvas();
	console.log('Error: '+error.error);
});

// console log a message and the events data
io.on('office', function (data, callback) 
{
    switch(data.type)
    {
	case "General":
		if(data.phase == "register_ok")
		{
			showMainPage();
		}
		else if(data.phase == "register_nok")
		{
			alert(data.message);
			showStartPage();
		}else if(data.phase == "not_allowed")
		{
			alert(data.message);
			dm.clearCanvas();
			clearTextHistory();
			showStartPage();
		}
		else if(data.phase == "announcement")
		{
			cm.writeGeneralMessages("<em>"+data.message+"</em>");
		}
		else if(data.phase == "user_data")
		{
			alert("Hello "+data.user);
			console.log("Hello "+data.user);
		}
		break;
	case "Options":
		if(data.phase == "get_opts")
		{
			if(data.breadcrumb != undefined && data.items != undefined)
			{
				clearTextOptions();
				jQuery(".opt_panel#options").html(data.breadcrumb+loadOptions(data.items));
			}
		}
		break;
	case "Room_List":
		if(data.phase == "update_list")
		{
			console.log("The list of offices:");
			console.log(data.list);
			jQuery("#select_room").children().not("[value=create]").remove();
			for(var i = 0; i < data.list.length; i++)
			{
				var temp_room = data.list[i];
				var option = document.createElement("option");
				jQuery(option).val(temp_room.id).text(temp_room.name);
				jQuery("#select_room").append(option);
			}
		}
		break;
	case "Chat":
		if(chating_enabled)
		{
			textarea = document.getElementById("text_history");
			if(textarea)
			{
				cm.writeUserMessage(data);
			}
		}
		break;
	case "Draw":
		if(drawing_enabled)
		{
			dm.manageDrawing(data, callback);
		}
		break;
    }
});

// Ask for the menu
io.emit("menu", {phase: "main"});

// Actions
function tryRegister()
{
	var password_input = jQuery("input#register_password");
	var office = jQuery("select#select_room");
	if(password_input && office)
	{
		var data = {
			pass: password_input.val(),
			office_num: office.val()
			};
		console.log(data);
		io.emit("register", data);
	}
	
	jQuery("input#register_password").val("");
}

function logout()
{
	io.emit("logout",{});
}

function clearTextOptions()
{
	jQuery(".opt_panel#options").html("");
}

function showStartPage()
{
	jQuery("div#register").show();
	jQuery("div#room_list").show();
	jQuery("div#drawing").hide();
	jQuery("div#chatting").hide();
}

function showMainPage()
{
	jQuery("div#register").hide();
	jQuery("div#room_list").hide();
	jQuery("div#drawing").show();
	jQuery("div#chatting").show();
}

function loadOptions(data)
{
	var html = "";
	for(var i = 0; i < data.length; i++)
	{
		html += data[i]+ "<br/><br/>";
	}
	return html;
}

function kickUser(user)
{
	io.emit('kick', {user: jQuery(user).val()});
}
