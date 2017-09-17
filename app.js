$(document).ready(function() {
    var topics = ["hockey fights", "steve brule", "idiocracy", "puppy fail", "mosh pit", "30 rock", "rick & morty", "the hound", "the office"];

    function renderButtons() {

        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("gif");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons").append(a);
        }
    }

// Add buttons
    $("#add-search").on("click", function(event) {

        event.preventDefault();
        var topic = $("#search-input").val().trim();
        topics.push(topic);

        renderButtons();
    });

    renderButtons();

// Display GIFs
    function displayTopicInfo() {

      var topic = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var topicImage = $("<img class='move'>");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            topicImage.attr("data-state", "still");

            gifDiv.prepend(p);
            gifDiv.prepend(topicImage);

            $("#gifDump").prepend(gifDiv);
          }
        });
    };

    $(document).on("click", ".gif", displayTopicInfo);


    
});

// Play/Pause GIFs
    $(".move").on("click", function() {

      var state = $(this).attr("data-state");
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });