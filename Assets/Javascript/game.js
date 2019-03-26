
// so these are the 4 topics i want to be loaded as buttons initially
var initialTopics = ["Eagles", "Phillies", "Flyers", "Sixers"];


// CREATING SHOW BUTTONS FUNCTION ------------------
// function for the butons from the array to be created into the buttons-view div
function showButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < initialTopics.length; i++) {

        var button = $("<button>");
        button.attr("giph-name", initialTopics[i]);
        button.text(initialTopics[i]);
        button.addClass("giph-button");
        //adding the info class from bootstrap for this button
        button.addClass("btn btn-info");
        $("#buttons-view").append(button);
        $("#giph-input").val("");
        // console.log(initialTopics[i]);
    }
}

// Add Giph To Display Function
// creating a function so that once the add giph button is clicked, the value that is in giph input is taken
// and pushed to the initial topics array.  Then, the show buttons function is called 
$("#add-giph").on("click", function (event) {
    event.preventDefault();
    var newGiph = $("#giph-input").val().trim();

//validation for the form for inputting at least something
    if (newGiph.length < 1) {
        alert("You have to type something in...");
        return false;
      }
    initialTopics.push(newGiph);
    // console.log(initialTopics);
    showButtons();
})

    // Function that will make the AJAX call to pull images 
    //creating functionality to call to Giphy database when button is clicked and display 10 still images

function pullGiphs() {

    //this is here so that any previous giphs are removed when you click the buttons
    $("#giphs-display").empty();

    var giph = $(this).attr("giph-name");
    console.log(this);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giph + "&api_key=dc6zaTOxFJmzC";

    //console.log(giph);
    //this should be able to be configured to allow the # of images you want returned back
    var x = 10;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        for (var i = 0; i < x; i++) {

            var giphDiv = $("<div>");
            var giphImage = $("<img>");
            var giphStill = results[i].images.fixed_height_still.url;
            var giphMoving = results[i].images.fixed_height.url;
            giphImage.attr("src", giphStill);
            giphImage.attr("data-state", "still");
            giphImage.addClass("click-me");
            giphImage.attr("data-still", giphStill);
            giphImage.attr("data-animate", giphMoving);
            giphDiv.append(giphImage);

            var rating = response.data[i].rating;
            var ratingOutput = $("<p>").text("Giph Belows Rating: " + rating);

          

            $("#giphs-display").append(ratingOutput);
            $("#giphs-display").append(giphDiv);

        }

        $(".click-me").on("click", playPause);

    })
}

//starting off by running function to show functions in the initial topics array
showButtons();

//calling the pull giphs function as a click event on the giph-button class
$(document).on("click", ".giph-button", pullGiphs);

//create function that will check the state of the image and change it based on state

function playPause() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        console.log("state = still")
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "data-animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

//adding function to refresh to page as the "reset" button
function reset() {
    window.location.reload()
}
//adding an on click to call the reset function
$(document).on("click", "#reset", reset);


//adding function to clear just the giphs

function clearGiphs() {

$("#giphs-display").empty();

}

$(document).on("click", "#clear-giphs", clearGiphs);


