//Declaring Variables
let answerEl=$('.answerIt');
let questionEl=$('.askIt');
let timerEl=$('.timerCount');
let startEl=$('.start-button');
let msgDiv=$('#msg');
let scoreBoard=$('#highScores');
let playAgain=$('#reset');
let choice=[];
let currentQuestion = 0;
let score = 0;
let timeLeft=" "
let timer
let initials
let oldScores
let newScore

// Quiz questions
let questions = [{
  question: "What language is used to style the page?",
  choices: ["HTML", "English", "CSS", "C++"],
  correctAnswer: 2
},
{
  question: "Which language is the most functional?",
  choices: ["Javascript", "Html", "CSS", "Bootstrap"],
  correctAnswer: 0
},
{
  question: "What does DOM stand for?",
  choices: ["Digital_Ordered_Monitoring", "Document_Object_Model", "Document_Ordered_Mainainance", "Dominique"],
  correctAnswer: 1
},
{
  question: "Fixed variables are also known as what?",
  choices: ["strict_variables", "figuratives", "literals", "plausibles"],
  correctAnswer: 2
},
{
  question: "The naming convention popular with Javascript programmers is named after what animal?",
  choices: ["Pig", "Dolphin", "Porcupine", "Camel"],
  correctAnswer: 3
},
{
  question: "Which method adds a new element to an array (at the end):?",
  choices: ["plug", "pop", "push", "pull"],
  correctAnswer: 2
}
]
//Start Button calls first question and starts timer.  Start timer is removed once clicked
startEl.on('click', function startQuiz() {
 
  $(this).remove();
  showQuestion();
  setTime();
})
// Timer is started at 60 seconds and displays seconds left until time is up
function setTime() {
  timeLeft = 60;
  timer = setInterval(function() {
    if (timeLeft > 0) {
      $(timerEl).text(timeLeft + " seconds left.");
      timeLeft--;
    } else {
      $(timerEl).text("Time's Up!");
      over();
  }}, 1000);
  }
// Questions are presented one by one in order of their index number in questions array
  function showQuestion () {
    if (currentQuestion < questions.length) {
      let asked = questions[currentQuestion].question;
      let numberChoices = questions[currentQuestion].choices.length;
    
      $(questionEl).text(asked);

// Answer buttons are generated for each answer choice in the questions array

      for (i=0; i< numberChoices; i++) {
       choice= questions[currentQuestion].choices[i];
       $('<li><input type="button" class="btn" id=' + i + ' value=' + choice + '></li>').appendTo(answerEl);
      checkAnswer();
  }}else {
      over();
  }}
// Answers are checked by comparing the index of the answered question assigned as id of button)and the index of the correct choice
function checkAnswer(){
// button had to be unbound to prevent multiple firing  
  $(".btn").unbind('click');
  $(".btn").bind('click',function() {
    var t = $(this).attr('id');
// If indexed match, the current question advances if time allows and the score goes up,      
if (t == questions[currentQuestion].correctAnswer) {
    ++currentQuestion;
    $("li").remove();
    score++;
    displayMessage("success", "Correct!! " + score + " points!")
    if (timeLeft >0) {
      showQuestion();
    }else {
      over();

 // If indexes don't match, 10 seconds is removed from timer and user gets to try until correct button is clicked     
}}else {
    displayMessage("fail", "Try again! -10 seconds")
  if (timeLeft > 10) {
    timeLeft -=10;
  }else {
    over();
}}})}

//  Over function is called if time runs out or all questions have been answered correctly 
// Prompt collects user initials.  If score is higher than previous score, they are diplayed
function over() {
  clearInterval(timer);
  $("li").remove();
  $(questionEl).remove();
  $(timerEl).remove();
  displayMessage("success", "You scored " + score + " points!")
  initials = window.prompt("Enter your initials to log your score");
  renderHighScores();
  newButton();
}

// Display message displays message with attributes and text depending of message type and class
function displayMessage(type, message) {
  $(msgDiv).text(message);
  msgDiv.attr("class", type);
}

// determines Highscore by getting previous highscore from local storage if available
function renderHighScores() { 
  oldScores = localStorage.getItem("Entry");
  var scores = JSON.parse(oldScores);

  if (!scores) {
    let  entry = { initials: initials, score: score};
    localStorage.setItem('Entry', JSON.stringify(entry))
    $(scoreBoard).text("High Score : " + entry.initials + ": " + entry.score + " points");
  }else {
    if (scores.score >= score) {
      $(scoreBoard).text("High Score : " + scores.initials + ": " + scores.score + " points");
    }else {
      entry = { initials: initials, score: score};
      localStorage.setItem('Entry', JSON.stringify(entry))
      $(scoreBoard).text("High Score : " + entry.initials + ": " + entry.score + " points");
  }}}

  // Play again button is made and event handler and style attributes established
 function newButton() {

    var replay = $('<button>Play Again</button>').appendTo(playAgain);
    $(replay).attr('style', 'margin: 50px');
    $(replay).click(function () {
      location.reload();

})}
