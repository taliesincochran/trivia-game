var game = {
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
		// "art":{
		// 	"number": 25,
		// 	"name": "Art",
		// },
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
		// "sciGad":{
		// 	"number": 30,
		// 	"name": "Gadgets",
		// },
		"jAM":{
			"number": 31,
			"name": "Japanese Anime & Manga",
		},
		"carAni":{
			"number": 32,
			"name": "Cartoon & Animations",
		},
	},
	"difficultyChoosen":"",
	"catagoryChoosen":"",
	"catagoryNumber":0,
	"catagoryName":"",
	"correctAnswer":"",
	"queryURL":"",
	"correctBtn":"",
	//tracks game progress and number of wins
	"questionNumber": 0,
	"winCounter":0,
	"playerRight":0,
	"playerWrong":0,
	"playerSkipped":0,

	queryURL:"",
	"chooseCatagory": function() {
		$(".catagoryBtn").on("click", function() {
			game.catagoryChoosen = this.id;
			game.catagoryName = game.triviaCategories[game.catagoryChoosen].name;
			game.catagoryNumber = game.triviaCategories[game.catagoryChoosen].number;
			$("#catagory").addClass("hidden");
			$("#difficulty").removeClass("hidden");
			if(game.catagoryChoosen == "entBG") {
				$("#hard").addClass("hidden");
				$("#medium").addClass("hidden");
			} else if (game.catagoryChoosen == "myth" || game.catagoryChoosen == "sport" || game.catagoryChoosen == "carAni") {
				$("#hard").addClass("hidden");
			} else if (game.catagoryChoosen == "ani") {
				$("#easy").addClass("hidden");
			} else if (game.catagoryChoosen == "sciMath" || game.catagoryChoosen == "pol" || game.catagoryChoosen == "cel"   || game.catagoryChoosen == "entCB") {
				$("#hard").addClass("hidden");
				$("#easy").addClass("hidden");
			}
			console.log(game.catagoryChoosen);
			console.log(game.catagoryName);
			$(".dispCat").html(game.catagoryName);
			game.chooseDifficulty();
			
		})
	},
	"chooseDifficulty": function() {
		$(".difficultyBtn").on("click", function() {
			game.difficultyChoosen = this.id;
			// $(".dispCat").html(game.catagoryName);
			console.log(this);
			console.log(game.catagoryNumber, game.catagoryName, game.catagoryChoosen);
			game.queryURL = "https://opentdb.com/api.php?amount=10&category=" + game.catagoryNumber + "&difficulty=" + game.difficultyChoosen + '&type=multiple'; 
			console.log(game.queryURL);
			$("#difficulty").addClass("hidden");
			$("#main").removeClass("hidden");
			game.getQuestion();
		})
	},	
	"getQuestion": function() {
		$.ajax({
		url : game.queryURL,
		method: "GET"
		}).done(function(response) {
			$("#currentQuestion").html(response.results[game.questionNumber].question);
		//array of possible incorrect answer, then adds correct answer at a random place
			var possible = [response.results[game.questionNumber].incorrect_answers[0],response.results[game.questionNumber].incorrect_answers[1],response.results[game.questionNumber].incorrect_answers[2],"place holder"];
			var correctPlace = Math.floor(Math.random()*4);
			game.correctAnswer= response.results[game.questionNumber].correct_answer;
			if (correctPlace=0) {
				game.correctBtn = "button0"
			} else if (correctPlace = 1) {
				game.correctBtn = "button1"
			} else if (correctPlace = 2) {
				game.correctBtn = "button2"
			} else {
				game.correctBtn = "button3"
			}
			console.log(response.results[game.questionNumber].correct_answer);
			possible.splice(correctPlace,0,game.correctAnswer);
			console.log(possible);
			$("#answer0").html(possible[0]);
			$("#answer1").html(possible[1]);
			$("#answer2").html(possible[2]);
			$("#answer3").html(possible[3]);
			game.setTimer();
			game.checkAnswer();
			
		})
	},
	"setTimer": function() {
		setTimeout(game.skipQuestion,30000);		

	},
	"checkAnswer": function() {
		$(".answerBtn").on('click', function() {
			if (this.id == game.correctBtn) {
				console.log(this.id);
				game.playerRight++;
				game.correctScreen();
			} else {
				game.incorrectScreen();
			}
		})
	},


	"update": function () {
		$("#numberRight").text(game.playerRight);
		$('#numberWrong').text(game.playerWrong);
		$('#numberSkipped').text(game.playerSkipped);
	},
	"correctScreen": function () {
		$("#main").addClass('hidden');
		$("#feedback").removeClass('hidden');
		game.rightAnswer();
		$("#rightAnswer").text(game.correctAnswer);
		game.update();
		game.playerRight++;
	},
	"rightAnswer": function () {
		$("#correctIncorrect").text("correct");
	},
	"incorrectScreen": function () {
		$("correctIncorrect").text("incorrect.");
		$("#main").addClass('hidden');
		$("#feedback").removeClass('hidden');
		game.playerWrong++;
		setTimeout (game.rightAnswer,2000)
		game.update();
		setTimeout(nextQuestion,3500);
	},
	"nextQuestion": function () {
		$("#main").removeClass('hidden');
		$("#feedback").addClass('hidden');
		$("#right").empty();
		$("#rightAnswer").empty();
		game.questionNumber++;
	}

}
	

game.chooseCatagory();



