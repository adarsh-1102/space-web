const video = document.getElementById("camera");

async function startCamera() {
  try {
    const constraints = {
      video: {
        facingMode: "user",  // front cam on mobile
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;

  } catch (err) {
    console.error("Camera error:", err);
    alert("Camera not accessible. Please allow camera permission!");
  }
}

startCamera();
