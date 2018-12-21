// declare variables
// create an array of a few starting points that user can view
// create function to send request to api for data
// create for loop to take in data sent back and attach it to html
// create function for buttons
// loop within the array of gifs
// create function for when a button is clicked


// variables
var topicsArr = ["NHL","NBA", "NFL", "MLB"];
var gifRating = "G"
var searchText = "trump"
var queryURL;
var gifLimit;
/* $("#search-button").on("click", function(event){
  event.preventDefault();
  var searchText = $("#search-input").val()
}) */

// function for displaying gifs




displayGifs();
function displayGifs() {

  queryURL = "https://api.giphy.com/v1/gifs/search?api_key=hoiHN7H8yR3wZoh7U5Z3geXeCZ2J24ei&q=" + searchText + "&limit=10&offset=0&rating=&lang=en"

/*  queryURL = "https://api.giphy.com/v1/gifs/search?api_key=hoiHN7H8yR3wZoh7U5Z3geXeCZ2J24ei&q=" + searchText + "&limit=&offset=0&rating=" + gifRating + "&lang=en" */

/* var queryURL = "https://api.giphy.com/v1/gifs/search";
queryURL += "?" + $.param ({
  "api_key": "hoiHN7H8yR3wZoh7U5Z3geXeCZ2J24ei",
  "q": searchText,
  "rating": gifRating,
  "limit": "10"
}) */

$.ajax({
  url: queryURL,
  method: 'GET',
}).then(function(gifResults) {
  console.log(gifResults);

  for( var i = 0; i > topicsArr.length; i++);

  var gifDiv = $("<div class='gifs'>");
 
  var rating = $("<p>").text("gif rating: " + gifResults.data[i].data.rating);
 
  gifDiv.append(rating);

  var image = $("<img>").attr("src", gifResults.data[i].downsized_still, "data-still", gifResults.data[i].downsized_still, "data-animate", gifResults.data[i].downsized_small, "data-state", still, "class", gif);

  gifDiv.append(image);
 
  $("#gif-view").append(gifDiv);

})

// wrap images in one div class and reference the class of the div

}

function renderButtons() 
// empties other gifs
  $("#gif-image").empty();

  for (var i = 0; i < topicsArr.length; i++)
    var giphy = $("<button>").addClass("gif-btn").attr("data-name", topicsArr[i]).text(topicsArr)
    $("gif-buttons").append(giphy);





$("#search-input").on("click", function(event) {



}) 