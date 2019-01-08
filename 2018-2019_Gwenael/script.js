// Wait for the page to be ready
var colors =[{r: 255, g: 0, b: 0}, {r: 0, g: 255, b: 0}, {r: 0, g: 0, b: 255}];


window.addEventListener("load", function(e) {

  // console.log("Page loaded!");

  // Grab reference to the tags we will be using
  var slider0 = document.getElementById("tolerance0");
  var slider1 = document.getElementById("tolerance1");
  var slider2 = document.getElementById("tolerance2");
  var canvas  = document.getElementById('canvas');

  var context = canvas.getContext('2d');
  var webcam = document.getElementById('webcam');
  var clickedcolor = document.getElementById('pickedupcolor');

  for(var i = 0; i < colors.length;i++)
  {
    document.getElementById('color'+i).style.backgroundColor = "rgb("+colors[i].r+","+colors[i].g+","+colors[i].b+")";
    document.getElementById("number"+i+"red").value = colors[i].r;
    document.getElementById("number"+i+"green").value = colors[i].g;
    document.getElementById("number"+i+"blue").value = colors[i].b;
  }



  tracking.ColorTracker.registerColor('0', function(r, g, b) {
    return getColorDistance(colors[0], {r: r, g: g, b: b}) < slider0.value;
  });
  tracking.ColorTracker.registerColor('1', function(r, g, b) {
    return getColorDistance(colors[1], {r: r, g: g, b: b}) < slider1.value
  });
  tracking.ColorTracker.registerColor('2', function(r, g, b) {
    return getColorDistance(colors[2], {r: r, g: g, b: b}) < slider2.value
  });

  var tracker = new tracking.ColorTracker(["0","1","2"]);

  // Add callback for the "track" event
  tracker.on('track', function(e) {

    context.clearRect(0, 0, canvas.width, canvas.height);
    // alert(e.data.length);
    if (e.data.length !== 0) {

      e.data.forEach(function(rect) {

        console.log(colors[parseInt(rect.color)]);
        drawRect(rect, context, colors[parseInt(rect.color)]);
        //  drawRect(rect, context, colors[1]);
        //  drawRect(rect, context, colors[2]);
      });

    }

  });

  // Start tracking
  tracking.track(
    webcam,
    tracker,
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

  webcam.addEventListener("click", function (e) {
    var c = getColorAt(webcam, e.offsetX, e.offsetY);
    clickedcolor.innerHTML = "R : " + c.r + " G : " + c.g + " B : " + c.b;
  });

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

function submitColor(index){
  colors[index]= {r: document.getElementById("number"+index+"red").value, g: document.getElementById("number"+index+"green").value, b: document.getElementById("number"+index+"blue").value};
  document.getElementById('color'+index).style.backgroundColor = "rgb("+colors[index].r+","+colors[index].g+","+colors[index].b+")";
  //  console.log(document.getElementById("number"+index+"red").value);
  //  console.log(colors[index].r);
}

function getColorDistance(target, actual) {
  return Math.sqrt(
    (target.r - actual.r) * (target.r - actual.r) +
    (target.g - actual.g) * (target.g - actual.g) +
    (target.b - actual.b) * (target.b - actual.b)
  );
}

function drawRect(rect, context, kolor) {
  // context.strokeStyle = "rgb("+ kolor.r + "," + kolor.g + "," + kolor.b ")" ;
  context.strokeStyle = "rgb("+parseInt(kolor.r)+","+parseInt(kolor.g)+","+parseInt(kolor.b)+")" ;
  context.strokeWeight = "1 px";
  context.strokeRect(rect.x, rect.y, rect.width, rect.height);
}
