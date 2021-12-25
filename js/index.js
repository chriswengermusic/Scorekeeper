let player1 = prompt("Please enter the name for Player 1", "Player 1");
let player2 = prompt("Please enter the name for Player 2", "Player 2");
const playerPointStatements = [];
function pushPlayers(){
  playerPointStatements.push("point " + player1.toLowerCase());
  document.querySelector("#P1Text").innerHTML = player1;
  playerPointStatements.push("point " + player2.toLowerCase());
  document.querySelector("#P2Text").innerHTML = player2;
  console.log(playerPointStatements);
}
pushPlayers();
let SpeechRecognition = webkitSpeechRecognition
let SpeechGrammarList = webkitSpeechGrammarList
let SpeechRecognitionEvent = webkitSpeechRecognitionEvent
let grammar = '#JSGF V1.0; grammar playerPointStatements; public <playerPointStatements> = ' + playerPointStatements.join(' | ') + ' ;'
let recognition = new SpeechRecognition();
let speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1

let score1 = 0;
let score2 = 0;
let i=0;
recognition.onresult = function(event) {
  let speech = event.results[i][0].transcript.toLowerCase();
  console.log(speech);
  if (playerPointStatements[0].includes(speech)){
    score1++;
    document.querySelector("#P1Score").innerHTML = score1;
    }
  else if (playerPointStatements[1].includes(speech)){
    score2++
    document.querySelector("#P2Score").innerHTML = score2;
  }
  else{
    console.log("Player not recognized. Please try again.")
  }
  console.log('Confidence: ' + event.results[i][0].confidence);
  i++;
}
recognition.start();


function player1Blink(){
  for (i=0; i<2; i++){
  let blink = setInterval(function(){
    document.getElementById("Player1").style.backgroundcolor = "black";
    document.getElementById("Player1").style.backgroundcolor = "red";
  }, 500);
}
}

function player2Blink(){
  for (i=0; i<2; i++){
  let blink = setInterval(function(){
    document.getElementById("Player2").style.backgroundcolor = "black";
    document.getElementById("Player2").style.backgroundcolor = "blue";
  }, 500);
}
}
