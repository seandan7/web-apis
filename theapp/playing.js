function videoInit() {
  const video = document.querySelector("#never-gonna");

  video.addEventListener("playing", (event) => {
    document.getElementById("emoji").src = "images/happy.jpg";
  });

  video.addEventListener("pause", (event) => {
    document.getElementById("emoji").src = "images/sad.jpg";
  });
}

videoInit();
