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
		"entMovie":{
			"number": 12,
			"name": "Music",
		},
		"entTh": {
			"number": 13,
			"name": "Musicals & Theatres",
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
		"art":{
		"number": 25,
		"name": "Art",
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
		"sciGad":{
		"number": 30,
		"name": "Gadgets",
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
	"difficultyChoosen":"",
	"catagoryChoosen":"",
	"catagoryNumber":0,
	"queryURL":"",
	//tracks game progress and number of wins
	"questionNumber": 0,
	"winCounter":0,
	"playerRight":0,
	"playerWrong":0,
	"playerSkipped":0,

	queryURL:"",
	"chooseCatagory": function() {
		$(".catagoryBtn").on("click", function() {
			game.catagoryChoosen=this.id;
			$("#catagory").addClass("hidden");
			$("#difficulty").removeClass("hidden");
			console.log(game.catagoryChoosen);
			game.catagoryNumber = game.triviaCategories[game.catagoryChoosen].number;
			game.chooseCatagory();
		})
	},
	"chooseDifficulty": function() {
		$(".difficultyBtn").on("click", function() {
			game.difficultyChoosen = this.id;
			console.log(this);
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
			$("#currentQuestion").text(response[game.questionNumber].question);
		//array of possible incorrect answer, then adds correct answer at a random place
			var possible = [response.incorrect_answer[0],response.incorrect_answer[1],response.incorrect_answer[3]];
			var correctPlace = Math.floor(Math.random()*4);
			possible.splice(correctPlace,0,response.correct_answer);
			console.log(possible);
			$("#answer0").text(possible[0]);
			$("#answer1").text(possible[1]);
			$("#answer2").text(possible[2]);
			$("#answer3").text(possible[3]);		
		}
	},
	// // "checkAnswer": function () {
	// // 	$(".answerBtn").on("click", function() {
	// // 		console.log(this);
	// // 		console.log(this.id);
	// // 		if (this.id === game.questions[game.questionNumber].correctAnswer) {
	// // 			game.playerRight++;
	// // 			console.log(game.questions[game.questionNumber].correctAnswer);

	// // 			game.winScreen();
	// // 		} else {
	// // 			game.playerWrong++;
	// // 			game.loseScreen();
	// // 		} 
	// // 	});
	// // },
	// "update": function () {
	// 	$("#numberRight").text(game.playerRight);
	// 	$('#numberWrong').text(game.playerWrong);
	// 	$('#numberSkipped').text(game.playerSkipped);
	// },
	// "winScreen": function () {
	// 	$("#main").addClass('hidden');
	// 	$("#feedback").removeClass('hidden');
	// 	$("#correctIncorrect").text("correct");
	// 	$("#rightAnswer").text(game.questions[game.questionNumber].correctAnswerText);
	// 	$("#correctPicture").removeClass("hidden").css("src",game.questions[game.questionNumber].correctPicture).css("alt",game.questions[game.questionNumber].altText)
	// 	game.update();
	// 	game.playerRight++;
	// },
	// "loseScreen": function () {
	// 	$("correctIncorrect").text("incorrect.");
	// 	game.playerWrong++;
	// 	$("#correctPicture").addClass("hidden").css("src","'#'").css("alt","'#'");
	// 	game.update();
	// },
	// "nextQuestion": function () {
	// 	$("#next").on("click", function() {
	// 	$("#main").removeClass('hidden');
	// 	$("#feedback").addClass('hidden');
	// 	$("#right").empty();
	// 	$("#rightAnswer").empty();
	// 	game.questionNumber++;
	// 	}),
	// }


	

game.chooseCatagory();
game.chooseDifficulty();

