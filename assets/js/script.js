let answerEl=$('.answerIt');
let questionEl=$('.askIt');
let timerEl=$('.timerCount');
let startEl=$('.start-button');
let choice=[];
let currentQuestion = 0;
let score = 0;
let timeLeft
let timer





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
  }}, 1000);
  }

function checkAnswer(){
  $(".btn").unbind('click');
  $(".btn").bind('click',function() {
    var t = $(this).attr('id');
    console.log(t);
    
if (t == questions[currentQuestion].correctAnswer) {
  console.log("yippee")
  ++currentQuestion;
  $("li").remove();
  score++;
  showQuestion();
}else {
  console.log("uh-oh");
  timeLeft -=5;
}})}


function showQuestion () {
  let asked = questions[currentQuestion].question;
  let numberChoices = questions[currentQuestion].choices.length;
  
  $(questionEl).text(asked);
  
  for (i=0; i< numberChoices; i++) {
    choice= questions[currentQuestion].choices[i];
  
  $('<li><input type="button" class="btn" id=' + i + ' value=' + choice + '></li>').appendTo(answerEl);
  
  checkAnswer();
}}
           
function erase() {
  prevEl.remove();
}  
 










