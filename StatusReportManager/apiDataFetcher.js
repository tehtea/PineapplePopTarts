module.exports = {
  fetchData: function () {
    return new Promise(function (resolve, reject) {
      var io = require("socket.io-client");
      var socket = io.connect('http://localhost:5001', { reconnect: true });
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

/*
for (let i = 1; i < data["area_metadata"].length + 1; i++) {
          weatherData[i] = data["area_metadata"][i - 1];
        }
        weatherData[0] = data;
        console.log('Weather data received!');
        return weatherData;
        */