const video = document.getElementById("camera");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");
const gestureText = document.getElementById("gesture");

let model;

// Start camera
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: 640, height: 480 },
      audio: false
    });
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };
  } catch (err) {
    alert("Camera access denied or not available!");
    console.error(err);
  }
}

// Load TensorFlow Handpose model
async function loadModel() {
  model = await handpose.load();
  console.log("✅ Handpose model loaded!");
  detectHands();
}

// Detect hands & draw
async function detectHands() {
  const predictions = await model.estimateHands(video);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (predictions.length > 0) {
    predictions.forEach(hand => {
      const landmarks = hand.landmarks;

      // Draw joints (dots)
      for (let i = 0; i < landmarks.length; i++) {
        const [x, y] = landmarks[i];
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "cyan";
        ctx.fill();
      }
    });

    gestureText.textContent = "✋ Hand detected!";
  } else {
    gestureText.textContent = "No hand detected...";
  }

  requestAnimationFrame(detectHands);
}

startCamera();
loadModel();
