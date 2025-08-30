const video = document.getElementById("camera");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");
const gestureText = document.getElementById("gesture");

// Setup MediaPipe Hands
const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});

hands.onResults(onResults);

// Start camera using MediaPipe CameraUtils
const camera = new Camera(video, {
  onFrame: async () => {
    await hands.send({image: video});
  },
  width: 640,
  height: 480
});
camera.start();

function onResults(results) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    for (const landmarks of results.multiHandLandmarks) {
      // Draw landmarks (dots)
      drawConnectors(ctx, landmarks, HAND_CONNECTIONS,
        {color: '#0ff', lineWidth: 2});
      drawLandmarks(ctx, landmarks, {color: 'cyan', radius: 4});
    }
    gestureText.textContent = "✋ Hand detected!";
  } else {
    gestureText.textContent = "No hand detected...";
  }
}
