/*
@author Viktor Sjöström, visj0016
date: 2023-02-14
 */

$(document).ready(function () {

    //Call:ar på funktionen getGames. Börjar med true för att alla spel ska visas
    //Nedan bestämt boolenska värdet beroende på vilken radio knapp som är intryckt
    getGames(true);

    $("#showAll").on("click", function () {
        getGames(true);
    });

    $("#onlyPublished").on("click", function () {
        getGames(false);
    });


});

function getGames(all) {

    $.ajax({
        url: "http://bgg-json.azurewebsites.net/hot",
        dataType: "jsonp",
        data: {

        },


        success: function (response) {
            console.log("Förfrågan gick bra!");

            var items = [],
                numberOfGames = 0;

            //Om boolenska värdet är true går man in i denna if-sats
            if (all) {
                $.each(response, function () {

                    numberOfGames++;

                    items.push("<article><img src='" + this.thumbnail + "' alt='Games thumbnail'>" +
                        "<h2>" + this.rank + ". " + this.name + "</h2>" +
                        "<p>Publicerat: " + this.yearPublished + "</p></article>");

                    /*
                    Lämnar kvar min "skämmiga" lösning, som jag gjorde innan jag lärde mig JS & jQuery.
                    För att ha kvar som en påminnelse att saker behöver inte alltid lösas snyggt, utan
                    huvudsaken att det funkar.

                    var gameThumbnail = value.thumbnail;
                    var gameName = value.name;
                    var gameRank = value.rank;
                    var gamePublished = value.yearPublished;

                    items.push("<article><img src='" + gameThumbnail + "' alt='Games thumbnail'>" +
                        "<h2>" + gameRank + ". " + gameName + "</h2>" +
                        "<p>Publicerat: " + gamePublished + "</p></article>");
                    */
                });
            } else {
            //Om boolenska värdet är false går man in i else-satsen


                $.each(response, function () {


                    if(this.yearPublished <= 2022) {
                        numberOfGames++;

                        items.push("<article><img src='" + this.thumbnail + "' alt='Games thumbnail'>" +
                            "<h2>" + this.rank + ". " + this.name + "</h2>" +
                            "<p>Publicerat: " + this.yearPublished + "</p></article>");
                    }
                });
            }


            $("#games").html(items.join(""));
            
            $("#noOfGames").text("Antal spel: " + numberOfGames);

        }

    });
}
