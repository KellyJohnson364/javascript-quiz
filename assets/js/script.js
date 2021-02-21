
let answerEl=$('.answerIt');
let questionEl=$('.askIt');
let timerEl=$('.timerCount');
let startEl=$('.start-button');
let msgDiv=$('#msg')
let scoreBoard=$('#highScores')
var entry = { initials: 'AAA', score: 0};
localStorage.setItem('Entry', JSON.stringify(entry))
let choice=[];
let currentQuestion = 0;
let score = 0;
let timeLeft=" "
let timer
let initials
let oldScores
let newScore


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
  choices: ["pig", "dolphin", "porcupine", "camel"],
  correctAnswer: 3
},
{
  question: "Which method adds a new element to an array (at the end):?",
  choices: ["plug", "pop", "push", "pull"],
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
  if (timeLeft > 10) {
    timeLeft -=10;
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
  
  renderHighScores();

}


function displayMessage(type, message) {
  $(msgDiv).text(message);
  msgDiv.attr("class", type);

}

function renderHighScores() { 
 oldScores = localStorage.getItem("Entry");
  var scores = JSON.parse(oldScores);
  console.log(scores.score)
  if (scores.score >= score) {
    $(scoreBoard).text("High Score : " + scores.initials + ": " + scores.score + " points")
  }
  else {
    entry = { initials: initials, score: score};
    localStorage.setItem('Entry', JSON.stringify(entry))
    $(scoreBoard).text("High Score : " + entry.initials + ": " + entry.score + " points")
  

 
console.log(scores)

  }
}



