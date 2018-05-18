var heroList=["ironman", "captain america", "black widow", "thor", "hulk", "spiderman", "deadpool"];
var name="";

addListButtons();

function addListButtons() {
    $("#buttons").empty();
    for (var i=0; i<heroList.length; i++) {
        var tab = $("<button>").attr("class", "hero-button");
        tab.attr("data-name", heroList[i]);
        tab.text(heroList[i]);
        $("#buttons").append(tab);
    }
}

function addGIFs() {

    $("#contents").empty();
    name = $(this).attr("data-name");
    console.log(name);
    name = name.replace(/\s/g, '+')
    console.log(name);
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=3mLraQcTL6rFJinJ2R3iiIMHHPNdbvbu&limit=10";

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response.data.length);
        console.log(response);

        for (var j=0; j<response.data.length; j++) {
            var holder = $("<div>").attr("class", "pic");
            var picURL_still = response.data[j].images.fixed_height_still.url;
            console.log(picURL_still);
            var picURL_animate = response.data[j].images.fixed_height.url;
            console.log(picURL_animate);
            var picRating = response.data[j].rating;
            console.log(picRating);
            
            var pic = $("<img>").attr("src", picURL_still);
            pic.attr("data-still", picURL_still);
            pic.attr("data-animate", picURL_animate);
            pic.attr("data-state", "still");
            pic.attr("class", "gif");
            pic.attr("alt", name+"gif image");
            holder.text("Rating: " + picRating);
            holder.append(pic);
            console.log(holder);
            $("#contents").append(holder);

        }
    })
}


$(document).on("click",".hero-button", addGIFs);

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if(state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else if(state == "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

$("#add-submit").on("click", function(event) {
    event.preventDefault();
    var newHeroName = $("#add-new").val().trim();
    heroList.push(newHeroName);
    console.log(heroList);
    addListButtons();
})
