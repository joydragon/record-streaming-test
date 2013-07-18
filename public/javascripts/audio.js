var recorder;
var aCtx;
var processor;
var microphone;
var test_stream = ss.createStream();

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
  recorder = new Worker("/javascripts/recorderWorker.js");
  recorder.postMessage({
    init: "init",
    config: {
      sampleRate: aCtx.sampleRate
    }
  });
  recorder.onmessage = function(e){
    var blob = e.data;
    
    ss(io).emit("shout", test_stream, {size: blob.size}, function(){
      console.log("Done?");
    });
    ss.createBlobReadStream(blob).pipe(test_stream);

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
      io.emit('end_shout',{});
      recorder.postMessage({
	//command: 'getBuffer',
        command: 'exportWAV',
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