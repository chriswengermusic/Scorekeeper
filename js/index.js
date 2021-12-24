let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
let SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
let SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
const playerPointStatements = ["Point to Player One", "Point to Player Two"];
let grammar = '#JSGF V1.0; grammar playerPointStatements; public <playerPointStatements> = ' + playerPointStatements.join(' | ') + ' ;'
let recognition = new SpeechRecognition();
let speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1

let player1Score = document.querySelector("#P1Score");
let player2Score = document.querySelector("P2Score");
recognition.onresult = function(event) {
  let playerIncrement = event.results[0][0].transcript;
  if (playerIncrement == playerPointStatements[0]){
    player1Score++;
  } else{
    player2Score++;
  }
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.start();
