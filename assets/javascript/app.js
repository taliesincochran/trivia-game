var game = {

	"questions": [
	{
		"question": "What was the longest seige in history?",
		"answer1": "The Siege of Ceuta, 1694 AD.", 
		"answer2":"The Siege of Candia, 1648 AD.", 
		"answer3":"The Siege of Philidelphia(in Egypt), 1378 AD.", 
		"answer4":"The Siege of Drepana, 249 BC.",
		"correctAnswer": "The Siege of Ceuta, 1694 AD.",
		"correctPicture": "src='assets/images/question0.png'",
	},
	{
		"question": 'How did Xerxes get his army across from Asia Minor to the Greek mainland during the second Persian invasion of Greece (480 BC - 479 BC")?',
		"answer1": "He marched them around the north shore of the Black Sea.", 
		"answer2":"He built a pontoon bridge across the Hellespont and march.", 
		"answer3":"He moved his troops by galley sailing south of Crete and then north to Greece.", 
		"answer4":"He moved his troops by trireme across the Sea of Marmara.",
		"correctAnswer": "He built a pontoon bridge across the Hellespont.",
		"correctPicture": "src='assets/images/question1.png'",
	},
	{
		"question": "Where did the Allies land during the D-day invasion?",
		"answer1": "Brittany", 
		"answer2":"The Cotentin Peninsula", 
		"answer3":"Calais", 
		"answer4":"Normandy",
		"correctAnswer": "Normandy",
		"correctPicture": "src='assets/images/question2.png'",
	},
	{
		"question": "In which city was Archduke Franz Ferdinand of Austria assasinated?",
		"answer1": "Belgrade", 
		"answer2":"Vienna", 
		"answer3":"Serajevo", 
		"answer4":"Budapest",
		"correctAnswer": "Serajevo",
		"correctPicture": "src='assets/images/question3.png'",
	},
	{
		"question": "What was the first battle of the U.S. Civil War?",
		"answer1": "The Battle of Sewell's Point", 
		"answer2":"The Battle of Fort Sumter", 
		"answer3":"The Battle of Hoke's Run", 
		"answer4":"The Battle of First Manassas",
		"correctAnswer": "The Battle of Fort Sumter",
		"correctPicture": "src='assets/images/question4.png'",
	},
	{
		"question": "Which of the following was not invented in China?",
		"answer1": "Paper making", 
		"answer2":"Movable Type Printing", 
		"answer3":"The Rocket", 
		"answer4":"Chess",
		"correctAnswer": "Chess",
		"correctPicture": "src='assets/images/question5.png'",
	},
	{
		"question": "Who first circumnavigated the globe?",
		"answer1": "James Cook", 
		"answer2":"Vasco da Gama", 
		"answer3":"Ibn Battuta", 
		"answer4":"Ferdinand Magellen",
		"correctAnswer": "Ferdinand Magellen",
		"correctPicture": "src='assets/images/question6.png'",
	},
	{
		"question": "Who is credited for discovering Greenland?",
		"answer1": "Erik Thorvaldsson", 
		"answer2":"Leif Eriksson", 
		"answer3":"Olaf Tryggvason", 
		"answer4":"Flóki Vilgerðarson",
		"correctAnswer": "",
		"correctPicture": "src='assets/images/question7.png'",
	},
	{
		"question": "What was the largest Empire of all time?",
		"answer1": "The British Empire", 
		"answer2":"The Mongol Empire", 
		"answer3":"The Roman Empire", 
		"answer4":"The Russion Empire",
		"correctAnswer": "The British Empire",
		"correctPicture": "src='assets/images/question8.png'",
	},
	{
		"question": "When was the year without a summer?",
		"answer1": "1758 AD", 
		"answer2":"1365 AD", 
		"answer3":"1816 AD", 
		"answer4":"1655 AD",
		"correctAnswer": "1758 AD",
		"correctPicture": "src='assets/images/question9.png'",
	}
	],
	"start": function () {
		$("#startButton").on("click", function (){
			$("#startPage").addClass("hidden");
			$("#main").removeClass("hidden");
		})
	},
	"questionNumber": 0,
	"getQuestion": function() {

		$("#currentQuestion").text(game.questions[game.questionNumber].question);
		$("#answer1").text(game.questions[game.questionNumber].answer1);
		$("#answer2").text(game.questions[game.questionNumber].answer2);
		$("#answer3").text(game.questions[game.questionNumber].answer3);
		$("#answer4").text(game.questions[game.questionNumber].answer4);
	},
	
}
game.start();
game.getQuestion();
	

