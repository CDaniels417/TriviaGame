$("#start").on("click", function () {
    $("#start").remove();
    game.loadQuestion();
})

$(document).on("click", '.answer-button', function (e) {
    game.clicked(e);
})

$(document).on("click", "#reset", function () {
    game.reset();
})

var questions = [{
    question: "What is Doug's last name?",
    answers: ["funnie", "skeeter", "johnson"],
    correctAnswer: "funnie",
    image: "assets/images/doug.png",
    image2: "",
},
{
    question: "What kind of animal is Rocko (from Rocko's Modern Life)?",
    answers: ["mongoose", "dog", "wallaby"],
    correctAnswer: "wallaby",
    image: "",
    image2: "",
},
{
    question: "What do Pinky and the Brain try to do during every episode?",
    answers: ["escape their cage", "trap the house cat", "take over the world"],
    correctAnswer: "take over the world",
    image: "",
    image2: "",
},
{
    question: "In Dexter's Laboratory, what is Dexter's sister's name?",
    answers: ["deedee", "dolly", "dorothy"],
    correctAnswer: "deedee",
    image: "",
    image2: "",
},
{
    question: "On Rugrats, what were the names of the twins?",
    answers: ["jill and bill", "sally and sammy", "phil and lil"],
    correctAnswer: "phil and lil",
    image: "",
    image2: "",
},
{
    question: "In Rocket Power, what is Twister's real name?",
    answers: ["matthew", "maurice", "marvin"],
    correctAnswer: "maurice",
    image: "",
    image2: "",
},
{
    question: "Mojo Jojo is the villain from which Cartoon Network series?",
    answers: ["the powerpuff girls", "samuri jack", "johnny bravo"],
    correctAnswer: "The powerpuff girls",
    image: "",
    image2: "",
},
{
    question: "Who is the villain in the Cartoon Network series Samuri Jack?",
    answers: ["haiku", "aku", "abu"],
    correctAnswer: "aku",
    image: "",
    image2: "",
}];

var game = {
    quetions: questions,
    currentQuestion: 0,
    counter: 25,
    correct: 0,
    incorrect: 0,
    unanswered: 0,

    countdown: function () {
        game.counter--;
        $("#counter").html(game.counter);
        if (game.counter <= 0) {
            console.log("TIME UP!");
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $("#subSection").html("<h2> Time Remaining <span id='counter'>25</span> Seconds</h2>");
        $("#subSection").append("<h2>" + questions[game.currentQuestion].question + "</h2>");
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $("#subSection").append('<button class = "answer-button" id = "button- ' + i + '" data-name = "' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function () {
        game.counter = 25;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();

    },
    timeUp: function () {
        game.unanswered++;
        clearInterval(timer);
        $("#subSection").html("<h2>TIMES UP!</h2>");
        $('#subSection').append("<h3>The correct answer is: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 1000);
        } else {
            setTimeout(game.nextQuestion, 3000);
        }
    },
    results: function () {
        clearInterval(timer);
        $("#subSection").html("<h2>GAME OVER!</h2>");
        $("#subSection").append("<h3>Correct: " + game.correct + "</h3>");
        $("#subSection").append("<h3>Incorrect: " + game.incorrect + "</h3>");
        $("#subSection").append("<h3>Unanswered: " + game.unanswered + "</h3>");
        $("#subSection").append("<button id ='reset'>RESET</button>");
    },
    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
            game.correctAnswer();
        } else {
            game.incorrectAnswer();
        }
    },
    correctAnswer: function () {
        console.log("right");
        clearInterval(timer);
        game.correct++;
        $("#subSection").html("<h2>GOT IT RIGHT!!!</h2>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 1000);
            // $("#subSection").append("<img id='image' src=''/>");
        } else {
            setTimeout(game.nextQuestion, 3000);
        }

    },
    incorrectAnswer: function () {
        console.log("wrong");
        clearInterval(timer);
        game.incorrect++;
        $("#subSection").html("<h2>YOU FAILED MISERABLY!!!</h2>");
        $('#subSection').append("<h3>The correct answer is: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 1000);
            // $("#subSection").append("<img id='image' src=''/>");
        } else {
            setTimeout(game.nextQuestion, 3000);
        }
    },
    reset: function () {
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    },
}