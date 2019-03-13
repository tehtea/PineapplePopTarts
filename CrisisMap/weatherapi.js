
  function getData(){
    //alert('ajax');

    var receivedData; // store your value here
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast",
        async: false,
        success: function(data){
            receivedData = data;
        }
    });

    return receivedData;
  };

  //get marker data from api (weather)
  function getWeatherData(){
    $.getScript("weatherapi.js");
    var dataPoints;
    dataPoints = getData();
    //console.log(dataPoints["area_metadata"]["0"]["label_location"]["latitude"]);
    for (let i=0; i<dataPoints["area_metadata"].length; i++){
      inputs["weather"].push(dataPoints["area_metadata"][i]);
    }
    data["weather"] = dataPoints;
    console.log(data);
  }
