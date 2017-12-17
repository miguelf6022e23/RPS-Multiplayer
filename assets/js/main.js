pull();

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
var p1name = null;
var p2name = null;
// var currP = null;
// var currName = null;
var currChoice = null;
// database.ref('player2').set(0)


function display(){
	$("#p1").removeClass();
	$("#p2").removeClass();
	console.log(p1name)
	if (p1name == 0 || p1name == null) {
		$("#p1").html("<p>Waiting for player 1 to connect</p>");
		$("#info").html("<p>Getting Ready</p>");
	} else {
		$("#p1").html("<p>" + p1name + " is ready to play!</p>");
	}

	if (p2name == 0 || p2name == null) {
		$("#p2").html("<p>Waiting for player 2 to connect</p>");
		$("#info").html("<p>Getting Ready</p>")
	} else {
		$("#p2").html("<p>" + p2name + " is ready to play!</p>");
	}

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

	if (p1name == 0 || p2name == 0){
		return;
	}


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
	push();
	display()
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
	display()
}

function push(){

}

function pull(){

}

$("#nameSub").on("click", setName);
$("#logout").on("click", logout);  

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

      display()
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


// display();