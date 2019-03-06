
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
