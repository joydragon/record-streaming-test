var express = require('express')
  , routes = require('./routes')
//  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , crypto = require('crypto')
  , fs = require('fs')
  , connect = require('express/node_modules/connect')
  , stream = require('stream')
  , ss = require("socket.io-stream")
  , util = require('util')
  , lame = require("lame");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));

app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);

var encoder = new lame.Encoder({
  channels: 2,		// 2 channels (left and right)
  bitDepth: 32,		// 32-bit samples
  float: true,		// Receive floats?
  //sampleRate: 44100	// 44,100 Hz sample rate
});

var server = http.createServer(app);
server.listen(app.get('port'));

var io = require('socket.io').listen(server, function() {
	console.log("Express server listening on port " + app.get('port'));
});

io.on('connection',function(socket)
{
	console.log("Someone connected!");
	socket.emit("welcome", {msg:"Hello you!"});

	socket.on('shout', function(data){
	  console.log(data);
	  //data.pipe(encoder);
	  if(my_streams === undefined)
	  {
	    my_streams = new SimpleStream();
// 	    my_streams.pipe(encoder);
	  }
	  my_streams.add(data);
	});
	socket.on('end_shout', function(data){
	  //my_streams.pipe(encoder).pipe(process.stdout);
	});
	
	ss(socket).on("shout", function(stream, data){
	  console.log(stream);
	  //console.log(data);
	  //stream.pipe(encoder).pipe(process.stdout);
	  var out_stream = fs.createWriteStream(path.resolve(__dirname, 'sample_pcm.mp3'));
	  stream.pipe(out_stream).on('close', function(){console.log("DONE!!")});
	});
});
