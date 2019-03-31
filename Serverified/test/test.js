/**
 * Shoutout to https://www.youtube.com/watch?v=r8sPUw4uxAI&index=2&list=WL&t=47s
 */

var request = require('supertest'),
    webServer = require('../Web/WebServer');
    socialMediaUpdater = require('../SocialMediaUpdater/SocialMedia');

describe("homepage", function(){
    it('welcomes the user', function(done) {
        request(webServer.app).get('/').expect(200).expect(/Get Started/, done);
    });
});

/**
 * Test that once a new incident is reported, 
 * 1. The database is updated
 * 2. new respondents contacted via sms
 * 3. a tweet has been posted
 * 4. the incident is posted on facebook
 * 5. incident should be in the next status report
 * 6. incident must be reflected on map
 */
describe("newIncidentReported", function() {
    it('shouldSendMessage', function() {
        
    });
});