// on utilise les bilbiothèque jQuery, et le plugin blastjs pour pouvoir
// pour pouvoir récupérer des mots et leur assigner des class css
// avec javascript
// jquery documentation : https://api.jquery.com/category/css/
// blastjs documentation : http://velocityjs.org/blast/
// on utilise p5js + p5js serial port + p5serial control pour faire communiquer
// arduino et navigateur web

let serialPort;
let portName = 'dev/cu.usbmodem***'; // variable pour identifier le port série de la carte arduino
let dataFromArduino; // variable pour les données arrivant d'arduino

function setup(){ // function setup pour p5js

  serialPort = new p5.SerialPort();    // nouvelle instance du port serie
  serialPort.list();
  serialPort.on('data', ArduinoEvent);  // callback quand de nouvelles données arrivent d'arduino, la function ArduinoEvent() s'execute
  serialPort.open(portName);           // ouvrir le port serie
}

function ArduinoEvent() {
  dataFromArduino = Number(serialPort.readLine()); // on lit les données arrivant d'arduino et on attribue la valeur à la variable dataFromArduino
  //on transforme la plage de valeur de dataFromArduino
  let transformeValeur = map(dataFromArduino, 0, 1000, -10, 20);
  //pour qu'elle corresponde à celle de la transformation du texte
  if(dataFromArduino >0){
    $('#paragrapheTexteMots:not(".mot1class"):not(".mot2class")').each(function(i) {
      $(this).css({
        'letter-spacing': transformeValeur+"px", // interlettrage
        'font-size': parseInt(transformeValeur)+"px", // corps de caractere
        'line-height': parseInt(transformeValeur)+"px", // interlignage

      })
    });
  }
}

// je détermine mes variables (des mots) que je souhaite identifier
let mot1 = {"drôles": true};
let mot2 = {"de": true};

// avec jquery ($), dans le paragraphe ayant l'id css 'paragrapheTexteMotsChoisis'
$('#paragrapheTexteMotsChoisis').each(function (i, elem) {
  // on déclare des variables
  var self = $(elem),
  textNodes = self.text().split(' '), // éclate le texte en considérant le séparateur espace (' ')
  i = 0;


  for (i = 0; i < textNodes.length; i += 1) {
    if (mot1[textNodes[i]]) { // à chaque fois que la variable mot1 est détectée dans le texte
      textNodes[i] = '<span class="mot1class">' + textNodes[i] + '</span>'; // je l'entoure de '<span class="mot1class">' + '</span>'
    }
    if (mot2[textNodes[i]]) { // à chaque fois que la variable mot2 est détectée dans le texte
      textNodes[i] = '<span class="mot2class">' + textNodes[i] + '</span>'; // je l'entoure de '<span class="mot2class">' + '</span>'
    }
  }
  self.html(textNodes.join(' ')); // je réassemble les mots en les séparant d'une espace (' ')
});

// avec jquery ($), dans le paragraphe ayant l'id css '#paragrapheTexteMots'
$('#paragrapheTexteMots').each(function (i, elem) {
  // on déclare des variables
  var self = $(elem),
  textNodes = self.text().split(' '), // éclate le texte en considérant le séparateur espace (' ')
  i = 0;


  for (i = 0; i < textNodes.length; i += 1) {
    if (mot1[textNodes[i]]) { // à chaque fois que la variable mot1 est détectée dans le texte
      textNodes[i] = '<span class="mot1class">' + textNodes[i] + '</span>'; // je l'entoure de '<span class="mot1class">' + '</span>'
    }
    if (mot2[textNodes[i]]) { // à chaque fois que la variable mot2 est détectée dans le texte
      textNodes[i] = '<span class="mot2class">' + textNodes[i] + '</span>'; // je l'entoure de '<span class="mot2class">' + '</span>'
    }
  }
  self.html(textNodes.join(' ')); // je réassemble les mots en les séparant d'une espace (' ')
});

// avec jquery ($)
// pour tous les mots n'ayant ni la class 'mot1class' ou 'mot2class'…
$('#paragrapheTexteMotsChoisis:not(".mot1class"):not(".mot2class")').each(function(i) {
  $(this).css({
    color: 'rgba(0, 0, 0, 0)', // couleur transparente
  })
});

// pour tous les mots ayant la class 'mot1class'…
$('#paragrapheTexteMotsChoisis .mot1class').each(function(i) {
  $(this).css({ // j'attribue les propriétés css :
  color: 'rgba(252, 0, 54, 1)' // couleur rouge, opaque
})
});
// pour tous les mots ayant la class 'mot2class'…
$('#paragrapheTexteMotsChoisis .mot2class').each(function(i) {
  $(this).css({
    color: 'rgba(78, 66, 244, 1)' // bleu, opaque
  })
});


// pour tous les mots ayant la class 'mot1class'…
$('#paragrapheTexteMots .mot1class').each(function(i) {
  $(this).css({ // j'attribue les propriétés css :
  color: 'rgba(0,0, 0, 0)', // couleur transparente
  'letter-spacing' : '0px'
})
});

// pour tous les mots ayant la class 'mot2class'…
$('#paragrapheTexteMots .mot2class').each(function(i) {
  $(this).css({
    color: 'rgba(0, 0, 0, 0)', // couleur transparente
    'letter-spacing' : '0px'
  })
});
