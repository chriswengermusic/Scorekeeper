let SpeechRecognition = webkitSpeechRecognition
let SpeechGrammarList = webkitSpeechGrammarList
let SpeechRecognitionEvent = webkitSpeechRecognitionEvent
const playerPointStatements = ["point player one", "point player 2"];
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
  let speech = event.results[i][0].transcript;
  console.log(speech);
  if (playerPointStatements[0].includes(speech.toLowerCase())){
    score1++;
    document.querySelector("#P1Score").innerHTML = score1;
  }
  else if (playerPointStatements[1].includes(speech.toLowerCase())){
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
