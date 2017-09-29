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
	"playerRight":0,
	"playerWrong":0,
	"playerSkipped":0,
	"response":undefined,
	"queryURL":"",
	//flags to prevent doubling on restart
	"isRunning":false,
	"catChoosen":false,
	"difChoosen":false,
	"getQuestionsCalled":false,
	"currentQuestionCalled":false,
	"nextQuestionCalled":false,
	"checkAnswerCalled": false,
//restarts timer
	"startInt": function() {
		console.log("toggleInt has been called");
		if(!game.isRunning) {
			game.intID = setInterval(game.setTimer,1000);
			game.isRunning = true;
		}
	},
	"stopInt": function () {
			clearInterval(game.intID);
			game.isRunning = false;
	},

//Used count down interval to display time and what to do when it hits zero
	"setTimer": function() {
		game.timerCount--;
			console.log('on');
		if (game.timerCount >= 0) {
			$(".timeDisp").text(game.timerCount);
	
		} else if (game.timerCount < 0) {
			$(".timeDisp").text("0");
		}
		if (game.timerCount === 0) {
			game.skippedQuestion();
		}
	},
	

//Functions to get query, first category, then diffigulty, then the ajax request
	"choosecategory": function() {
		if(!game.catChoosen) {
			game.catChoosen = true;	
			console.log("chooseCategory has been called");
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
				$(".dispCat").html(game.categoryName);
				game.chooseDifficulty();
							
			})
		}
	},
	"chooseDifficulty": function() {
		if(!game.difChoosen) {
			game.difChoosen = true;	
			console.log("chooseDifficulty has been called");
			$(".difficultyBtn").on("click", function() {
				game.difficultyChoosen = this.id;
			//uses selection to create the url to get the questions from the api
				game.queryURL = "https://opentdb.com/api.php?amount=10&category=" + game.categoryNumber + "&difficulty=" + game.difficultyChoosen + '&type=multiple'; 
				$("#difficulty").addClass("hidden");
				$("#main").removeClass("hidden");
				game.getQuestion();
				
			})
		}
	},	
	"getQuestion": function() {
		if (!game.getQuestionsCalled) {
			game.getQuestionsCalled = true;
			console.log("getQuestion has been called");
		//Gets a random list of questions in an object and sets them to a local object
			$.ajax({
			url : game.queryURL,
			method: "GET"
			}).done(function(response) {
				game.response = response;
				console.log(game.response);
				game.getCurrentQuestion();
			})
		}
	},


//Function that changes question, questions are stored locally after ajax request
	"getCurrentQuestion" : function() {
		if(!game.currentQuestionCalled) {
			game.currentQuestionCalled = true;
			game.checkAnswerCalled = false;
			game.nextQuestionCalled = false;
			game.skippedQuestionCalled = false;
		//In order for time display to be right at the load of the page
			console.log("getCurrentQuestion has been called");
			$('.timeDisp').text('30');
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
			possible.splice(correctPlace,0,game.correctAnswer);
			$("#answer0").html(possible[0]);
			$("#answer1").html(possible[1]);
			$("#answer2").html(possible[2]);
			$("#answer3").html(possible[3]);	
			console.log("timerOn");
			game.startInt();
			game.checkAnswer();
			
		}
	},	
//Function that checks if answer is correct or not
	"checkAnswer": function() {		
		$(".answerBtn").on('click', function() {
			if (!game.checkAnswerCalled) {
				game.checkAnswerCalled = true;
				console.log("checkAnswer has been called");
				//stops timer on answer
				console.log("timerOff");
				game.stopInt();
				game.questionNumber++;
				console.log("Question Number", game.questionNumber)		
				//if answer is correct...
				if (this.id == game.correctBtn) {
					game.correctScreen();
					console.log
					game.playerRight++;
					console.log("number right", game.playerRight);
					game.update();
					console.log(game.playerRight);
				//if answer is incorrect...
				} else {
					game.incorrectScreen();
					game.playerWrong++;
					game.update();
					console.log("number wrong", game.playerWrong);
				}
				
			}
		})
	},
	//goes to next question or end screen
	"nextQuestion": function () {
		if(!game.nextQuestionCalled) {			
			game.nextQuestionCalled = true;
			game.currentQuestionCalled = false;
			console.log("nextQuestion has been called");
			//game continues if less than 10 questions have been answered
			if(game.questionNumber < 10) {			
				//resets game variables and html that display and hold questions and answers
				game.correctAnswer = undefined;
				game.correctBtn = undefined;
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
				console.log("timerOff");
				game.stopInt();
				$("#finalScreen").removeClass('hidden');
				game.update();
				game.restartCalled=false;
				game.restart();
			}
		}
	},
//updates feedback and final screen
	"update": function () {
		console.log("update has been called");
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
		if(!game.skippedQuestionCalled) {
			game.skippedQuestionCalled = true;
			console.log("skippedQuestion has been called");
			console.log("timerOff");
			game.stopInt();		
			game.rightAnswer();
			$("#main").addClass('hidden');
			$("#feedback").removeClass('hidden');
			game.playerSkipped++;
			game.questionNumber++;
			console.log("Question Number", game.questionNumber)		
			console.log("player skipped", game.playerSkipped);
			$("#correctIncorrect").text("out of time.");
			setTimeout(game.rightAnswer, 500);
			setTimeout(game.nextQuestion,4000);
		}
	},
//if answer is right, shows this
	"correctScreen": function () {
		console.log("correctScreen has been called");
		$("#main").addClass('hidden');
		$("#feedback").removeClass('hidden');
		game.rightAnswer();			
		$("#correctIncorrect").text("correct");
		setTimeout(game.nextQuestion,4000);
	},
//if answer is wrong, shows this
	"incorrectScreen": function () {
		console.log("incorrectScreen has been called");
		$("#correctIncorrect").text("incorrect.");
		$("#main").addClass('hidden');
		$("#feedback").removeClass('hidden');		
		setTimeout(game.rightAnswer, 500);
		//to prevent timer from displaying incorrectly as page loads
		setTimeout(game.nextQuestion,4000);
	},

//if reset button is pressed on end screen, resets variables
	"restart": function () {	
		$("#restart").on("click", function () {
			console.log("reset has been called");
			game.toggeInt;
			$('#category').removeClass("hidden");
			$("#finalScreen").addClass('hidden');
			$("#currentQuestion").empty();
			$("#rightAnswer").empty();
			$("#answer0").empty();
			$("#answer1").empty();
			$("#answer2").empty();
			$("#answer3").empty();
			game.isRunning = false;
			game.skippedQuestionCalled = false;
			game.catChoosen=false;
			game.difChoosen=false,
			game.getQuestionsCalled=false;
			game.currentQuestionCalled=false;
			game.restartCalled=false;
			game.nextQuestionCalled=false;
			game.checkAnswerCalled=false;
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
			game.totalTime=0;
		})
	}

}

//starts game
game.choosecategory();


