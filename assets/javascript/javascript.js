// declare variables
// create an array of a few starting points/topics that user can view
// create function to send request to api for data
// create for loop to take in data sent back and attach it to html
// create function for buttons to be displayed
// create a click function for the document for still/animated gif images
// loop within the array of gifs
// create function for when a button is clicked
// remove previous gifs and replace with new ones


// Two problems:
//#1 - When there is search input, it adds the button, but does not display the gifs for the input


// variables
var topicsArr = ["Hockey","Basketball", "Soccer", "Football", "Baseball"];
var gifRating = "PG-13";
var searchText;
var queryURL;
var gifLimit = "10"

// function for displaying gifs

displayGifs();
function displayGifs() {
$("#gif-view-left").empty();
$("#gif-view-right").empty();

searchText = $(this).attr("data-name");

queryURL = "https://api.giphy.com/v1/gifs/search";
queryURL += "?" + $.param ({
  "api_key": "hoiHN7H8yR3wZoh7U5Z3geXeCZ2J24ei",
  "q": searchText,
  "rating": gifRating,
  "limit": gifLimit
}) 

$.ajax({
  url: queryURL,
  method: 'GET',
}).then(function(gifResults) {
  console.log(gifResults);

  for( var i = 0; i < gifResults.data.length; i++) {

  var gifDiv = $("<div class='gifs'>");
 
  var rating = $("<p>").text("gif rating: " + gifResults.data[i].rating);
 
  gifDiv.append(rating);

  var image = $("<img class='gif'>").attr("src", gifResults.data[i].images.downsized_still.url)
  image.attr("data-still", gifResults.data[i].images.downsized_still.url)
  image.attr("data-animate", gifResults.data[i].images.downsized.url)
  image.attr("data-state", "still")
  

  gifDiv.append(image);

  if (i < 5) {
 
  $("#gif-view-left").prepend(gifDiv);
  }
  else {
    $("#gif-view-right").prepend(gifDiv)
  }
  }

});

};

//creates buttons under search bar
function renderButtons() {

// empties other gifs on page and adds a button for what was just searched/whatever button was clicked
  $("#gif-buttons").empty();

// adds buttons to top of page
  for (var i = 0; i < topicsArr.length; i++) {
    var giphy = $("<button class='gif-btn'>").attr("data-name", topicsArr[i]).text(topicsArr[i]);
    $("#gif-buttons").append(giphy);
  }
}

// on click function when the user searches for a gif(s)
$("#search-button").on("click", function(event) {
  event.preventDefault();

  var gif = $("#search-input").val().trim();

  if (gif === "") {
    alert("Search for something!")
  }

  else {
    topicsArr.push(gif);
  }

  renderButtons();

});

// run displayGif variable when gif button is clicked
$(document).on("click", ".gif-btn", displayGifs);
  
// on click function to change the image between still and animated
$(document).on("click", ".gif", function() {
  
  var dataState = $(this).attr("data-state")

  if (dataState === "still") {
    var animatedImgSrc = $(this).attr("data-animate")
    $(this).attr("src", animatedImgSrc);
    $(this).attr("data-state", "animate");
  } 
  
  else {
    var stillImgSrc = $(this).attr("data-still")
    $(this).attr("src", stillImgSrc);
    $(this).attr("data-state", "still");
  }

});

renderButtons();