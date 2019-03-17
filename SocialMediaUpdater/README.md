# Social Media Updater

The backend scripts which will update the system's Facebook page and Twitter accounts.

Links to them here:
- https://www.facebook.com/Pineapplepoptartscms-262765314600132/
- https://twitter.com/Pineapp04967829

## tweeter.js
Contains the main logic for posting a new tweet. Reads the configuration for communication with the Twitter API from `twitterConfig.js`

## twitterConfig.js
Contains the configuration data for communication with the Twitter api. Twitter uses OAuth 1.0a protocol for authenticating all HTTP communications with their API.

## facebookPoster.js
Contains the main logic for posting a Facebook post on a page.
Reads config data from `facebookConfig.js`.

## facebookConfig.js
Contains the page id for the page we are posting to and the page access token we are using. Do note that the page access token might be a bit buggy due to limited understanding of its lifespan at this point.

## ./test/test.js
Contains the unit tests for the subsystem. The unit testing framework used is `Mocha`.

## Directions
To run this, run `npm install` to install all dependencies first.

To run the unit tests, run `npm test`.
