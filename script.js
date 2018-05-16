var heroList=["ironman", "captain america", "black widow", "thor", "hulk", "spiderman", "deadpool"];

function addListButtons() {
    $("#buttons").empty();
    for (var i=0; i<heroList.length; i++) {
        var tab = $("<button>").attr("class", "hero");
        tab.attr("data-name", heroList[i]);
        tab.text(heroList[i]);
        $("#buttons").append(tab);
    }
}

function addGIFs() {
    
    var name = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=3mLraQcTL6rFJinJ2R3iiIMHHPNdbvbu&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        $("#gifs").empty();
        
        for (var j=0; j<response.length; j++) {
            var holder = $("<div>").attr("class", "pic");
            var picURL = response[j].data.image_original_url;
            var picRating = response[j].data.rating;
            var pic = $("<img>").attr("src", picURL);
            pic.attr("alt", name+"gif image");
            holder.text("Rating: " + picRating);
            holder.append(pic);
            $("#gifs").append(holder);
        }



    })

}


addListButtons();

