/**
 * API data fetcher class
 */

const request = require('request');

/**
 * Fetch the data from the weather API for the status report
 * @returns {object} data on Singapore's weather information
 */
function fetchData() {
  return new Promise(function(resolve, reject) {
    request('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast', { json: true }, (err, res, body) => {
      if (err) { throw(err) }
      if (res.statusCode == 200 && res.headers['content-type'].includes("application/json"))
      {
        resolve(body);
      }
      else
        throw ("cannot get data but no error provided");
    });
  });
};

module.exports = {
  fetchData: fetchData
}
