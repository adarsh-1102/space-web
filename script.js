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
  minDetectionConfidence: 0.6,
  minTrackingConfidence: 0.6
});

hands.onResults(onResults);

// Start camera
const camera = new Camera(video, {
  onFrame: async () => {
    await hands.send({ image: video });
  },
  width: 640,
  height: 480
});
camera.start();

function onResults(results) {
  // Match canvas to video size
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    console.log("Hand detected!", results.multiHandLandmarks); // Debug log

    for (const landmarks of results.multiHandLandmarks) {
      // Draw connectors
      drawConnectors(ctx, landmarks, HAND_CONNECTIONS,
        { color: '#0ff', lineWidth: 2 });
      // Draw landmarks
      drawLandmarks(ctx, landmarks, { color: 'cyan', radius: 4 });
    }
    gestureText.textContent = "✋ Hand detected!";
  } else {
    gestureText.textContent = "No hand detected...";
  }
}
