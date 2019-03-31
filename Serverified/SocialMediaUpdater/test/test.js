/**
 * Script which executes unit tests for all functions in the subsystem. 
 */

const assert          = require('assert');
const tweeter         = require('../tweeter');
const twitterConfig   = require('../twitterConfig');
const facebookPoster  = require('../facebookPoster');
const facebookConfig  = require('../facebookConfig');

describe('facebookPoster', function() {
  
    describe('#postOnPage', function() {
it('should return HTTP status code 200 when the post is successful. \
If post is unsuccessful, the only acceptable status code should be 400 \
which means that the post is a duplicate of a recent one previously posted.', function() {

          var promiseFromPost = facebookPoster.postOnPage(facebookConfig.PAGE_ID, 
            "Another huge explosion in Nanyang Technological\
            University's School of Computer Science\
              and Engineering reported on 17/3/19 at 13:50",
              facebookConfig.pageAccessToken);

          promiseFromPost.then(function(statusCode) {
            assert.equal(statusCode, 200);
          }).catch(function(statusCode) {
            assert.equal(statusCode, 400);
          })
        });
    });

});

describe('tweeter', function() {

  describe('#postTweet', function() {
it('should return HTTP status code 200 when the post is successful. \
If post is unsuccessful, the only acceptable status code should be 403 \
which means that the tweet is a duplicate of a recent one previously posted.', function() {

          var promiseFromTweet = tweeter.postTweet( 
            "Another huge explosion in Nanyang Technological\
            University's School of Computer Science\
              and Engineering reported on 17/3/19 at 13:50",
            twitterConfig);

            promiseFromTweet.then(function(statusCode) {
                assert.equal(statusCode, 200);
            }).catch(function(statusCode) {
                assert.equal(statusCode, 403);
            });

        });
    });
});