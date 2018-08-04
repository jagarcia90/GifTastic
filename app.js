$(document).ready(function () {
    var topics = ['dog', 'cat', 'jaguar', 'wolf'];

    //  create topics array buttons
    function buttonAdd() {
        $('#buttonsView').empty();

        for (var i = 0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('expression');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsView').append(a);
        }
    }
    buttonAdd();
    //on button click
    $(document).on('click', '.expression', function () {

        var animal = $(this).html();

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=RKCuRKKH4MjwJlCPJ2ZVV3v6YjAuZem0&limit=10";
        $.ajax({ url: queryURL, method: 'GET' })
            .done(function (response) {

                // grabs the data
                var results = response.data;

                //empties the div before adding more gifs
                $('#expressView').empty();

                //loops through the data
                for (var j = 0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                    var expressImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    expressImage.attr('data-state', 'still');
                    $('#expressView').prepend(expressImage);
                    expressImage.on('click', playGif);

                    // pulling the rating
                    var rating = results[j].rating;
                    var displayRated = $('<p>').text("Rating: " + rating);
                    $('#expressView').prepend(displayRated);
                }
            });
        //Adds multiple Gifs 
            function playGif() {
            var state = $(this).attr('data-state');
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        } 
    }) 
    //adding new button
    $(document).on('click', '#addGifphy', function () {
        if ($('#express-input').val().trim() == '') {
            alert('please add animal');
        }
        else {
            var animal = $('#express-input').val().trim();
            topics.push(animal);
            $('#express-input').val('');
            buttonAdd();
            return false;
        }
    });
});