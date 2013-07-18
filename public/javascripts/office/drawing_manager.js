/* Drawing Manager */

var DrawingManager = (function DrawingManagerFunction()
{
	this.init_manager = undefined;
	this.canvas_path = Array();

	this.Init = function DrawingManager()
	{
		if(io === undefined)
		{
			console.error("The socket.io is not initialized. Can't locate io variable, please check the initialization of socket.js.");
			this.init_manager = false;
		}
		if(paper === undefined)
		{
			console.error("The paper.js library is not initialized. Can't locate the paper variable, please check the initialization of paper.js.");
			this.init_manager = false;
		}
		
		if(this.init_manager === undefined)
		{
			console.log("Everything is all right, you can use DrawingManager");
			this.init_manager = true;
		}
	}
	
	this.manageDrawing = function manage_drawing(data, callback){
		if(!this.init_manager)
		{
			console.error("DrawingManager failed to initialize, please generate a new instance first.");
			return false;
		}
		switch(data.phase)
		{
			case "start_draw":
				if(data.tooltype == "pencil")
				{
					this.canvas_path[data.user] = new paper.Path();
					this.canvas_path[data.user].strokeColor = data.color;
					this.canvas_path[data.user].moveTo(new paper.Point(data.x, data.y));
				}
				paper.view.draw();
			break;
			
			case "draw":
				if(data.tooltype == "pencil")
				{
					this.canvas_path[data.user].lineTo(new paper.Point(data.x, data.y));
				}
				paper.view.draw();
			break;
			
			case "end_draw":
				if(data.tooltype == "pencil")
				{
					this.canvas_path[data.user].lineTo(new paper.Point(data.x, data.y));
				}
				else if(data.tooltype == "circle")
				{
					this.canvas_path[data.user] = new paper.Path.Oval(new paper.Rectangle(data.rectX, data.rectY, data.rectW, data.rectH));
					this.canvas_path[data.user].strokeColor = data.color;
					//this.canvas_path[data.user].smooth();
				}
				paper.view.draw();
			break;
			
			case "reload_image":
				var image = document.createElement('img');
				image.src = data.dataURL;
				var raster = new paper.Raster(image);
				//raster.position = paper.view.center;
				raster.position = new paper.Point(raster.width/2, raster.height/2);
				raster.fitBounds(paper.view.bounds);
				// Workaround for the raster not ready with the image for the redraw
				// setTimeout(function(){paper.view.draw();}, 100);
				callback("ok");
			break;
			
			case "load_image_ok":
				paper.view.draw();
			break;
			
			case "clear_canvas":
				this.clearCanvas();
			break;
		}
	}
	
	this.loadImage = function DrawingManager_loadImage(file_input)
	{
		if(!this.init_manager)
		{
			console.error("DrawingManager failed to initialize, please generate a new instance first.");
			return false;
		}

		this.clearCanvas(true);
		var reader = new FileReader();
		reader.onload = function(evt)
		{
			var image = document.createElement('img');
			image.src = evt.target.result;
			var raster = new paper.Raster(image);
			//raster.position = paper.view.center;
			raster.position = new paper.Point(raster.width/2, raster.height/2);
			raster.fitBounds(paper.view.bounds);
			io.emit('image', { phase: "send_image", dataURL: evt.target.result });
			// Workaround for the raster not ready with the image for the redraw
			// setTimeout(function(){paper.view.draw();}, 100);
		}
		reader.onerror = function(evt)
		{
			console.error("File could not be read! Code " +evt.target.error.code);
		}
		reader.readAsDataURL(file_input.files[0]);
		jQuery(file_input).replaceWith( jQuery(file_input).val("").clone(true) );
	}

	this.drawingTool = function DrawingManager_drawingTool(type_button)
	{
		type_button.siblings().removeClass("selected");
		type_button.addClass("selected");
	}
	
	this.clearCanvas = function DrawingManager_clearCanvas(emit)
	{
		if(!this.init_manager)
		{
			console.error("DrawingManager failed to initialize, please generate a new instance first.");
			return false;
		}
		emit = (typeof emit === "undefined") ? false : emit;
		//jQuery("button#drawing_clear_canvas").addClass("clicked");
		if(paper.project.activeLayer.hasChildren())
		{
			paper.project.activeLayer.removeChildren();
			paper.view.draw();
		}
		if(emit)
			io.emit('draw', {phase: "clear_canvas"});
	}
	
	this.Init();
});