function visibilityInit() {
  const video = document.querySelector("#never-gonna");

  // Set the name of the hidden property and the change event for visibility
  var hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  }
  function spawnNotification(theBody, theIcon, theTitle) {
    var options = {
      body: theBody,
      icon: theIcon,
      badge: theIcon,
      image: theIcon,
    };
    var n = new Notification(theTitle, options);
  }

  // If the page is hidden, show popup and notifiction;
  // if the page is shown, remove PIP
  function handlePIP() {
    video.requestPictureInPicture();
  }
  function handleNotify() {
    spawnNotification(
      "Did you switch tabs on Rick Astley? Don't worry, we moved him to Picture In Picture",
      "images/rick.jpg",
      "Dont Give Up"
    );
  }
  window.addEventListener("blur", handlePIP, false);

  document.addEventListener(visibilityChange, handlePIP, false);

  document.getElementById("dont-give-up").addEventListener("click", () => {
    if (typeof Notification.requestPermission === "function") {
      Notification.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            document.addEventListener(visibilityChange, handleNotify, false);
          }
        })
        .catch(console.error);
    } else {
      console.error("Not supported")
    }
  });
}

visibilityInit()