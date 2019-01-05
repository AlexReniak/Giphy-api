// declare variables
// create an array of a few starting points that user can view
// create function to send request to api for data
// create for loop to take in data sent back and attach it to html
// create function for buttons
// loop within the array of gifs
// create function for when a button is clicked


// variables
var topicsArr = ["NHL","NBA", "NFL", "MLB"];
var gifRating = "G";
var searchText = "sports";
var queryURL;
var gifLimit = "10"
/* $("#search-button").on("click", function(event){
  event.preventDefault();
  var searchText = $("#search-input").val()
}) */

// function for displaying gifs

displayGifs();
function displayGifs() {

  // queryURL = "https://api.giphy.com/v1/gifs/search?api_key=hoiHN7H8yR3wZoh7U5Z3geXeCZ2J24ei&q=trump&limit=10&offset=0&rating=G&lang=en"

/*  queryURL = "https://api.giphy.com/v1/gifs/search?api_key=hoiHN7H8yR3wZoh7U5Z3geXeCZ2J24ei&q=" + searchText + "&limit=10&offset=0&rating=" + gifRating + "&lang=en" */

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
 
  $("#gif-view").append(gifDiv);
  }

})

// wrap images in one div class and reference the class of the div

}

function renderButtons() {
// empties other gifs
  $("#gif-view").empty();

// adds buttons to top of page
  for (var i = 0; i < topicsArr.length; i++) {
    var giphy = $("<button class='gif-btn'>").attr("data-name", topicsArr[i]).text(topicsArr[i]);
    $("#gif-buttons").append(giphy);
  }
}

// on click function when the user searches
$("#search-button").on("click", function(event) {
  event.preventDefault();

  var gif = $("#search-input").val();

  topicsArr.push(gif);

  renderButtons();

});

$(document).on("click", ".gif-btn", displayGifs);

$(".gif").on("click", function() {
  
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