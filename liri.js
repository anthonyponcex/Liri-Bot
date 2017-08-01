
var Twitter = require('twitter');
var fs = require('file-system');
var keys = require('./keys.js');

var request = require('request');


//Giving first command line a Variable
var nodeArg = process.argv[2];
var nodeArg2 = process.argv[3];

///////////////////// Functions //////////////////////
var getMyTweets = function() {
    var client = new Twitter(keys.twitterKeys);
    var params = {screen_name: 'liribot1'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for(var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at + "\n");
                console.log(tweets[i].text);
            }
        }
    });
}

var getSpotSong = function() {
    request('http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + nodeArg2 + '&api_key=fb6d3665dab0f479fdd67ee22b3e516e&format=json'
    , function (error, response, body) {
        console.log("Artist: " + JSON.parse(body).results.trackmatches.track[0].artist);
        console.log("Song Name: " + JSON.parse(body).results.trackmatches.track[0].name);
        console.log("URL: " + JSON.parse(body).results.trackmatches.track[0].url);
    });
}

var getMovies = function () {
    request('http://www.omdbapi.com/?apikey=fd384cc4&?t=' + nodeArg2 + "&y=&plot=short&r=json"
    , function (error, response, body) {
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB: " + JSON.parse(body).imdbRating);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("RT Score: " + JSON.parse(body).Ratings);
    });
}

///////////////////// Arguments //////////////////////
// if statement setting for up when users type 'get-tweets'
var Arguments = function(nodeArg, nodeArg2, err) {
if (nodeArg == "my-tweets") {
    //Runs function and gets all tweets
    getMyTweets();
} 
if (nodeArg == "spotify-this-song") {
    //Runs function to get spotify song information
    getSpotSong();
} 
if (nodeArg == "movie-this") {
    getMovies();
} 
if (nodeArg === "do-what-it-says") {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) throw err;
        var arr = data.split(',');
        if (arr.length == 2) {
            run(arr[0], arr[1]);
        } else if (arr.length == 1) {        
        nodeArg = data
        Arguments(data);        
    }
    console.log(data)
    });
}
else {
    console.log("Not a liri function. Try my-tweets, spotify-this-song songname, movie-this moviename, or");
}
};

var run = function(nodeArg, nodeArg2) {
    Arguments(nodeArg, nodeArg2)
};

run(process.argv[2], process.argv[3]);
