function mobileInit() {
  const mobileTextDiv = document.getElementById("mobile-text");
  const motionTextDiv = document.getElementById("motion-text");
  const maxSpinDiv = document.getElementById("max-spin-rate");
  function onClickFunc() {
    // feature detect
    mobileTextDiv.innerHTML = "Not Working";
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            // If we have permission, get device rotation and rotate the smiley
            window.addEventListener("deviceorientation", (event) => {
              mobileTextDiv.innerHTML =
                "Roration at: " + Math.floor(event.alpha) + "deg";
              document.getElementById("emoji").style.transform =
                "rotate(-" + event.alpha + "deg)";
            });
          }
        })
        .catch(console.error);
    } else {
      console.error("Not supported")
    }
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            // If we have permission, get device spin rate
            let maxSpinRate = 0;
            window.addEventListener("devicemotion", (e) => {
              if (Math.abs(e.rotationRate.alpha) > maxSpinRate) {
                maxSpinRate = Math.abs(e.rotationRate.alpha);
              }
              motionTextDiv.innerHTML =
                "Spinning at " +
                Math.floor(Math.abs(e.rotationRate.alpha)) +
                " Per Second";
            });
            setInterval(() => {
              maxSpinDiv.innerHTML =
                "Your max spin for the last 5 seconds: " +
                Math.floor(Math.abs(maxSpinRate));
              maxSpinRate = 0;
            }, 5000);
          }
        })
        .catch(console.error);
    } else {
      console.error("Not supported")
    }
  }
  document.getElementById("mobile-button").onclick = onClickFunc;
}
mobileInit()