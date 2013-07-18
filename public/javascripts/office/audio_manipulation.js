
/* Based on the paper by Afshin Aresh available at http://pure.ltu.se/portal/files/36285511/LTU-EX-2012-36247736.pdf */
/*
function writeAudio(soundBuffer, audioDest)
{
	if(audioDest.mozWriteAudio!== undefined)
	{
		audioDest.mozWriteAudio(soundBuffer);
	}
}
*/
/* Based on other solution :P */
/*
function stopRecording() {
	recorder.stop();
	recorder.exportWAV(function(s) {
		var audio = document.querySelector("audio#audio_test");
		audio.src = window.URL.createObjectURL(s);
		audio.play();
	});
}
*/

var audio_worker = new Worker("javascripts/office/audio_worker.js");

audio_worker.onmessage = function(e)
{
	switch(e.data.phase)
	{
		case "zip_done":
			io.emit("voice",{
				phase:"mic_recording",
				zip: e.data.data,
			});
		break;
		case "unzip_done":
			//sink.writeBufferSync(new Float32Array(e.data.data)); // needs a Float32Array
			sink.writeBufferSync(e.data.data); // needs a Float32Array
		break;
	}
}

function streamAudio(l,r)
{
	if(io !== undefined)
	{
		audio_worker.postMessage({
			phase: "zip",
			l: l,
			r: r,
		});
		/*
		var zip = new JSZip();
		zip.file("left.bin", JSON.stringify(interleave(l, new Array())));
		zip.file("right.bin", JSON.stringify(interleave(r, new Array())));
		io.emit("voice",{
			phase: "mic_recording",
			//left: interleave(l, new Array()),
			//right: interleave(r, new Array())
			zip: zip.generate()
		});
		zip = undefined;
		*/
	}
}

/* Using:
 * https://developer.mozilla.org/en-US/docs/Introducing_the_Audio_API_Extension */

// Testing one time only
var played = false;
var audiobuffer = new Array();
var nodes = new Array();

var sink;

function receiveAudio(data)
{
	if(sink === undefined)
	{
		sink = new Sink();
		sink.writeMode = "sync";
		sink.on("error", function(e)
		{
			console.error(e);
		});
	}
	audio_worker.postMessage({
		phase: "unzip",
		zipData: data.zip
	});
/*
	var audio = document.querySelector("audio#audio_test");
	if(audio.mozWriteAudio && !played)
	{
		audio.mozSetup(1,44100);
		played = true;
		var zip = new JSZip();
		zip.load(data.zip,{base64:true}); // Here gets the files on the zip file
		var left_channel = JSON.parse(zip.file("left.bin").asText());
		//var left_channel = data.left_channel;
		audiobuffer = audiobuffer.concat(left_channel);
		if(audiobuffer.length > 0) {
			var written = audio.mozWriteAudio(audiobuffer);
			audiobuffer.splice(0, written);
		}
//		played = false;
	}
	else if(AudioContext !== undefined)
	{
		played = true;
		if(aCtx === undefined)
			aCtx = new AudioContext();

		var zip = new JSZip();
		zip.load(data.zip,{base64:true}); // Here gets the files on the zip file
		var left_channel = JSON.parse(zip.file("left.bin").asText());

		//audio.src = aCtx.createMediaElementSource(left_channel); // Approach 1, not tried
		
		//var left_channel = zip.file("left.bin").asArrayBuffer(); // Approach 2 raises exception
		//var buffer = aCtx.createBuffer(left_channel, false);
		audiobuffer = audiobuffer.concat(left_channel);
		document.querySelectorAll("p")[2].innerHTML = "This was created by Joy Dragon 2013: "+audiobuffer.length
		if(nodes[data.username] === undefined)
		{
			//nodes[data.username] = aCtx.createScriptProcessor(left_channel.length, 2, 2);
			nodes[data.username] = aCtx.createJavaScriptNode(left_channel.length, 0, 2);
			var node = nodes[data.username];
			node.onaudioprocess = function(e){
				var left = e.outputBuffer.getChannelData(0);
				var right = e.outputBuffer.getChannelData(0);
				if(audiobuffer.length > 0)
					left = right = audiobuffer.splice(0, left.length);
			}
			node.connect(aCtx.destination);
		}
	}
	else
	{
	}
*/
	/* Raw Aproximation of what would be passing a WAV each time, very bad approach */
	/*
	if(!played)
	{
		played = true;
		var s = exportWAV(data.left_channel, data.right_channel);
		audio.src = window.URL.createObjectURL(s);
		audio.play();
		played = false;
	}
	*/
}