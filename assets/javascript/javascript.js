// Initialize Firebase
var config = {
    apiKey: "AIzaSyDXUv4q4gX3MO2CH114JcjBpjZI4BhRfw0",
    authDomain: "train-scheduler-490da.firebaseapp.com",
    databaseURL: "https://train-scheduler-490da.firebaseio.com",
    projectId: "train-scheduler-490da",
    storageBucket: "",
    messagingSenderId: "1051562054883"
};

firebase.initializeApp(config);
var database = firebase.database();

// Firebase event
    database.ref().on('child_added', function(childSnapshot){

    var theChild = childSnapshot.val();
    var displayTrainName = childSnapshot.val().dbTrainName;
    var displayDestination = childSnapshot.val().dbDestination;
    var displayTrainTime = childSnapshot.val().dbTrainTime;
    var displayFrequency = childSnapshot.val().dbFrequency;
    var displayNextArrival = childSnapshot.val().dbNextArrival;
    var displayMinutesAway = childSnapshot.val().dbMinAway;

    //Add moment.js logic here*****************************************

        var trainTimeConverted = moment(displayTrainTime, "hh:mm");
		var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
		var tRemainder = diffTime % displayFrequency;
		var minAway = displayFrequency - tRemainder;
        var nextArrival = moment().add(minAway, "minutes").format("hh:mm");

    $('#tbody').append('<tr><td>'+displayTrainName+'</td><td>'+displayDestination+'</td><td>'+displayFrequency+'</td><td>'+nextArrival+'</td><td>'+minAway+'</td></tr>');

});//End database.ref.on

//Submit button
$("#submit").on("click", function() {
    event.preventDefault();

    var subName = $('#name-form').val().trim();
    var subDestination = $('#dest-form').val().trim();
    var subTrainTime = moment($("#first-time-form").val().trim(), "H:mm").format("X");
    var subFreq = $('#freq-form').val().trim();

    //Clears previous values
    $(this).closest('form').find("input[type=text], textarea").val("");

    // Database push
    database.ref().push({
        dbTrainName: subName,
        dbDestination: subDestination,
        dbTrainTime: subTrainTime,
        dbFrequency: subFreq
    });

});//End submit button listener