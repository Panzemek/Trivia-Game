var time = 60;
var intervalID;
var currentQuestion = 0;
var quantityRight = 0;
var quantityWrong = 0;
var question1 = {
    questionText: "Are actual trivia questions necessary here?",
    answer1: "Testing my TAs' knowledge of random subjects is an important part of the assignment.",
    answer2: "This answer is wrong.",
    answer3: "The trivia content is...trivial.",
    answer4: "Not this one though.",
    correctIs: "3",
    correctText: "The trivia content is...trivial."
}
var question2 = {
    questionText: "I could just say which button to press and it would be clearer in the end, no?",
    answer1: "No",
    answer2: "Yeah, actually, that is true.",
    answer3: "You should listen to the one above me.",
    answer4: "No, seriously.",
    correctIs: "2",
    correctText: "Yeah, actually, that is true."
}
var question3 = {
    questionText: "Soooooo...just click on 1.",
    answer1: "1",
    answer2: "It's onederful",
    answer3: "Neo",
    answer4: "Won",
    correctIs: "1",
    correctText: "Ok, we JUST went over this.  Let's try again and press 1 on the next one. Cause, you know, it's the right answer then too, spoilers."
}
var question4 = {
    questionText: "Click on 1 again.",
    answer1: "1",
    answer2: "2",
    answer3: "3",
    answer4: "4",
    correctIs: "1",
    correctText: "Now you're just being difficult. The answer is still 1."
}
var question5 = {
    questionText: "Click on 4.  You know, to keep things fresh.",
    answer1: "1",
    answer2: "2",
    answer3: "3",
    answer4: "4",
    correctIs: "4",
    correctText: "Not THAT fresh! 4 was the answer."
}
var questions = [question1, question2, question3, question4, question5];

$(".wrongAnswerWrapper").hide();
$(".rightAnswerWrapper").hide();
$(".scoreScreenWrapper").hide();
$(".triviaContentWrapper").hide();

$(".startGame").click(playTrivia);

function playTrivia() {
    $(".triviaContentWrapper").show();
    $(".startGame").hide();

    $(".questionString").html(questions[currentQuestion].questionText);
    $(".firstOption").html("1. " + questions[currentQuestion].answer1);
    $(".secondOption").html("2. " + questions[currentQuestion].answer2);
    $(".thirdOption").html("3. " + questions[currentQuestion].answer3);
    $(".fourthOption").html("4. " + questions[currentQuestion].answer4);
    time = 60;
    $(".timer").html(timeDisplayConversion(time));
    triviaCountdown();
}

$(".firstOption").click(checkAnswer);
$(".secondOption").click(checkAnswer);
$(".thirdOption").click(checkAnswer);
$(".fourthOption").click(checkAnswer);

$(".playAgain").click(reset)

function reset() {
    currentQuestion = 0;
    quantityRight = 0;
    quantityWrong = 0;
    $(".wrongAnswerWrapper").hide();
    $(".rightAnswerWrapper").hide();
    $(".scoreScreenWrapper").hide();
    $(".timer").show();
    $(".triviaContentWrapper").show();
    playTrivia();
}


function checkAnswer() {
    if ($(this).attr("value") === questions[currentQuestion].correctIs) {
        correctAnswer();
    } else {
        wrongAnswer();
    }
}

function triviaCountdown() {
    clearInterval(intervalID);
    intervalID = setInterval(showCount, 1000);
}

function wrongCountdown() {
    if (time === -1) {
        newQuestion();
    }
    $(".timer").html(timeDisplayConversion(time));
    time--;
}

function rightCountdown() {
    if (time === -1) {
        newQuestion();
    }
    $(".timer").html(timeDisplayConversion(time));
    time--;
}

function newQuestion() {
    $(".triviaContentWrapper").show();
    $(".wrongAnswerWrapper").hide();
    $(".rightAnswerWrapper").hide();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        time = 60;
        $(".timer").html(timeDisplayConversion(time));
        playTrivia();
    } else {
        scoreScreen();
    }
}

function scoreScreen() {
    clearInterval(intervalID);
    $(".triviaContentWrapper").hide();
    $(".scoreScreenWrapper").show();
    $(".timer").hide()
    $(".scoreContent").html("<h1>Correct answers: " + quantityRight + "<br />Wrong answers: " + quantityWrong);
}
function correctAnswer() {
    quantityRight++;
    time = 5;
    $(".timer").html(timeDisplayConversion(time));
    $(".triviaContentWrapper").hide();
    $(".rightAnswerWrapper").show();
    clearInterval(intervalID);
    intervalID = setInterval(rightCountdown, 1000);
}

function wrongAnswer() {
    quantityWrong++;
    time = 5;
    $(".timer").html(timeDisplayConversion(time));
    $(".triviaContentWrapper").hide();
    $(".wrongAnswerWrapper").show();
    $(".wrongContent").html("Wrong. The correct answer is: " + questions[currentQuestion].correctText);
    clearInterval(intervalID);
    intervalID = setInterval(wrongCountdown, 1000);
}

function timeUp() {
    clearInterval(intervalID);
    wrongAnswer();
}

function showCount() {
    if (time === -1) {
        timeUp();
    } else {
        $(".timer").html(timeDisplayConversion(time));
        time--;
    }
}

function timeDisplayConversion(passedTime) {
    var minutes = Math.floor(passedTime / 60);
    var seconds = passedTime - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }

    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}