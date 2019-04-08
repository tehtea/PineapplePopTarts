/**
 * Credits to
 * https://botwiki.org/resource/tutorial/random-image-tweet/
 */

var path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'twitterConfig.js'));

/**
 * Posts a tweet to the account associated with the configuration specified.
 * @param message the tweet message.
 * @param config the configuration data for tweeting. 
 * Includes the consumer_key, consumer_secret, access_token and access_token_secret.
 * Twitter API uses it to identify which account to tweet using.
 * 
 * @returns a resolved Promise if tweet is succcessful, and a rejected Promise if tweet is unsuccessful.
 */
function postTweet(message, config)
{
    var T = new Twit(config);
    return new Promise(function(resolve, reject) {
        T.post('statuses/update', { status: message }, function(err, data, response) {
            if (response.statusCode == 200)
            {
                resolve(response.statusCode);
            }
            else
            {
                reject(response.statusCode);
            }
        });
    });
}

module.exports = {postTweet};