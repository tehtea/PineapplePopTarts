/**
 * There are multiple kinds of tokens in the Facebook API. 
 * 
 * To post on pages, you need to get an app token first,
 * followed by a user access token with the manage_pages and publish_pages permissions,
 * then a token for page access.
 * 
 * See: https://developers.facebook.com/docs/pages/getting-started
 */

 // modules and libraries
const request = require('request');
const express = require('express');

// expressJs constants
const app = express();
const port = 8080;

// other app constants
const PAGE_ID = '262765314600132';
const CLIENT_ID =  '342844889674567';
const CLIENT_SECRET = '41fb744d39ef2f8daad9a55350f2fe30';
const appAccessToken = getAppAccessToken(
    CLIENT_ID,
    CLIENT_SECRET
);
// TODO: automate the user access token generation process
const userAccessToken = 'EAAE30Mvcs0cBAO6Kg7ZBxNhVZBvC7LXZBwQZCMdl6VUtTvjaEXlNiwag6cabQfrURFKA3bzoiQ0pw9tILE6DuO0jsmEOG1XvS74bqsJTHrOKLbye9jKQXH8q6VZBvR3LLGVmK1W4gO9HQDP4IZCTKxqZC0URneNx6mUYDiGmnAJmVdNKm5JzurjDB3udsFcwsw6i5NPKAm3xnWeMkneAe19'
const pageAccessToken = getPageAccessToken(PAGE_ID, userAccessToken);

// get an app access token
function getAppAccessToken(client_id, client_secret) {
    request.get(`https://graph.facebook.com/oauth/access_token\
?client_id=${client_id}\
&client_secret=${client_secret}\
&grant_type=client_credentials`, function(error, body, response) {
        if (error) 
        {
            console.log("An error occurred");
            console.log(error);
            throw error;
        }
        else 
        {
            // console.log(response);
            res = JSON.parse(response);
            console.log("app access token: " + res.access_token);
            return res.access_token;
        }
    });
}

// get a page access token
function getPageAccessToken(pageId, userAccessToken) {
    request.get(`https://graph.facebook.com/${pageId}\
?fields=access_token\
&access_token=${userAccessToken}`, function(error, body, response) {
        if (error) 
        {
            console.log("An error occurred");
            console.log(error);
            throw error;
        }
        else 
        {
            response_as_json = JSON.parse(response);
            return response_as_json.access_token;
        }
    });
}

// Post something on the page
function postOnPage(pageId, postMessage) {
    request.post(`https://graph.facebook.com/${pageId}\
/feed?message=${postMessage}`, {
    json: {
        page_token: "lol"
    }
    }, (error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body)
    })
}

postOnPage(PAGE_ID, "Ka poh gi na si kiao kiao");
// const pageAccessToken = 'EAAE30Mvcs0cBAI1wDc21gzEZC0MYyPJ5FZC6UMbzqb4ZAA1A1vU5fTzsWoVR3PKLI16td0zP2OUCmZB7uKKYe2vKXYac74avLBO3gnpE6tawPZAbkQOF1EjeMsGrHfthV8pS9TAq1cSE7xLiNZCAbfBqu5E2RZC4bMdpFcol37pMQlsSocwN5jHWoFiXccS7Woa2Rktkj9OsxWZBLyXv4fNB'

// listen for the user access token
app.post('/', function(req, res) {
    console.log(res);
    res.status(200);
});