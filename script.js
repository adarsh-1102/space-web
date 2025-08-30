const video = document.getElementById("camera");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");
const gestureText = document.getElementById("gesture");

let model;

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
    alert("Camera access denied!");
    console.error(err);
  }
}

async function loadModel() {
  model = await handpose.load();
  console.log("Handpose model loaded!");
  detectHands();
}

async function detectHands() {
  const predictions = await model.estimateHands(video);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (predictions.length > 0) {
    predictions.forEach(hand => {
      const landmarks = hand.landmarks;

      // Draw keypoints
      for (let i = 0; i < landmarks.length; i++) {
        const [x, y] = landmarks[i];
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "cyan";
        ctx.fill();
      }

      // Simple gesture detection: middle finger up
      if (isMiddleFinger(hand)) {
        gestureText.textContent = "🖕 Middle Finger Detected!";
      } else {
        gestureText.textContent = "✋ Hand Detected!";
      }
    });
  } else {
    gestureText.textContent = "No hand detected...";
  }

  requestAnimationFrame(detectHands);
}

// Simple rule: middle finger tip higher than other fingers
function isMiddleFinger(hand) {
  const landmarks = hand.landmarks;
  const middleTip = landmarks[12][1];  // y of middle finger tip
  const indexTip = landmarks[8][1];
  const ringTip = landmarks[16][1];

  return middleTip < indexTip && middleTip < ringTip;
}

startCamera();
loadModel();
