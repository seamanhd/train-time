


//-----------------------------------------------------------------------------
// GLOBAL VARIABLES
//-----------------------------------------------------------------------------
var database = firebase.database();

    // Initial Values
    var trainName = "";
    var destination = "";
    var frequency = 0;
    var firstTime = 0;
    



//-----------------------------------------------------------------------------
//FUNCTIONS
//-----------------------------------------------------------------------------

$("#submit-button").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      trainName = $("#inputName").val().trim();
      destination = $("#inputDestination").val().trim();
      frequency = $("#inputFrequency").val().trim();
      firstTime = $("#inputFirst").val().trim();

      // Code for handling the push
      database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTime: firstTime,
      });

    });

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().firstTime);
      

      // full list of items to the well
      

      // // Assumptions
      var tFrequency = childSnapshot.val().frequency;

      // Time is 3:30 AM
      var firstTime = childSnapshot.val().firstTime;

      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      //console.log("ARRIVAL TIME: " + );

      $("#displayTrains").append("<tr> <td> " + childSnapshot.val().trainName + "</td> <td>"
       + childSnapshot.val().destination +
        "</td> <td>" + childSnapshot.val().frequency + "</td> <td>" + moment(nextTrain).format("hh:mm") + "</td> <td>" + tMinutesTillTrain + "</td> </tr>");

    // Handle the errors
    });




