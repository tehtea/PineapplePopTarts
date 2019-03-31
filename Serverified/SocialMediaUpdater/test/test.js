/**
 * Script which executes unit tests for all functions in the subsystem. 
 */

const assert          = require('assert');
const tweeter         = require('../tweeter');
const twitterConfig   = require('../twitterConfig');
const facebookPoster  = require('../facebookPoster');
const facebookConfig  = require('../facebookConfig');

describe('facebookPoster', function() {
  
    describe('#postUniqueMessageOnPage', function() {
it('should return HTTP status code 200 when the post is successful.', function() {

          var promiseFromPost = facebookPoster.postOnPage(facebookConfig.PAGE_ID, 
            `Test post performed at time: ${new Date().getTime()}`,
              facebookConfig.pageAccessToken);

          promiseFromPost.then(function(statusCode) {
            assert.equal(statusCode, 200);
          }).catch(function(statusCode) {
            assert.fail(`Failed to post, returned with HTTP status code: ${statusCode}`);
          })
        });
    });

    describe('#invalidToken', function() {
      it('should not return HTTP status code 200 when an invalid access token is provided', function() {
        var promiseFromPost = facebookPoster.postOnPage(facebookConfig.PAGE_ID, 
          `Test post performed at time: ${new Date().getTime()}`,
            '29126');
            promiseFromPost.then(function(statusCode) {
              assert.notEqual(statusCode, 200);
            }).catch(function (statusCode) {
              assert.ok("Post was unsuccessful");
            });
      })
    })

});

describe('tweeter', function() {

  describe('#postUniqueTweet', function() {
it('should return HTTP status code 200 when the post is successful.', function() {

          var promiseFromTweet = tweeter.postTweet( 
            `Test post performed at time: ${new Date().getTime()}`,
            twitterConfig);

            promiseFromTweet.then(function(statusCode) {
                assert.equal(statusCode, 200);
            }).catch(function(statusCode) {
                assert.fail(`Failed to tweet, returned with HTTP status code: ${statusCode}`);
            });

        });
    });

    describe('#invalidToken', function() {
      it('should not return HTTP status code 200 when an invalid access token is provided', function() {
        var badTwitterConfig = twitterConfig;
        badTwitterConfig.access_token = 'lol';
        var promiseFromTweet = tweeter.postTweet( 
          `Test post performed at time: ${new Date().getTime()}`,
          badTwitterConfig);

          promiseFromTweet.then(function(statusCode) {
              assert.notEqual(statusCode, 200);
            }).catch(function (statusCode) {
              assert.ok("Post was unsuccessful");
            });
      })
    })
});