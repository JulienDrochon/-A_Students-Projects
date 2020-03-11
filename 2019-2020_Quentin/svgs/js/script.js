var svgListe = ["svg/svg1.svg", "svg/svg2.svg", "svg/svg3.svg"];
var compteurListe = 0;
var idDuSvg = document.querySelector("#afficherSVG");

document.addEventListener("keydown", function() {
  var touche = event.key;

  if (touche == "a") {
    if (compteurListe < svgListe.length - 1) {
      compteurListe++;
    } else {
      compteurListe = 0;
    }
    idDuSvg.src = svgListe[compteurListe];
  }
});
