var game = {
	//trivia categories from API
	"triviaCategories": {
		"general": {
			"number": 9,
			"name": "General Knowledge",
		},
		"entBook":{
			"number": 10,
			"name": "Books",
		},
		"entFilm":{
			"number": 11,
			"name": "Film",
		},
		"entMusic":{
			"number": 12,
			"name": "Music",
		},
		"entTV": {
			"number": 14,
			"name": "Television",
		},
		"entVG":{
			"number": 15,
			"name": "Video Games",
		},
		"entBG":{
			"number": 16,
			"name": "Board Games",
		},
		"sciNat":{
			"number": 17,
			"name": "Nature",
		},
		"sciCom":{
			"number": 18,
			"name": "Computers",
		},
		"sciMath":{
			"number": 19,
			"name": "Mathematics",
		},
		"myth":{
			"number": 20,
			"name": "Mythology",
		},
		"sport":{
			"number": 21,
			"name": "Sports",
		},
		"geo":{
			"number": 22,
			"name": "Geography",
		},
		"his":{
			"number": 23,
			"name": "History",
		},
		"pol":{
			"number": 24,
			"name": "Politics",
		},
		"cel":{
			"number": 26,
			"name": "Celebrities",
		},
		"ani":{
			"number": 27,
			"name": "Animals",
		},
		"veh":{
			"number": 28,
			"name": "Vehicles",
		},
		"entCB":{
			"number": 29,
			"name": "Comics",
		},
		"jAM":{
			"number": 31,
			"name": "Japanese Anime & Manga",
		},
		"carAni":{
			"number": 32,
			"name": "Cartoon & Animations",
		},
	},
	//variables used throughout game
	"stop":false,
	"intID": undefined,
	"difficultyChoosen": undefined,
	"categoryChoosen": undefined,
	"categoryNumber": undefined,
	"categoryName": undefined,
	"correctAnswer": undefined,
	"queryURL": undefined,
	"currentQuestion": undefined,
	"correctBtn": undefined,
	"timerCount":30,
	//tracks game progress and number of wins
	"questionNumber": 0,
	"winCounter":0,
	"playerRight":0,
	"playerWrong":0,
	"playerSkipped":0,
	"response":undefined,
	"queryURL":"",
//restarts timer
	"startInt": function() {
		game.intID = setInterval(game.setTimer,1000);
	},
//Stops timer
	"stopInt": function () {
		clearInterval(game.intID);
	},

//Used count down interval to display time and what to do when it hits zero
	"setTimer": function() {
		game.timerCount--;
		if (game.timerCount >= 0 && !game.stop) {
			$("#timeDisp").text(game.timerCount);
			$("#timeDisp2").text(game.timerCount);
			$("#timeDisp3").text(game.timerCount);
		} else if (game.timerCount < 0) {
			$("#timeDisp").text("0");
			$("#timeDisp2").text("0");
			$("#timeDisp3").text("0");
		} else {
			$("#timeDisp").text(game.finalTime);
			$("#timeDisp2").text(game.finalTime);
			$("#timeDisp3").text(game.finalTime);
		}
		if (game.timerCount === 0) {
			game.skippedQuestion();
		}
	},

//Functions to get query, first category, then diffigulty, then the ajax request
	"choosecategory": function() {
		$(".categoryBtn").on("click", function() {
			game.categoryChoosen = this.id;
			game.categoryName = game.triviaCategories[game.categoryChoosen].name;
			game.categoryNumber = game.triviaCategories[game.categoryChoosen].number;
			$("#category").addClass("hidden");
			$("#difficulty").removeClass("hidden");
			if(game.categoryChoosen == "entBG") {
				$("#hard").addClass("hidden");
				$("#medium").addClass("hidden");
			} else if (game.categoryChoosen == "myth" || game.categoryChoosen == "sport" || game.categoryChoosen == "carAni") {
				$("#hard").addClass("hidden");
			} else if (game.categoryChoosen == "ani") {
				$("#easy").addClass("hidden");
			} else if (game.categoryChoosen == "sciMath" || game.categoryChoosen == "pol" || game.categoryChoosen == "cel"   || game.categoryChoosen == "entCB") {
				$("#hard").addClass("hidden");
				$("#easy").addClass("hidden");
			}
			console.log(game.categoryChoosen);
			console.log(game.categoryName);
			$(".dispCat").html(game.categoryName);
			game.chooseDifficulty();
			
		})
	},
	"chooseDifficulty": function() {
		$(".difficultyBtn").on("click", function() {
			game.difficultyChoosen = this.id;
			// $(".dispCat").html(game.categoryName);
			console.log(this);
			console.log(game.categoryNumber, game.categoryName, game.categoryChoosen);
			game.queryURL = "https://opentdb.com/api.php?amount=10&category=" + game.categoryNumber + "&difficulty=" + game.difficultyChoosen + '&type=multiple'; 
			console.log(game.queryURL);
			$("#difficulty").addClass("hidden");
			$("#main").removeClass("hidden");
			game.getQuestion();
		})
	},	
	"getQuestion": function() {
	//Gets a random list of questions in an object and sets them to a local object
		$.ajax({
		url : game.queryURL,
		method: "GET"
		}).done(function(response) {
			game.response = response;
			console.log(game.response);
			game.getCurrentQuestion();
		})

	},

//Function that changes question, questions are stored locally after ajax request
	"getCurrentQuestion" : function() {
	//to prevent timer from displaying incorrectly as page loads
		$("#timeDisp").text("30");
		$("#currentQuestion").html(game.response.results[game.questionNumber].question);
		//array of possible incorrect answer, then adds correct answer at a random place
		var possible = [game.response.results[game.questionNumber].incorrect_answers[0],game.response.results[game.questionNumber].incorrect_answers[1],game.response.results[game.questionNumber].incorrect_answers[2],"place holder"];			
		var correctPlace = Math.floor(Math.random()*4);
		game.correctAnswer= game.response.results[game.questionNumber].correct_answer;
		if (correctPlace=0) {
			game.correctBtn = "button0";
		} else if (correctPlace = 1) {
			game.correctBtn = "button1"
		} else if (correctPlace = 2) {
			game.correctBtn = "button2";
		} else {
			game.correctBtn = "button3";
		}
		console.log(game.response.results[game.questionNumber].correct_answer);
		possible.splice(correctPlace,0,game.correctAnswer);
		console.log(possible);
		$("#answer0").html(possible[0]);
		$("#answer1").html(possible[1]);
		$("#answer2").html(possible[2]);
		$("#answer3").html(possible[3]);	
		game.startInt();
		game.questionNumber++;	
	},	

//Function that checks if answer is correct or not
	"checkAnswer": function() {
		$(".answerBtn").on('click', function() {
		//stops timer on answer
			game.stopInt();
		//allows time when question is answered to be displayed as timer is reset
			game.finalTime= game.timerCount;
			game.setTimer();
			game.timerCount = 30;
		//if answer is correct...
			if (this.id == game.correctBtn) {
				game.correctScreen();
				game.playerRight++;
				game.update();
				console.log(game.playerRight);
		//if answer is incorrect...
			} else {
				game.incorrectScreen();
				game.playerWrong++;
				game.update();
				console.log(game.playerWrong);
			}
		})
	},
//updates feedback and final screen
	"update": function () {
		$(".numberRight").text(game.playerRight);
		$('.numberWrong').text(game.playerWrong);
		$('.numberSkipped').text(game.playerSkipped);
	},
//displays right answer
	"rightAnswer": function () {
		$("#rightAnswer").html(game.correctAnswer);
	},
//if timer runs out on a question	
	"skippedQuestion": function() {
		game.rightAnswer();
		$("#main").addClass('hidden');
		$("#feedback").removeClass('hidden');
		game.playerSkipped++;
		$("#correctIncorrect").text("out of time.");
		setTimeout(game.nextQuestion,3500);
	},
//if answer is right, shows this
	"correctScreen": function () {
		$("#main").addClass('hidden');
		$("#feedback").removeClass('hidden');
		game.rightAnswer();			
		$("#correctIncorrect").text("correct");
		setTimeout(game.nextQuestion,3500);
	},
//if answer is wrong, shows this
	"incorrectScreen": function () {
		$("#correctIncorrect").text("incorrect.");
		$("#main").addClass('hidden');
		$("#feedback").removeClass('hidden');		
		console.log(game.playerWrong, game.questionNumber)
		setTimeout(game.rightAnswer, 500);
		setTimeout(game.nextQuestion,2500);
	},
//goes to next question or end screen
	"nextQuestion": function () {
	//game continues if less than 10 questions have been answered
		if(game.questionNumber < 10) {			
		//resets game variables and html that display and hold questions and answers
			game.correctAnswer = undefined;
			game.correctBtn = undefined;
			game.stop=false;
			$("#rightAnswer").empty();
			$("#currentQuestion").empty();
			$("#answer0").empty();
			$("#answer1").empty();
			$("#answer2").empty();
			$("#answer3").empty();
			game.getCurrentQuestion();
			$("#main").removeClass('hidden');
			$("#feedback").addClass('hidden');
			game.timerCount = 30;
		} else {
			$("#feedback").addClass('hidden');
			clearInterval(game.intID);
			$("#finalScreen").removeClass('hidden');
			game.update();
		}
	},
//if reset button is pressed on end screen, resets variables
	"reset": function () {	
		$("#restart").on("click", function () {
			$('#category').removeClass("hidden");
			$("#finalScreen").addClass('hidden');
			$("#currentQuestion").empty();
			$("#rightAnswer").empty();
			$("#answer0").empty();
			$("#answer1").empty();
			$("#answer2").empty();
			$("#answer3").empty();
			game.stop =false;
			game.difficultyChoosen = undefined;
			game.categoryChoosen = undefined;
			game.categoryNumber= undefined;
			game.categoryName = undefined;
			game.currentQuestion = undefined;
			game.correctAnswer = undefined;
			game.queryURL = undefined;
			game.correctBtn = undefined;
			game.timerCount = 30,
			game.questionNumber = 0;
			game.winCounter =0;
			game.playerRight =0;
			game.playerWrong= 0;
			game.playerSkipped= 0;
		})
	},
}

//starts game
game.choosecategory();
game.checkAnswer();
game.reset();

