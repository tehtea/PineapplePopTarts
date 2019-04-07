/**
 * API data fetcher class
 */
module.exports = {
	/**
	 * Fetch the data from the weather API for the status report
	 * @returns {object} data on Singapore's weather information
	 */
  fetchData: function () {
    return new Promise(function (resolve, reject) {
      var io = require("socket.io-client");
      var socket = io.connect('http://172.21.146.196:5001', { reconnect: true });
      // Connect to server
      socket.on('connect', function () {
        console.log('Connected to Weather.js');
        // Request data from CrisisMap/Weather.js
        socket.emit('apiRequest');
        // Retrieve data
        socket.on('apiRequestDone', function (data) {
          resolve(data);
        })
      });
    });
  }
}