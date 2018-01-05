
  // Initialize Firebase
var config = {
	apiKey: "AIzaSyB-RL1NtIOV6auaJWFhhUVibp3b1hD1efs",
	authDomain: "rpsm-194ce.firebaseapp.com",
	databaseURL: "https://rpsm-194ce.firebaseio.com",
	projectId: "rpsm-194ce",
	storageBucket: "",
	messagingSenderId: "69716634755"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
//initialize Variables
var choices = -1;
var p1name = null;
var p2name = null;
var winner = 2;
// var currP = null;
// var currName = null;
var currChoice = null;
// database.ref('player2').set(0)


function display(){
	$("#p1").removeClass();
	$("#p2").removeClass();
	$('#p1').html('');
	$('#p2').html('');
	
	if (localStorage.currP ==1 ){
		$("#p1").addClass("currBox");
	} else {
		$("#p1").addClass("box");
	}

	if (localStorage.currP ==2 ){
		$("#p2").addClass("currBox");
	} else {
		$("#p2").addClass("box");
	}

	if (winner == 1){
		$("#info").html("<p>You Won!</p>");
		return;
	} else if (winner == -1){
		$("#info").html("<p>You Lost :(</p>");
		return;
	} else if (winner == 0){
		$("#info").html("<p>You Tied :/</p>");
		return;
	}

	// console.log(p1name)
	if (p1name == 0 || p2name == 0 || p1name == null || p2name == null){
		$("#info").html("<p>Getting Ready</p>");
		if (p1name == 0 || p1name == null) {
			$("#p1").html("<p>Waiting for player 1 to connect</p>");
		} else {
			$("#p1").html("<p>" + p1name + " is ready to play!</p>");
		}

		if (p2name == 0 || p2name == null) {
			$("#p2").html("<p>Waiting for player 2 to connect</p>");
		} else {
			$("#p2").html("<p>" + p2name + " is ready to play!</p>");
		}
	} else {
		$("#info").html("<p>Make your choices!</p>");
		if (currChoice){

		}
		for (i=1; i<3; i++){
			if (i==localStorage.currP){
				$('#p'+i)
				.append('<div class = "choice" id = "rock0">Rock</div>')
				.append('<div class = "choice" id = "paper1">Paper</div>')
				.append('<div class = "choice" id = "scissors2">Scissors</div>');
				$(".choice").on("click", choice);
			} else {
				$('#p'+i).html("<p>Waiting for player "+i+" to choose")
			}

		}
		console.log(choices)
		if (choices == 0){
			$("#rock0").addClass("selected");
		} else if (choices == 1) {
			$("#paper1").addClass("selected");
		} else if (choices == 2) {
			$("#scissors2").addClass("selected");
		}
	}
}

function choice(){
	currChoice = 1;
	if (this.id == 'rock0'){
		choices = 0;
	} else if (this.id == 'paper1'){
		choices = 1;
	} else {
		choices = 2;
	}

	database.ref('p'+localStorage.currP+'choice').set(choices);
	// display()
}

function setName(){
	if (localStorage.currP){
		alert("Already logged in as \'" + localStorage.currName + "\' in slot " + localStorage.currP)
		return;
	}
	if (p1name == 0){
		p1name = $("#nameInp").val();
		localStorage.currName = $("#nameInp").val();
		$("#nameInp").val("");
		localStorage.currP = 1
		database.ref('player1').set(localStorage.currName);
			
	} else if (p2name == 0) {
		p2name = $("#nameInp").val();
		localStorage.currName = $("#nameInp").val();
		$("#nameInp").val("");
		localStorage.currP = 2
		database.ref('player2').set(localStorage.currName);

	}
	// display()
}

function logout(){
	if (localStorage.currP){
		if (localStorage.currP == 1){
			p1name = null;
			database.ref('player1').set(0);
		} else {
			p2name = null;
			database.ref('player2').set(0);
		}
	} else {
		alert("Already logged out!");
	}
	localStorage.clear()
	// alert("Logged out!");
	// display()
}

$("#nameSub").on("click", setName);
$("#logout").on("click", logout);  

function compare(a,b){
	c = a-b;
	if (localStorage.currP == 2){
		c=c*-1;
	}
	if (c==-1 || c==2){
		winner = -1;
	} else if (c == 0){
		winner = 0;
	} else {
		winner = 1;
	}
}

database.ref().on("value", function(snapshot) {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());

      // Change the HTML to reflect
      // $("#name-display").html(snapshot.val().name);
      // $("#email-display").html(snapshot.val().email);
      // $("#age-display").html(snapshot.val().age);
      // $("#comment-display").html(snapshot.val().comment);

      p1name = snapshot.val().player1;
      p2name = snapshot.val().player2;

      if (snapshot.val().p1choice != -1 && snapshot.val().p2choice != -1){
      	compare(snapshot.val().p1choice,snapshot.val().p2choice);
      	console.log(winner)
      	display();
      	currChoice = 0;
      	winner = 2;
      	setTimeout(function(){
      		database.ref('p1choice').set(-1);
      		database.ref('p2choice').set(-1);
      		choices = -1;
      		display();
      	}, 3000);
      } else{
      display()
      }

      // Handle the errors
    }, function(errorObject) {
      // console.log("Errors handled: " + errorObject.code);
    });


// display();