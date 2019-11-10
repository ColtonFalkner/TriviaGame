$(document).ready(function () {
    var options = [
        {
            question: "In what century does the majority of the show take place?", 
            choice: ["30th", "28th", "31st", "21st"],
            answer: 2,
            photo: "assets/images/3000.gif"
         },
         {
            question: "What is the name of the delivery company the main characters work at?", 
            choice: ["Planet Express", "Universal Postal Service", "Interplanetary Delivery", "FedEx"],
            answer: 0,
            photo: "assets/images/planetexpress.gif"
         }, 
         {
             question: "What is the name of Leela's three-eyed pet?", 
            choice: ["Chonks", "Cutesy", "Ralph", "Nibbler" ],
            answer: 3,
            photo: "assets/images/nibbler.gif"
        }, 
        {
            question: "According to Dr. Farnsworth, what is strange about Dr. Zoidberg?", 
            choice: ["He is a lobster doctor", "His name is John", "He wears sandals", "His traumatizing odor" ],
            answer: 2,
            photo: "assets/images/zoidberg.gif"
        }, 
        {
            question: "What holiday was Fry celebrating moments before being frozen?", 
            choice: ["Easter", "New Years Eve", "Halloween", "St. Patrick's Day" ],
            answer: 1,
            photo: "assets/images/NewYearFry.gif"
        }, 
        {
            question: "What is the name of Fry's ever-patient canine companion?", 
            choice: ["Stinky", "Seymour", "Buddy", "Duke" ],
            answer: 1,
            photo: "assets/images/seymour.gif"
        }, 
        {
            question: "Where did Fry and Bender first meet?", 
            choice: ["O'Zorgnax's", "The Labor Office", "Suicide Booth", "Titantic 2" ],
            answer: 2,
            photo: "assets/images/bendermeetsfry.gif"
        }, 
        {
            question: "What is Leela's surname?", 
            choice: ["Lola", "Turanga", "Carrigan", "Leeloo" ],
            answer: 1,
            photo: "assets/images/leela.gif"
        },
        {
            question: "Who is the pompous space captain based on William Shatner's character in Star Trek?", 
            choice: ["Zapp Brannigan", "Kif Kroker", "Will Robinson", "James T. Kirk" ],
            answer: 0,
            photo: "assets/images/zapp.gif"
        },
        {
            question: "Who is the president of Earth throughout most of the series?", 
            choice: ["Robo-Lincoln", "Ghost of Donald Trump", "Disembodied Jimmy Carter", "Richard Nixon's Head" ],
            answer: 3,
            photo: "assets/images/partywithnixon.gif"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];


    
    $("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];


		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})