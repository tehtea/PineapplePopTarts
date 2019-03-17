/**
 * There are multiple kinds of tokens in the Facebook API. 
 * 
 * To post on pages, you need to get an app token first,
 * followed by a user access token with the manage_pages and publish_pages permissions,
 * then a token for page access.
 * 
 * In the end, I got a short-term page access token, then extended its life to 2 months using this tutorial: https://dev.to/daviducolo/permanent-facebook-page-access-token-3epi
 * See: https://developers.facebook.com/docs/pages/getting-started
 * 
 * For now, the page access token is hardcoded into this file, but in a proper project it should be read from a text file for extensibility.
 * 
 * Anyway, this code should do very basic stuff: it should just get the latest incident report from the call operator interface
 * and parse it into a facebook post to be posted.
 * 
 * Tl;dr: this script alone is good enough for posting on Facebook for at least 2 months until May 2019. 
 */

 // modules and libraries
const 	request = require('request'),
		path 	= require('path');

/**
 * Post something on the page. If the post is successful, resolve the new Promise created, and if it is unsuccessful, reject it.
 * @param pageId pageId of the page to post to
 * @param postMessage the message to be posted
 * @param pageAccessToken the page access token required to authenticate the request with Facebook API.
 * 
 * @returns a Promise.
 * */ 
function postOnPage(pageId, postMessage, pageAccessToken) {
	return new Promise((resolve, reject) => {
		var options = {
			url: `https://graph.facebook.com/${pageId}/feed?message=${postMessage}`,
			headers: {
				'Authorization': 'Bearer' + ' ' + `${pageAccessToken}`
			}
		};
		request.post(options).on('response', function(response) {
			if (response.statusCode == 200)
				resolve(response.statusCode);
			else 
				reject(response.statusCode);
		});
	});
}

module.exports = {postOnPage};