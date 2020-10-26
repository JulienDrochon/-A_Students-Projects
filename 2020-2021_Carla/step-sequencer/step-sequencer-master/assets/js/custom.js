document.querySelector("#downloadFile").addEventListener("click", function () {
  this.style.display = "none";
});
document.querySelector("#save").addEventListener("click", function () {
  let steps = document.querySelectorAll(".step");
  let measures = document.querySelectorAll(".measure");
  let patterns = document.querySelectorAll(".pattern");

  let storeStepSequence = [];
  for (var i = 0; i < steps.length; i++) {
    if (steps[i].classList.contains("on")) {
      storeStepSequence[i] = 1;
    } else {
      storeStepSequence[i] = 0;
    }
  }
  storeStepSequence =
    '{"BPM" : ' +
    document.querySelector("input.tempo").value +
    ', "timeSignature" : [' +
    document.querySelectorAll("input.time-sig")[0].value +
    ", " +
    document.querySelectorAll("input.time-sig")[1].value +
    '], "tracks" : ' +
    patterns.length +
    ', "measures" : ' +
    measures.length / patterns.length +
    ', "steps":[' +
    storeStepSequence +
    "]}";
  var link = document.getElementById("downloadFile");
  link.href = generateTxtFile(storeStepSequence);
  link.style.display = "inline-block";
  generateTxtFile();
});

function generateTxtFile(text) {
  var textFile = null;
  var data = new Blob([text], { type: "text/plain" });
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }
  textFile = window.URL.createObjectURL(data);
  return textFile;
}

function loadFile() {
  var client = new XMLHttpRequest();
  client.open("GET", "save.json");
  client.onreadystatechange = function () {
    alert(client.responseText);
  };
  client.send();
}

function readerHandler(e2) {
  loadPreset(e2.target.result);
}

function readfile(e1) {
  var fileobj = e1.target.files[0];
  var fr = new FileReader();
  fr.onload = readerHandler;
  fr.readAsText(fileobj);
}

window.onload = function () {
  var x = document.getElementById("input");
  x.addEventListener("change", readfile, false);
  readTextFile("save.json");
};

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        loadPreset(allText);
      }
    }
  };
  rawFile.send(null);
}

function loadPreset(myObj) {
  var obj = JSON.parse(myObj);

  $("input.tempo").val(obj.BPM).change();
  $("input.measures").val(obj.measures).change();
  $('input[title="Time signature top number"]')
    .val(obj.timeSignature[0])
    .change();
  $('input[title="Time signature bottom number"]')
    .val(obj.timeSignature[1])
    .change();

  let steps = document.querySelectorAll(".step");

  for (var i = 0; i < steps.length; i++) {
    if (obj.steps[i] == 1) {
      steps[i].classList.add("on");
    }
  }
  $(document).trigger("addStep");
}
