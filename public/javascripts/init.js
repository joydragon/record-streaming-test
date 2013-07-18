/* I might not need this */
jQuery(document).ready(function(){
  
  window.URL = window.URL || window.webkitURL;
  navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia || navigator.msGetUserMedia;
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  
});

// Connect to the Node.js Server
io = io.connect('/');

// console log a message and the events data
io.on('connect', function (data) {
  console.log( 'socket: ', data );
});

io.on('error', function (error)
{
  console.log('Error: '+error.error);
});
