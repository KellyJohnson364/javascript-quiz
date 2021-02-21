
let answerEl=$('.answerIt');
let questionEl=$('.askIt');
let timerEl=$('.timerCount');
let startEl=$('.start-button');
let msgDiv=$('#msg')
let scoreBoard=$('#highScores')
let choice=[];
let currentQuestion = 0;
let score = 0;
let timeLeft=" "
let timer
let initials




let questions = [{
  question: "Answer this question?",
  choices: ["Okay I will", "I'd rather not", "You do it", "Make me"],
  correctAnswer: 0
},
{
  question: "How about this one?",
  choices: ["Fine", "no", "yes", "off"],
  correctAnswer: 2
},
{
  question: "Answer this question?",
  choices: ["Okay I will", "I'd rather not", "You do it", "Make me"],
  correctAnswer: 0
},
{
  question: "How about this one?",
  choices: ["Fine", "no", "yes", "off"],
  correctAnswer: 2
}
]

startEl.on('click', function startQuiz() {
 
  $(this).remove();
  showQuestion();
  setTime();
})

function setTime() {
  timeLeft = 60;
  timer = setInterval(function() {
    console.log(timeLeft);
    if (timeLeft > 0) {
      $(timerEl).text(timeLeft + " seconds left.");
      timeLeft--;
    } else {
      $(timerEl).text("Time's Up!");
      over();
  }}, 1000);
  }

  function showQuestion () {
    if (currentQuestion < questions.length) {
      let asked = questions[currentQuestion].question;
      let numberChoices = questions[currentQuestion].choices.length;
    
      $(questionEl).text(asked);
    
      for (i=0; i< numberChoices; i++) {
       choice= questions[currentQuestion].choices[i];
    
       $('<li><input type="button" class="btn" id=' + i + ' value=' + choice + '></li>').appendTo(answerEl);
    
      checkAnswer();
    }}else {
      over();
  }}

function checkAnswer(){
  $(".btn").unbind('click');
  $(".btn").bind('click',function() {
    var t = $(this).attr('id');
   
    
if (t == questions[currentQuestion].correctAnswer) {
  
    ++currentQuestion;
    $("li").remove();
    score++;
    displayMessage("success", "Correct!! " + score + " points!")
    if (timeLeft >0) {
      showQuestion();
    }else {
      over();
}}else {
    displayMessage("fail", "Try again! -5 seconds")
  if (timeLeft > 5) {
    timeLeft -=5;
  }else {
    over();
}}})}



 
function over() {
  clearInterval(timer);
  $("li").remove();
  $(questionEl).remove();
  $(timerEl).remove();
  displayMessage("success", "You scored " + score + " points!")
  initials = window.prompt("Enter your initials to log your score");
  localStorage.setItem("initials", initials);
  localStorage.setItem("score", score);
  renderHighScores();

}


function displayMessage(type, message) {
  $(msgDiv).text(message);
  msgDiv.attr("class", type);

}

function renderHighScores() {
  let players = localStorage.getItem("initials");
  let scores = localStorage.getItem("score");

  $(scoreBoard).text(players + ': ' + scores + 'points.')
  
}



