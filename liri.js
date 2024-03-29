require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var operand = process.argv[2];
var input = process.argv.slice(3).join(" ");

if (operand === "movie-this") {
    movieThis(input);
} else if (operand === "concert-this") {
    concertThis(input);
} else if (operand === "spotify-this-song") {
    spotifyThis(input);
} else if (operand === "do-what-it-says") {
    doThis(input)
}

function movieThis(movie) {
    if (!movie) {
        movie = "Mr. Nobody";
        console.log("If you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netflix!")
    }
    axios
        .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if (error.request) {
                console.log(error.request);
            }
            else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function concertThis(artist) {
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            var date = moment(response.data[0].datetime).format('MM/DD/YYYY');
            console.log(response.data[0].lineup);
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city, response.data[0].venue.country);
            console.log(date);
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if (error.request) {
                console.log(error.request);
            }
            else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function spotifyThis(song) {
    if (!song) {
        song = "The Sign";
        console.log(song);
    }
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Title: " + response.tracks.items[0].name);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("Preview: " + response.tracks.items[0].preview_url)
        })
        .catch(function (err) {
            console.log(err);
        });
}

function doThis() {
    fs
        .readFile("random.txt", "utf8", function (error, data) {

            if (error) {
                return console.log(error);
            }

            console.log(data);

            var dataArr = data.split(",");

            console.log(dataArr);
            process.argv[2] = dataArr[0];
            song = dataArr[1];
            spotifyThis(song);            
        });
}