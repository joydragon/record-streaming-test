var recorder;
var aCtx;
var processor;
var microphone;
var test_stream = ss.createStream();
var array_stream;

/*
ss(io).emit("shout", test_stream);
var a = new Float32Array(3);
a[0] = 0.12313123; a[1] = 0.81208; a[2] = 0.512412;
var b = new ss.Array2ByteStream(a)
b.pipe(test_stream);
*/

jQuery(document).ready(function(){
  //var audio = document.querySelector('audio#audio_test');
  if(navigator.getUserMedia)
  {
    navigator.getUserMedia({audio: true, video: false}, 
      function(stream) {
        //var audio = document.querySelector('audio#audio_test');
        if(AudioContext !== undefined)
        {
          aCtx = new AudioContext();
          microphone = aCtx.createMediaStreamSource(stream);
      
          //processor = aCtx.createJavaScriptNode(8192, 2, 2);
          processor = aCtx.createScriptProcessor(8192, 2, 2);
          processor.onaudioprocess = function(e){
            //streamAudio(e.inputBuffer.getChannelData(0), e.inputBuffer.getChannelData(1));
          };
          microphone.connect(processor);
          // Dunno really why this is needed
          processor.connect(aCtx.destination);
      
          //Loopback
          microphone.connect(aCtx.destination);
        }
        else
        {
      
        }
      },
      function(err){
        console.log("Error: "+err);
      });
    //console.log("After getUserMedia")
  }
  else
  {
    console.error("Your browser is not compatible");
  }
});

function initRecorder()
{
  // Pass the stream to the server to store as part of the natural thing :P
  ss(io).emit("shout", test_stream);
  
  recorder = new Worker("/javascripts/recorderWorker.js");
  recorder.postMessage({
    init: "init",
    config: {
      sampleRate: aCtx.sampleRate
    }
  });
  recorder.onmessage = function(e){
    var blob = e.data;
    
    /*
    ss(io).emit("shout", test_stream, {size: blob.size}, function(){
      console.log("Done?");
    });
    ss.createBlobReadStream(blob).pipe(test_stream);
    */
    
    
    
    //test_stream.end();
    /*
    var p = document.createElement("p");
    jQuery(p).text(window.URL.createObjectURL(blob));
    jQuery("div#audio_recorder").append(p);
    
    var audio = document.createElement("audio");
    audio.src = window.URL.createObjectURL(blob);
    jQuery(audio).attr("type","audio/wav").attr("autoplay","autoplay").attr("controls","controls");
    jQuery("div#audio_recorder").append(audio);
    */
  };
}

function processAudio(event)
{
  /* Use the recorder.js project to record the audio */
  if(recorder === undefined)
  {
    initRecorder();
  }
  
  recorder.postMessage({
    command: 'record',
    buffer: [
      event.inputBuffer.getChannelData(0),
      event.inputBuffer.getChannelData(1)
    ]
  });
  
  /* Transmit this to the server, with no treatment, have to test with encoding and/or compression */
  if(io !== undefined)
  {
    if(array_stream === undefined)
    {
	array_stream = ss.Array2ByteStream(event.inputBuffer.getChannelData(0));
	array_stream.on("error", function(error){console.log("There was an error");console.log(error)});
	array_stream.pipe(test_stream);
    }
    else
    {
	array_stream.addMore(event.inputBuffer.getChannelData(0));
    }
    /*
    io.emit("shout",{
      left: event.inputBuffer.getChannelData(0),
      right: event.inputBuffer.getChannelData(1)
    });
    */
  }
}


function createAudioRecorderElement()
{
  // TODO: Needs test to see it audio tag is supported
  // TODO: Needs to have aCtx defined beforehand

  initRecorder();

  var div = document.createElement("div");
  jQuery(div).attr("id","audio_recorder").addClass("");
  
  var p = document.createElement("p");
  jQuery(p).text("Audio Recorder");
  var audio = document.createElement("audio");
  jQuery(audio).attr("autoplay", "autoplay");
  var record_btn = document.createElement("button");
  jQuery(record_btn).attr("id", "record_sound").text("Record!").click(function(){
    if(jQuery(this).text() == "Record!")
    {
      processor.onaudioprocess = processAudio;
      jQuery(this).text("Stop!");
    }
    else if(jQuery(this).text() == "Stop!")
    {
      processor.onaudioprocess = null;
      array_stream.end();
      io.emit('end_shout',{});
      recorder.postMessage({
	//command: 'getBuffer',
        command: 'exportRawWAV',
        type: 'audio/wav'
      });
      jQuery(this).text("Record!");
    }
  });
  
  jQuery(div).append(p).append(audio).append(record_btn);
  
  jQuery("body").prepend(div);
  
}

function createAudioPlayerElement()
{
}