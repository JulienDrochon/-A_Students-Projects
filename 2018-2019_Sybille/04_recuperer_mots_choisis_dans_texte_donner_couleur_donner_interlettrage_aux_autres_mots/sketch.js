// on utilise les bilbiothèque jQuery, et le plugin blastjs pour pouvoir
// pour pouvoir récupérer des mots et leur assigner des class css
// avec javascript
// jquery documentation : https://api.jquery.com/category/css/
// blastjs documentation : http://velocityjs.org/blast/

// je détermine mes variables (des mots) que je souhaite identifier
let mot1 = {"drôles": true};
let mot2 = {"de": true};

// avec jquery ($), dans le paragraphe ayant l'id css 'paragrapheTexte'
$('#paragrapheTexte').each(function (i, elem) {
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
$('#paragrapheTexte:not(".mot1class"):not(".mot2class")').each(function(i) {
  $(this).css({
    color: 'rgba(66, 244, 182, 0.1)', // couleur verte, quasi transparente
    'letter-spacing': '-10px' // changer interlettrage
  })
});

// pour tous les mots ayant la class 'mot1class'…
$('#paragrapheTexte .mot1class').each(function(i) {
  $(this).css({ // j'attribue les propriétés css :
 color: 'rgba(252, 0, 54, 1)', // couleur rouge
 'letter-spacing': '3px' // changer interlettrage
})
});
// pour tous les mots ayant la class 'mot2class'…
$('#paragrapheTexte .mot2class').each(function(i) {
  $(this).css({
   color: 'rgba(78, 66, 244, 1)',
   'letter-spacing': '3px' // changer interlettrage
  })
});
