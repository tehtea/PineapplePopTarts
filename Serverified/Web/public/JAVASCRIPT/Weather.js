/**
 * For fetching weather data from the government API. Used by the map.
 */

var io = require('./Apps/node_modules/socket.io').listen(5001);
var fetch = require('./Apps/node_modules/isomorphic-fetch');

module.exports = {
	runWeather: async function() {
		console.log("Weather.js is running.");

		io.sockets.on('connect', function(socket){
		  console.log("Connected to SRM on port 5001");

		  socket.on('apiRequest', function(){
			fetch("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast").then(response => {
			  return response.json();
			}).then(data => {
			  socket.emit('apiRequestDone', data);
			});
		  });
		});
	}
}
function getData(){
    //alert('ajax');

    var receivedData; // store your value here
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast",
        async: false,
        success: function(data){
            // console.log('got the data!');
            receivedData = data;
        }
    });
    // console.log("returning from function");
    return receivedData;
};

//get marker data from api (weather)
function getWeatherData(){
    var dataPoints;
    dataPoints = getData();
    for (let i=0; i<dataPoints["area_metadata"].length; i++){
        inputs["weather"].push(dataPoints["area_metadata"][i]); // inputs is a global variable for setting markers
    }
    data["weather"] = dataPoints;
    // console.log("weather data from Weather.js:");
    // console.log(data);
}

// export {getData};
