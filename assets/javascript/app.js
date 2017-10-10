
var secretApi = masterFirebaseConfig.apiKey
var secretAuthDomain = masterFirebaseConfig.authDomain
var secretDatabaseURL = masterFirebaseConfig.databaseURL
var secretProjectId = masterFirebaseConfig.projectId
var secretStorageBucket = masterFirebaseConfig.storageBucket
var secretMessagingSenderId = masterFirebaseConfig.messagingSenderId

// Initialize Firebase
var config = {
  apiKey: secretApi,
  authDomain: secretAuthDomain,
  databaseURL: secretDatabaseURL,
  projectId: secretProjectId,
  storageBucket: secretStorageBucket,
  messagingSenderId: secretMessagingSenderId
};

firebase.initializeApp(config);

//Declaring Global Variables
var database = firebase.database();

var name = "";
var destination = "";
var time = "";
var frequency = 0;

//Button for adding trains
$('#add-train-btn').on('click', function(event) {
  event.preventDefault();

  //Accept user input

  var trainDestination = $('#destination-input').val().trim();
  var trainName = $('#train-name-input').val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
});

console.log(trainStart);

//Create local object for storing train information

var newTrain = {
  destination: trainDestination,
  name: trainName,
  start: trainStart,
  frequency: trainFrequency
};

//Push the data to the server database
database.ref().push(newTrain);

$("#destination-input").val("");
$("#train-name-input").val("");
$("#start-input").val("");
$("#frequency-input").val("");

//Create Firebase event that adds train to DB and creates new HTML row

minutesAway = 0;
startEndDiff = 0;
nextArrival = 0;
nextArrivalPretty = 0;

//Add all data to a variable
var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var trainStart = childSnapshot.val().start;
var trainFrequency = childSnapshot.val().frequency;

var startEndDiff = Math.abs(moment().diff(moment.unix(trainStart, "X"), "minutes"));
console.log(startEndDiff, "startendDiff");
var minutesAway = Math.round(Math.abs((((startEndDiff / trainFrequency) % 1) * trainFrequency) - trainFrequency));
console.log(minutesAway);
var nextArrival = moment().add(minutesAway, "minutes");
console.log(moment(trainStart, "X"), "HH:mm");
//console.log(nextArrival._d);

var nextArrivalNice = moment().add(minutesAway, "minutes").format("HH:mm");
console.log(nextArrivalNice);


// Add each train's data into the table
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
trainFrequency + "</td><td>" + nextArrivalNice + "</td><td>" + minutesAway + "</td><td>");
