var variableSon = document.querySelector("#monFichierAudio");

document.addEventListener("keydown", function() {
  var touche = event.key;

  if (touche === "a") {
    if (variableSon.paused) {
      variableSon.play();
    } else {
      variableSon.pause();
    }
  }
});
