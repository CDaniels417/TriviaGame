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
    image1: "assets/images/doug.gif",
    image2: "assets/images/doug2.jpg",
},
{
    question: "What kind of animal is Rocko (from Rocko's Modern Life)?",
    answers: ["mongoose", "dog", "wallaby"],
    correctAnswer: "wallaby",
    image1: "assets/images/rocko.png",
    image2: "assets/images/rocko2.jpg",
},
{
    question: "What do Pinky and the Brain try to do during every episode?",
    answers: ["escape their cage", "trap the house cat", "take over the world"],
    correctAnswer: "take over the world",
    image1: "assets/images/pinky-and-brain.png",
    image2: "assets/images/pinky-and-brain2.jpg",
},
{
    question: "In Dexter's Laboratory, what is Dexter's sister's name?",
    answers: ["deedee", "dolly", "dorothy"],
    correctAnswer: "deedee",
    image1: "assets/images/deedee.png",
    image2: "assets/images/dexter.png",
},
{
    question: "On Rugrats, what were the names of the twins?",
    answers: ["jill and bill", "sally and sammy", "phil and lil"],
    correctAnswer: "phil and lil",
    image1: "assets/images/phil-and-lil.png",
    image2: "assets/images/phil-and-lil2.jpg",
},
{
    question: "In Rocket Power, what is Twister's real name?",
    answers: ["matthew", "maurice", "marvin"],
    correctAnswer: "maurice",
    image1: "assets/images/twister.png",
    image2: "assets/images/twister2.jpg",
},
{
    question: "Mojo Jojo is the villain from which Cartoon Network series?",
    answers: ["the powerpuff girls", "samuri jack", "johnny bravo"],
    correctAnswer: "the powerpuff girls",
    image1: "assets/images/powerpuff-girls.png",
    image2: "assets/images/powerpuff-girls2.png",
},
{
    question: "Who is the villain in the Cartoon Network series Samuri Jack?",
    answers: ["haiku", "aku", "abu"],
    correctAnswer: "aku",
    image1: "assets/images/aku.jpg",
    image2: "assets/images/aku2.jpg",
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
        $("#subSection").css("opacity", "0.9")

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
        var gif = $("<img>");
        if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
            game.correctAnswer();
            $("#subSection").append(gif.attr('src', questions[game.currentQuestion].image1));
        } else {
            game.incorrectAnswer();
            $("#subSection").append(gif.attr('src', questions[game.currentQuestion].image2));
            
        }
        $("#subSection").css("opacity", "1")
    },
    correctAnswer: function () {
        clearInterval(timer);
        game.correct++;
        $("#subSection").html("<h2>GOT IT RIGHT!!!</h2>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 1000);
        } else {
            setTimeout(game.nextQuestion, 3000);
        }

    },
    incorrectAnswer: function () {
        clearInterval(timer);
        game.incorrect++;
        $("#subSection").html("<h2>YOU FAILED MISERABLY!!!</h2>");
        $('#subSection').append("<h3>The correct answer is: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 1000);
        } else {
            setTimeout(game.nextQuestion, 3000);
        }
    },
    reset: function () {
        game.currentQuestion = 0;
        game.counter = 25;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
        $("#subSection").css("opacity", "0.9");
    },
}