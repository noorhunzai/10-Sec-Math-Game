$(document).ready(function () {
  var currentQuestion;
  var timeLeft = 10;
  var interval;
  var score = 0;
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(5);
    var num2 = randomNumberGenerator(5);
    var num3 = randomNumberGenerator(10);

    question.answer = num1 * num2 + num3;
    question.equation =
      String(num1) + " * " + String(num2) + " + " + String(num3);

    return question;
  };

  currentQuestion = questionGenerator();
  $("#equation").text(currentQuestion.equation);

  $("#user-input").on("keyup", function () {
    console.log($(this).val());
  });

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $("#user-input").val("");
    }
  };

  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $("#equation").text(currentQuestion.equation);
  };

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }
  };

  $("#user-input").on("keyup", function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  renderNewQuestion();
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $("#time-left").text(timeLeft);
  };

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $("#user-input").val("");
      updateTimeLeft(+1);
    }
  };
  var updateScore = function (amount) {
    score += amount;
    $("#score").text(score);
  };

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $("#user-input").val("");
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };
});
