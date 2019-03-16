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
const request = require('request');

// app constants
const PAGE_ID = '262765314600132';
const pageAccessToken = 'EAAE30Mvcs0cBAGaLfkXy4UnaxxOiPGjd73me6SrKQp7kQ9sGzAWbJtJUvQUIH1qza3b3pigyktux79ymMaqUU1sEqljvRhJ66n993z77ZAMYFkByyjhPHHPk1x3rRWX24ZBKRSF0OwpKwbazwNWdxbsMEMUQaGk4AZBW6WHBW6B77qniFBF8LWFwNdRZBboZD';

// Post something on the page
function postOnPage(pageId, postMessage, pageAccessToken) {
    request.post(
			{
			url: `https://graph.facebook.com/${pageId}/feed?message=${postMessage}`,
			headers: {
				'Authorization': 'Bearer' + ' ' + `${pageAccessToken}`
			}
    }, (error, res, body) => {
			if (error) {
				console.error(error);
				return;
			}
			
			// check if posting is successful
			if (JSON.parse(body).id)
				console.log('post posted!');
			else
			{
				console.log('post failed to be posted for some reason');
				console.log('token: ' + pageAccessToken);
				console.log(body);
			}
		}
	)
}

postOnPage(PAGE_ID, "Ao ah ao sa la kau Singapore bo beh zao", pageAccessToken);