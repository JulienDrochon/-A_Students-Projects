// 3 couleurs par défaut au démarrage, avant qu'on les change
var colors =[{r: 255, g: 0, b: 0}, {r: 0, g: 255, b: 0}, {r: 0, g: 0, b: 255}];
// color 0 : red
// color 1 : green
// color 2 : blue

// au chargement de la page…
window.addEventListener("load", function(e) {
  // on déclare les variables DOM de la page HTML
  // on détermine le slider0
  var slider0 = document.getElementById("tolerance0");
  // on détermine le slider1
  var slider1 = document.getElementById("tolerance1");
  // on détermine le slider2
  var slider2 = document.getElementById("tolerance2");
  // variable DOM pour le canvas (surface de la capture video)
  var canvas  = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var webcam = document.getElementById('webcam');
  var clickedcolor = document.getElementById('pickedupcolor');

  // pour les 3 couleurs de départ (toutes celles stockées dans l'array colors[…])…
  for(var i = 0; i < colors.length;i++)
  {
    document.getElementById('color'+i).style.backgroundColor = "rgb("+colors[i].r+","+colors[i].g+","+colors[i].b+")";
    document.getElementById("number"+i+"red").value = colors[i].r;
    document.getElementById("number"+i+"green").value = colors[i].g;
    document.getElementById("number"+i+"blue").value = colors[i].b;
  }

  // fonctions pour ajuster la sensibilité des couleurs choisies
  // ajustement couleur rouge
  tracking.ColorTracker.registerColor('0', function(r, g, b) {
    return getColorDistance(colors[0], {r: r, g: g, b: b}) < slider0.value;
  });
  // ajustement couleur vert
  tracking.ColorTracker.registerColor('1', function(r, g, b) {
    return getColorDistance(colors[1], {r: r, g: g, b: b}) < slider1.value
  });
  // ajustement couleur bleu
  tracking.ColorTracker.registerColor('2', function(r, g, b) {
    return getColorDistance(colors[2], {r: r, g: g, b: b}) < slider2.value
  });

  // stockage des couleurs choisies dans le tracker
  var tracker = new tracking.ColorTracker(["0","1","2"]);

  // Affichage des rectangles autour des formes colorées
  tracker.on('track', function(trackedAreas) {
    // à chaque nouvel affichage on efface les rectancle détectés précédemment
    context.clearRect(0, 0, canvas.width, canvas.height);
    // si il y a des zones de couleur détectées…
    if (trackedAreas.data.length !== 0) {
      // pour chacune des surfaces colorées détéctées…
      trackedAreas.data.forEach(function(rect) {
        // on dessine les rectangle
        drawRect(rect, context, colors[parseInt(rect.color)], parseInt(rect.color));


          // détermination des differentes paires de couleurs
          var pairs = pairwise(trackedAreas.data);
          // si il y a des paires de couleurs détectées…
          if(pairs.length !== 0){
            // pour chacune des paires détectées…
            pairs.forEach( function(rectPair) {
              // detection collision
              if( distance(rectPair[0], rectPair[1]) < rectPair[0].width/2 + rectPair[1].width/2 ) {
                // detection collision rouge / vert
                if(rectPair[0].color == "0" && rectPair[1].color == "1") {
                  alert ("collision rouge / vert");
                }
                // detection collision rouge / bleu
                if(rectPair[0].color == "0" && rectPair[1].color == "2") {
                  alert ("collision rouge / bleu");
                }
                // detection collision vert / bleu
                if(rectPair[0].color == "1" && rectPair[1].color == "2") {
                  alert ("collision vert / bleu");
                }
              }
            }); //  fin de pairs.forEach( function(rectPair)
          }

      }); // fin de   trackedAreas.data.forEach
    }
  }); // fin de   tracker.on('track', function(trackedAreas)

  // Tracking video, taille de la capture de la fenetre video
  tracking.track( webcam, tracker,
    {
      camera: true,  mediaConstraints: {
        video: {
          width: { exact: 320 },
          height: { exact: 240 }
        },
        audio: false
      }
    }
  );



// ----------------------------------------------------------------- //
// Fonctions custom
// ----------------------------------------------------------------- //

  // fonction pour obtenir les valeurs R, G, B quand on clique sur l'image de la webcam
  webcam.addEventListener("click", function (e) {
    var c = getColorAt(webcam, e.offsetX, e.offsetY);
    clickedcolor.innerHTML = "R : " + c.r + " G : " + c.g + " B : " + c.b;
  });


  // fonction getColorAT
  function getColorAt(webcam, x, y) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = webcam.width;
    canvas.height = webcam.height;
    context.drawImage(webcam, 0, 0, webcam.width, webcam.height);

    var pixel = context.getImageData(x, y, 1, 1).data;
    return {r: pixel[0], g: pixel[1], b: pixel[2]};
  }
});

// attribuer la couleur au rectangle situé au dessus des champs de valeurs RGB, une fois qu'on a cliqué sur le bouton ok
function submitColor(index){
  colors[index]= {r: document.getElementById("number"+index+"red").value, g: document.getElementById("number"+index+"green").value, b: document.getElementById("number"+index+"blue").value};
  document.getElementById('color'+index).style.backgroundColor = "rgb("+colors[index].r+","+colors[index].g+","+colors[index].b+")";
}

// function pour ajuster la couleur avec les sliders
function getColorDistance(target, actual) {
  return Math.sqrt(
    (target.r - actual.r) * (target.r - actual.r) +
    (target.g - actual.g) * (target.g - actual.g) +
    (target.b - actual.b) * (target.b - actual.b)
  );
}

// Deesin des rectangles autour de la forme colorée
function drawRect(rect, context, kolor) {
  context.strokeStyle = "rgb("+parseInt(kolor.r)+","+parseInt(kolor.g)+","+parseInt(kolor.b)+")" ; // couleur du contour
  context.strokeWeight = "1 px"; //épaisseur du contour
  context.strokeRect(rect.x, rect.y, rect.width, rect.height);
}



// calcul distance entre 2 rectangles
function distance (objet1 , objet2) {
  var deltaX = diff(objet1.x, objet2.x);
  var deltaY = diff(objet1.y, objet2.y);
  var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  return (dist);
};
// function diff utile à la function distance
function diff (num1, num2) {
  if (num1 > num2) {
    return (num1 - num2);
  } else {
    return (num2 - num1);
  }
};

// function recuperant les differentes paires de couleurs
function pairwise(list) {
  if (list.length < 2) { return []; }
  var first = list[0],
  rest  = list.slice(1),
  pairs = rest.map(function (x) { return [first, x]; });
  return pairs.concat(pairwise(rest));
}
