let captureVideo = document.getElementById("capture")

function startRecording(stream, lengthInMS) {
  let recorder = new MediaRecorder(stream);
  recorder.start();
}

captureVideo.addEventListener("click", function() {
  navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true
  }).then(stream => {
    captureVideo.srcObject = stream;
    captureVideo.captureStream = captureVideo.captureStream || captureVideo.mozCaptureStream;
  }).then(() => startRecording(captureVideo.captureStream(), recordingTimeMS))
}, false);

