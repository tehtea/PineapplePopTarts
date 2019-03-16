/**
 * Credits to
 * https://botwiki.org/resource/tutorial/random-image-tweet/
 */

var path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'twitterConfig.js'));

function postTweet(message)
{
    var T = new Twit(config);

    T.post('statuses/update', { status: message }, function(err, data, response) {
        if (err)
            console.log(err);
        else
            if (response)
                console.log("Tweet successfully posted!");
    });
}

postTweet("Huge explosion in Nanyang Technological University's School of Computer Science and Engineering reported on 16/3/19 at 21:50")

