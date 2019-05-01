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
              //  alert ("collision rouge / vert");
                if(isSpeaking==false){
                  sentenceGenerator(0, 1);
                  myVoice.speak(textoutput);
                  isSpeaking = true;
                  myVoice.onEnd = function(){isSpeaking = false;};
                }
              }
              // detection collision rouge / bleu
              if(rectPair[0].color == "0" && rectPair[1].color == "2") {
              //  alert ("collision rouge / bleu");
                if(isSpeaking==false){
                  sentenceGenerator(0, 2);
                  myVoice.speak(textoutput);
                  isSpeaking = true;
                  myVoice.onEnd = function(){isSpeaking = false;};
                }
              }
              // detection collision vert / bleu
              if(rectPair[0].color == "1" && rectPair[1].color == "2") {
              //  alert ("collision vert / bleu");
                if(isSpeaking==false){
                  sentenceGenerator(1, 2);
                  myVoice.speak(textoutput);
                  isSpeaking = true;
                  myVoice.onEnd = function(){isSpeaking = false;};
                }
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

// Dessin des rectangles autour de la forme colorée
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

// ------ Speak !
//fonction pour générer phrase
var paysA = ["Le Royaume-Uni",
"Royaume-Uni",
"Thérésa May",
"anglais",
"avec un bol de porridge",
"Kète Middeultone",
"dans le métro londonien",
"en Angleterre",
"du Royaume-Uni",
"de Theresa May"];

var paysB = ["La Turquie",
"Turquie",
"Erdogan",
"turc",
"au kebab",
"Teurkiche Airlines",
"à Istanbul",
"en Turquie",
"de la Turquie",
"d'Erdogan"];

var paysC = ["Le Vatican",
"Vatican",
"Le pape François",
"catholique",
"à l'eau bénite",
"Le cardinal Sodano",
"dans la Basilique Saint-Pierre",
"au Vatican",
"du Vatican",
"du pape François",
];

 var paysloto = [ paysA, paysB, paysC ];



var textoutput;

function sentenceGenerator(country01, country02){
  //reminder :
  // 0 = "Le Pays"
  // 1 = "Pays"
  // 2 = "leaderPays"
  // 3 = "adjectifPays"
  // 4 = "objet symbolique du Pays"
  // 5 = "organisation symbolique du Pays"
  // 6 = "Le (endroit symbolique du pays)"
  // 7 = " in ( pays )"
  // 8 = " from ( pays )"
  // 9 : " of the ( president du pays )"

var phrasetype =[
  "Attentat "+paysloto[country01][6]+"."+" Le terroriste présumé est "+paysloto[country02][3]+". "+paysloto[country02][5]+" serait impliqué.",
  "Frappes aériennes "+paysloto[country01][6]+": "+paysloto[country02][0]+" contrattaque.",
  "Le sommet "+paysloto[country01][1]+"-"+paysloto[country02][1]+" aura-t-il lieu?",
  "Attaque chimique "+ paysloto[country01][4] + " " + paysloto[country02][6] + ". L'ONU condamne "+ paysloto[country01][2] + ".",
  "Les services secrets "+ paysloto[country01][3] + " suspectés de l'assassinat d'un scientifique "+ paysloto[country02][3] + ".",
  paysloto[country01][2] + " dénonce la légalisation du cannabice " + paysloto[country02][7],
  paysloto[country01][1]+"-"+paysloto[country02][1]+": une longue histoire de préjugés et de domination.",
  "Ingérence présumée " + paysloto[country01][8] + " dans l'élection " + paysloto[country02][9],
  "Entre les services secrets " + paysloto[country01][3] + " et " + paysloto[country02][3] + ", la guerre froide est de retour.",
  "Deux ex-espions " + paysloto[country01][3] + " suspectés d'avoir travaillé pour " + paysloto[country02][0] + ".",
  "Empoisonnements suspects " + paysloto[country01][6] + ". " + paysloto[country01][5] + " accuse " + paysloto[country02][0] + ".",
  Math.floor(Math.random()*38) + " morts dans une attaque au sarin " + paysloto[country01][7] + ". " + paysloto[country02][2] + " revendique l'attaque."
];

  var geopolitik = Math.floor(Math.random()*Math.floor(phrasetype.length));
  textoutput = (phrasetype[geopolitik]);
  // console.log("situation type: "+geopolitik);
  console.log(textoutput);
  lastgeopolitik = geopolitik;
}

var myVoice; // new P5.Speech object
var isSpeaking = false;

function setup()
{
  console.log(paysloto[0][0]);
  myVoice = new p5.Speech();
  myVoice.setLang('fr_FR');
}

function EndSpeech() {

}
