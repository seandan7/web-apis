/** Battery */

navigator.getBattery().then(function (battery) {

  battery.addEventListener("levelchange", function () {
    updateLevelInfo();
  });
  function updateLevelInfo() {
    alert(`Your battery just dropped to ${battery.level * 100} Percent!\n If you're battery dies, youll give up on Rick Astley!`)
  }

});
