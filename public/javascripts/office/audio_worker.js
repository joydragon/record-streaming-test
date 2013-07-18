importScripts("../jszip/jszip.js");
importScripts("../jszip/jszip-load.js");
importScripts("../jszip/jszip-deflate.js");

this.onmessage = function(e){
  switch(e.data.phase){
    case 'zip':
	postMessage({
		phase: "zip_done",
		data: compressArrays(e.data.l, e.data.r)
	});
	break;
    case 'unzip':
	postMessage({
		phase: "unzip_done", 
		data: uncompressArrays(e.data.zipData)
	});
	break;
  }
};

function compressArrays(l,r)
{
	var zip = new JSZip();
	if(l !== undefined)
		//zip.file("left.bin", JSON.stringify(interleave(l, new Array())));
		zip.file("left.bin", JSON.stringify(l));
	if(r !== undefined)
		//zip.file("right.bin", JSON.stringify(interleave(r, new Array())));
		zip.file("right.bin", JSON.stringify(r));

	return zip.generate();
}

function uncompressArrays(zipData)
{
	var zip = new JSZip();
	zip.load(zipData,{base64:true}); // Here gets the files on the zip file
	var left_channel = JSON.parse(zip.file("left.bin").asText());
	var right_channel = JSON.parse(zip.file("right.bin").asText());
 	return interleave(left_channel, right_channel);
	//return left_channel;
}

/* From the Recorder.js project */
function exportWAV(bufferL, bufferR){
  var interleaved = interleave(bufferL, bufferR);
  var dataview = encodeWAV(interleaved);
  var audioBlob = new Blob([dataview], { type: "audio/wav" });

  return audioBlob;
}

function interleave(inputL, inputR){
  var length = inputL.length + inputR.length;
  //var result = new Array(length);
  var result = new Float32Array(length);

  var index = 0,
    inputIndex = 0;

  while (index < length){
    if(inputL[inputIndex] !== undefined)
	result[index++] = inputL[inputIndex];
    if(inputR[inputIndex] !== undefined)
	result[index++] = inputR[inputIndex];
    inputIndex++;
  }
  return result;
}


function floatTo16BitPCM(output, offset, input){
  for (var i = 0; i < input.length; i++, offset+=2){
    var s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
}

function writeString(view, offset, string){
  for (var i = 0; i < string.length; i++){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function encodeWAV(samples){
  var buffer = new ArrayBuffer(44 + samples.length * 2);
  var view = new DataView(buffer);

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* file length */
  view.setUint32(4, 32 + samples.length * 2, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, 2, true);
  /* sample rate */
  view.setUint32(24, 44100, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, 44100 * 4, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, 4, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, samples.length * 2, true);

  floatTo16BitPCM(view, 44, samples);

  return view;
}
