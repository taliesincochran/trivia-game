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
	"catNameArray": [],
	"difficultyArray": ["easy","medium","hard"],
	"buttonArray":["button0","button1","button2","button3"],
	"feedbackArray":[
		{ 
			'text':"You are ",
			'spanID': "<span id='correctIncorrect' class='gameText'></span>"			
		},
		{
			'text':"The right answer was ",
			"spanID":"<span id='rightAnswer' class='gameText'></span>"
		},
		{
			'text':'Right Answers ',
			"spanID":'<span class="numberRight">0</span>'
		},
		{
			'text':"Wrong Answers ",
			"spanID":'<span class="numberWrong">0</span>'
		},
		{
			'text':"Unanswered ",
			"spanID":'<span class="numberSkipped">0</span>'
		},
	],
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
//restarts timer
	"startInt": function() {
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
		if (game.timerCount >= 0) {
			$(".timeDisp").text(game.timerCount);
	
		} else if (game.timerCount < 0) {
			$(".timeDisp").text("0");
		}
		if (game.timerCount === 0) {
			game.skippedQuestion();
		}
	},
	//if timer runs out on a question	
	"skippedQuestion": function() {
		game.stopInt();	
		game.feedbackDisp();
		game.update();	
		setTimeout(game.rightAnswer, 500);		
		game.playerSkipped++;
		game.questionNumber++;
		$("#correctIncorrect").text("out of time.");
		setTimeout(game.rightAnswer, 500);
		setTimeout(game.nextQuestion,4000);
	},
//initial function to start game and make the category buttons
	"initial": function () {
		game.catNameArray = Object.getOwnPropertyNames(game.triviaCategories);
		var h = $("<h1  class='triviaHeader'>")
			.text("Trivia Game")
			.appendTo("#mainArea");	
		var ch =$("<h1 class='gameText'>")
			.text("Choose your category")
			.appendTo("#mainArea");
		for (var i = 0; i < game.catNameArray.length; i++) {
			var c = $('<button class="categoryBtn">')
				.attr("id", game.catNameArray[i])
				.appendTo("#mainArea");
		}
		game.choosecategory();
	},
// Function to put event handler on category buttons, 
// once one is choosen it removes them 
// and it makes the difficulty buttons for the choosen category
	"choosecategory": function() {
		$(".categoryBtn").on("click", function() {
			game.categoryChoosen = this.id;
			game.categoryName = game.triviaCategories[game.categoryChoosen].name;
			game.categoryNumber = game.triviaCategories[game.categoryChoosen].number;
			$("#mainArea").empty();
			var c = $('<h2 class="triviaHeader">')
				.text('Category: ' + game.categoryName)
				.appendTo("#mainArea");				
			var d = $('<h2 class="gameText">')
				.text("Choose your difficulty level.")
				.appendTo("#mainArea");
			for (var i = 0; i < game.difficultyArray.length; i++) {
				var d = $('<button>')
					.attr("class", "difficultyBtn")
					.attr("id", game.difficultyArray[i]).attr("class", "difficultyBtn")
					.text(game.difficultyArray[i])
					.appendTo("#mainArea");		}
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
	},
	//adds event handler to difficulty buttons, once clicked removes them, calls ajax function
	"chooseDifficulty": function() {
		$(".difficultyBtn").on("click", function() {
			game.difficultyChoosen = this.id;
			$('#mainArea').empty();
			//uses selection to create the url to get the questions from the api
			game.queryURL = "https://opentdb.com/api.php?amount=10&category=" + game.categoryNumber + "&difficulty=" + game.difficultyChoosen + '&type=multiple'; 
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
				game.getCurrentQuestion();
		})		
	},
//Function that changes question, makes question buttons
	"getCurrentQuestion" : function() {
		//In order for time display to be right at the load of the page
		var c = $('<h2 class="triviaHeader">')
			.html('Category: ' + game.categoryName)
			.appendTo("#mainArea");	
		var t = $("<div>")
			.html("<h2 class='gameText'>Time Remaining: <span  class='timeDisp'>30</span> seconds</h2>")
			.appendTo("#mainArea");
		var q = $("<h3 class='gameText'>")
			.attr("id", 'currentQuestion')
			.html(game.response.results[game.questionNumber].question)
			.appendTo("#mainArea");
		//array of possible incorrect answer, then adds correct answer at a random place
		var possible = [game.response.results[game.questionNumber].incorrect_answers[0],game.response.results[game.questionNumber].incorrect_answers[1],game.response.results[game.questionNumber].incorrect_answers[2],"place holder"];			
		var correctPlace = Math.floor(Math.random()*4);
			game.correctAnswer= game.response.results[game.questionNumber].correct_answer;
		if (correctPlace == 0) {
			game.correctBtn = "button0";
		} else if (correctPlace == 1) {
			game.correctBtn = "button1"
		} else if (correctPlace == 2) {
			game.correctBtn = "button2";
		} else {
			game.correctBtn = "button3";
		}
		possible.splice(correctPlace,0,game.correctAnswer);
		possible.pop();
		for (var i = 0; i < game.buttonArray.length; i++) {
			var a = $("<button class='answerBtn'>")
				.attr("id", game.buttonArray[i])
				.html(possible[i])
				.appendTo("#mainArea");
		}
		game.startInt();
		game.checkAnswer();
	},	
//Function that checks if answer is correct or not
	"checkAnswer": function() {		
		$(".answerBtn").on('click', function() {
			//stops timer on answer
			game.stopInt();
			game.questionNumber++;
			$("#mainArea").empty();	
			var c = $('<h2 class="triviaHeader">')
			.html('Category: ' + game.categoryName)
			.appendTo("#mainArea");	
			var t = $("<div>")
				.html("<h2 class='gameText'>Time Remaining: <span  class='timeDisp'></span> seconds</h2>")
				.appendTo("#mainArea");			
			$(".timeDisp").text(game.timerCount);
			for (var i = 0; i < 5; i++) {
				var f = $("<h2 class'gameText'>")
					.text(game.feedbackArray[i].text)
					.wrapInner(game.feedbackArray[i].spanID);				
			}
			//if answer is correct...
			if (this.id == game.correctBtn) {
				game.correctScreen();
				game.playerRight++;
				game.update();
			//if answer is incorrect...
			} else {
				game.incorrectScreen();
				game.playerWrong++;
				game.update();
			}
		})
	},
	//function that displays results after each question
	"feedbackDisp": function() {
		$("#mainArea").empty();
		var c = $('<h2 class="triviaHeader">')
			.html('Category: ' + game.categoryName)
			.appendTo("#mainArea");	
		var t = $("<div>")
			.html("<h2 class='gameText'>Time Remaining: <span  class='timeDisp'></span> seconds</h2>")
			.appendTo("#mainArea");		
		$(".timeDisp").text(game.timerCount);
		for (var i = 0; i < 5; i++) {
			var f = $("<div>")
				.html("<h3 class='gameText'>" + game.feedbackArray[i].text + game.feedbackArray[i].spanID + "</h2>")
				.appendTo("#mainArea");				
		}
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

	//if answer is right, shows this
	"correctScreen": function () {
		game.feedbackDisp();
		game.rightAnswer();			
		$("#correctIncorrect").text("correct");
		setTimeout(game.nextQuestion,4000);
	},
//if answer is wrong, shows this
	"incorrectScreen": function () {
		game.feedbackDisp();
		$("#correctIncorrect").text("incorrect.");	
		setTimeout(game.rightAnswer, 500);
		//to prevent timer from displaying incorrectly as page loads
		setTimeout(game.nextQuestion,4000);
	},

	//goes to next question or end screen
	"nextQuestion": function () {
		$("#mainArea").empty();
		//game continues if less than 10 questions have been answered
		if(game.questionNumber < 10) {			
			//resets game variables and html that display and hold questions and answers
			game.correctAnswer = undefined;
			game.correctBtn = undefined;
			game.getCurrentQuestion();
			game.timerCount = 30;
		} else {
			game.stopInt();
			var c = $('<h2 class="triviaHeader">')
			.html('Category: ' + game.categoryName)
			.appendTo("#mainArea");	
			var t = $("<div>")
			.html("<h2 class='gameText'>Time Remaining: <span  class='timeDisp'></span> seconds</h2>")
			.appendTo("#mainArea");			
			var r = $("<h2 class='gameText'>")
				.text("Results: ")
				.appendTo("#mainArea");				
			$(".timeDisp").text(game.timerCount);
			for (var i = 2; i < 5; i++) {
				var f = $("<div>")
				.html("<h3 class='gameText'>" + game.feedbackArray[i].text + game.feedbackArray[i].spanID + "</h2>")
				.appendTo("#mainArea");			
			}
			var b = $('<button id="restart">')
					.text("restart")
					.appendTo("#mainArea");	
			game.update();
			game.restart();
		}
	},

//if reset button is pressed on end screen, resets variables
	"restart": function () {	
		$("#restart").on("click", function () {
			$("#mainArea").empty();
			game.isRunning = false;
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
			game.initial();
		})
	}

}

//starts game
game.initial();



