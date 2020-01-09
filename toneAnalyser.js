var data;
var toneScore;
var toneScore2;
var inp;
var textbox;
var inputValue;
var theTone;
var theTone2;
var scoreHistory = [];
var scoreHistory2 = [];

function setup() {
  var canvas = createCanvas(594, 500);
  canvas.parent("CanvasContainer");

  getTones('Hello world, I am very sad today. Earlier on I was happy for a short time. But now I\'m sad again');


   textbox = select('#textChat');

   textbox.input(getValue);
}

function getTones(inputText) {

  let url = 'https://gateway-lon.watsonplatform.net/tone-analyzer/api';
  url += '/v3/tone?';
  url += 'version=2017-09-21&';
  url += 'text='+encodeURI(inputText);

  let authentication = 'Basic ' + btoa(unescape(encodeURIComponent('apikey:88yLY3-hZSqoYStkC-WjqoiKxfcLDJGEEnO6hhZy9Apf')));

  httpDo(
    url,
     {
       method: 'GET',
        headers: { authorization: authentication }
      },
      function(res) {

      data = JSON.parse(res);
      print(data.document_tone.tones[0].score);
      toneScore = data.document_tone.tones[0].score;

      theTone = data.document_tone.tones[0].tone_id;

      theTone2 = data.document_tone.tones[1].tone_id;

      toneScore2 = data.document_tone.tones[1].score;

    }
  );
}

function getValue() {
  getTones(textbox.value());
  print(textbox.value());
}

function draw() {
  let strColor = color(200, 200, 0);
  let strColor2 = color(200, 200, 0);

  background(0);

  fill(255);
  text('Higher confidence', 0, 10);
  text('Lower confidence', 0, 498);

  noStroke();
  fill(200, 200, 0);
  square(1, 450, 8);
  text('Joy', 15, 458);
  fill(0, 200, 200);
  square(60, 450, 8);
  text('Confident', 75, 458);
  fill(200, 0, 0);
  square(150, 450, 8);
  text('Anger', 165, 458);
  fill(0, 200, 0);
  square(220, 450, 8);
  text('Fear', 235, 458);
  fill(0, 0, 200);
  square(290, 450, 8);
  text('Sadness', 305, 458);
  fill(200, 0, 200);
  square(380, 450, 8);
  text('Analytical', 395, 458);
  fill(150, 150, 150);
  square(470, 450, 8);
  text('Tentative', 485, 458);

  if (theTone == "joy") {
    strColor = color(200, 200, 0); //yellow
  } else if (theTone == "confident") {
    strColor = color(0, 200, 200); //cyan
  } else if (theTone == "anger") {
    strColor = color(200, 0, 0); //red
  } else if (theTone == "fear") {
    strColor = color(0, 200, 0); //green
  } else if (theTone == "sadness") {
    strColor = color(0, 0, 200); //blue
  } else if (theTone == "analytical") {
    strColor = color(200, 0, 200); //pink
  } else if (theTone == "tentative") {
    strColor = color(150, 150, 150); //grey
  }

  if (theTone2 == "joy") {
    strColor2 = color(200, 200, 0); //yellow
  } else if (theTone2 == "confident") {
    strColor2 = color(0, 200, 200); //cyan
  } else if (theTone2 == "anger") {
    strColor2 = color(200, 0, 0); //red
  } else if (theTone2 == "fear") {
    strColor2 = color(0, 200, 0); //green
  } else if (theTone2 == "sadness") {
    strColor2 = color(0, 0, 200); //blue
  } else if (theTone2 == "analytical") {
    strColor2 = color(200, 0, 200); //pink
  } else if (theTone2 == "tentative") {
    strColor2 = color(150, 150, 150); //grey
  }

  scoreHistory2.push(toneScore2);
  stroke(strColor2);
  strokeWeight(2);
  noFill();
  beginShape();
  for (var i = 0; i < scoreHistory2.length; i++) {
    var y = map(scoreHistory2[i], 0, 1, height, 0);
    vertex(i, y);
  }
  endShape();
  if (scoreHistory2.length > width - 50) {
    scoreHistory2.splice(0, 1);
  }

  scoreHistory.push(toneScore);
  stroke(strColor);
  strokeWeight(2);
  noFill();
  beginShape();
  for (var i = 0; i < scoreHistory.length; i++) {
    var y = map(scoreHistory[i], 0, 1, height, 0);
    vertex(i, y);
  }
  endShape();
  if (scoreHistory.length > width - 50) {
    scoreHistory.splice(0, 1);
  }

  stroke(255);
  strokeWeight(1);
  text('100%', scoreHistory.length - 35, 10);
  text('75%', scoreHistory.length - 30, 125);
  text('50%', scoreHistory.length - 30, 250);
  text('25%', scoreHistory.length - 30, 377);
  text('0%', scoreHistory.length - 22, 498);
  line(scoreHistory.length, 0, scoreHistory.length, height);
}
