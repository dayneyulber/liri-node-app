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