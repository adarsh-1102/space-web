const video = document.getElementById("camera");

// Access front camera
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" }, // front camera for mobile
      audio: false
    });
    video.srcObject = stream;
  } catch (err) {
    alert("Camera access denied or not available!");
    console.error(err);
  }
}

startCamera();
