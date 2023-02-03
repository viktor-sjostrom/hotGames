$(document).ready(function () {

    // Här anropar ni funktionen getGames med argumentet true.
    // Funktionen getGames tar en parameter (all) som, om den är sann, innebär att vi vill visa alla
    // spel på heta listan, men om den är falsk bara vill visa spel som vi vet är utgivna.
    // (Se vidare punkt 5 i uppgiftsbeskrivningen under "Kom igång med uppgiften").
    getGames(true);

    $("#showAll").on("click", function () {
        getGames(true);
    });

    $("#onlyPublished").on("click", function () {
        getGames(false);
    });
    //Här skapar ni en händelsehanterare i jQuery som lyssnar på om användaren klickar i radio-knappen
    // ”Endast publicerad”. I händelse av en sådan klickning ska händelsehanteraren trigga en funktion,
    // som i sin tur ska anropa getGames, men med false som argument. (Se vidare punkt 9 i
    // uppgiftsbeskrivningen under "Kom igång med uppgiften").


});

function getGames(all) {

    $.ajax({
        url: "http://bgg-json.azurewebsites.net/hot", //Data saknas. Se vidare punkt 6 i uppgiftsbeskrivningen under "Kom igång med uppgiften".
        dataType: "json", //Data saknas. Se vidare punkt 6 i uppgiftsbeskrivningen under "Kom igång med uppgiften".
        type: 'GET',
        data: {
            get_param: 'value'
            //callback: //Data saknas. Se vidare punkt 6 i uppgiftsbeskrivningen under "Kom igång med uppgiften".
        },
        // Om förfrågan gått bra...

        success: function (response) {
            console.log("Förfrågan gick bra!");

            var items = [],
                i = 0,
                numberOfGames = 0,
                rank = 1;

            if (all) {
                $.each(response, function (index, value) {
                    var gameThumbnail = value.thumbnail;
                    var gameName = value.name;
                    var gameRank = value.rank;
                    var gamePublished = value.yearPublished;

                    numberOfGames++;

                    //Plocka dynamiskt ut namnet på spelet ur JSON-listan och se till att det visas mellan h2-taggarna.
                    // Se till att namnet föregås av rätt placering på heta listan (1, 2, 3 .. n).
                    // Plocka dynamiskt ut årtalet då spelet publicerades ur JSON-listan och se till att det visas efter
                    // ”Publicerat: ”. Kom ihåg att även uppdatera ev variabler med nya värden här.
                    // (Se vidare punkt 7a, 7b och 7c i uppgiftsbeskrivningen under "Kom igång med uppgiften").
                    // Förutom namn, årtal och listplacering på spelen skall även bilder skrivas ut.
                    // Externa URL:er till bilderna kan hämtas ut från svaret vi fått från webbtjänsten,
                    // mer specifikt som egenskapen thumbnail. Se till att infoga bild-element direkt under
                    // föräldraelementet article. (Se vidare punkt 8 i uppgiftsbeskrivningen under "Kom igång med uppgiften").

                    //Fixa alt - texten
                    //items.push("<article><img src="+ gameThumbnail+" alt='Games thumbnail'><h2>"+gameRank+". "+gameName+"</h2><p>Publicerat: "+gamePublished+"</p></article>");
                    items.push("<article><img src='" + gameThumbnail + "' alt='Games thumbnail'>" +
                        "<h2>" + gameRank + ". " + gameName + "</h2>" +
                        "<p>Publicerat: " + gamePublished + "</p></article>");

                });
            } else {

                //Skriv kod i else-satsen, som reagerar på om getGames inparameter inte är sann.
                // M a o: vad händer om användaren klickat i radio-knappen ”Endast publicerade”?
                // Kom ihåg att även uppdatera ev variabler med nya värden här.
                // (Se vidare punkt 10 i uppgiftsbeskrivningen under "Kom igång med uppgiften").

                $.each(response, function (index, value) {
                    var gameThumbnail = value.thumbnail;
                    var gameName = value.name;
                    var gameRank = value.rank;
                    var gamePublished = value.yearPublished;


                    if(gamePublished <= 2022) {
                        numberOfGames++;
                        //items.push("<article><img src="+ gameThumbnail+" alt='Games thumbnail'><h2>"+gameRank+". "+gameName+"</h2><p>Publicerat: "+gamePublished+"</p></article>");
                        items.push("<article><img src='" + gameThumbnail + "' alt='Games thumbnail'>" +
                            "<h2>" + numberOfGames + ". " + gameName + "</h2>" +
                            "<p>Publicerat: " + gamePublished + "</p></article>");


                    }
                });
            }


            $("#games").html(items.join(""));

            //Få till så de står "Antal spel" innan nummer + fixa siffran som misstämmer atm
            //$("#noOfGames").html(items.push("<p>Antal spel: "+numberOfGames+"</p>"));
            
            $("#noOfGames").text("Antal spel: " + numberOfGames);


            //Uppdatera sidfoten med antal spel som faktiskt visas.
            // Denna siffra tas fram dynamiskt och förändras därför beroende på
            // vilken radio-knapp som är förkryssad. (Se vidare punkt 11 i uppgiftsbeskrivningen
            // under "Kom igång med uppgiften").
        }

        //error: function(error) {
        //    console.log('Error ${error}');
        //}
    });
}
