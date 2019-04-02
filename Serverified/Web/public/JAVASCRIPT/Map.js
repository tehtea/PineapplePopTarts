/* Algorithm for fetching incident data to display on map:
1. Make sure each incident data has longitude and latitude
2. Make your frontend connect and talk with CM.js
3. Everytime something new comes from CM.js, display the incident on the map
*/

//Object storing all the data (api + bomb shelters + hospitals)
//KIV for further use/deletion (may help in marker infoboxes)
//a.k.a local copy of data
var data = { incident: {}, shelter: {}, weather: {}, hospital: {}, dengue: {} };

// global variable for socket connection
var socket = io.connect("localhost:5000");

//Object storing marker input coords only
var inputs = {
  incident: [],
  shelter: [],
  weather: [],
  hospital: [],
  dengue: []
};

//Object of icons for each type
var icons = {
  incident: "http://maps.google.com/mapfiles/ms/micons/caution.png",
  shelter: "http://maps.google.com/mapfiles/ms/micons/homegardenbusiness.png",
  weather: "http://maps.google.com/mapfiles/ms/micons/rainy.png",
  hospital: "http://maps.google.com/mapfiles/ms/micons/hospitals.png",
  dengue: ""
};

//Object to store arrays of Google Markers
var markers = {
  incident: [],
  shelter: [],
  weather: [],
  hospital: [],
  dengue: []
};

//store map and kmlLayer globally
var map;

function initMap() {
  //settings of map zoom and map's initial centre
  var options = {
    zoom: 11,
    center: { lat: 1.3521, lng: 103.8198 },
    //night mode style
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }]
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }]
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }]
      },
      {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }]
      }
    ]
  };

  //new map
  map = new google.maps.Map(document.getElementById("map"), options);

  initialiseMarkers();

  //close window upon clicking on map, outside markers
  google.maps.event.addListener(map, "click", function(event) {
    closeCurrentInfoWindow();
  });

  //FUNCTIONS
  function initialiseMarkers() {
    var z = retrieveData();
    z.then(result => {
      inputs = result; //store in inputs (no idea if it works but not needed actually)
    });
  }

  /**
   * Get incident data, API data,  on first run of the map
   */
  function retrieveData() {
    return new Promise((resolve, reject) => {
      // get incident data
      socket.emit("cmRequest", function() {
      });
      socket.on("cmRequestDone", async function(result) {

        var incidents;
        incidents = await incidentDataProcessing(result);

        for (let i = 0; i < incidents.length; i++) {
          inputs["incident"].push({
            name:
              incidents[i]["initDescr"] +
              "<br>Address: " +
              incidents[i]["address"],
            label_location: {
              latitude: parseFloat(incidents[i]["lat"]),
              longitude: parseFloat(incidents[i]["lng"])
            },
            updates: incidents[i]["updDescr"],
            time: incidents[i]["time"]
          });
        }

        //get api data
        getProcessedWeatherData();

        //get KML layer
        var src =
          "https://sites.google.com/site/kmlfiles5473666/kml/dengue-clusters-kml.kml";
        kmlLayer = getKMLLayer(src);

        //manual input of bomb shelters & hospitals
        addHospitals();
        addShelters();

        //loop through inputs object
        //to add markers
        for (let cat in inputs) {
          for (let i = 0; i < inputs[cat].length; i++) {
            addMarker(inputs[cat][i], cat, i);
          }
        }

        //initialise categories
        hide("shelter");
        hide("hospital");
        hide("weather");
        show("dengue");
        show("incident");

        resolve(inputs); //edit inputs, then add Markers inside the "then" block
      });
    });
  }

  //add marker on map and append to array
  function addMarker(input, cat, i) {
    var marker = new google.maps.Marker({
      position: {
        lat: input["label_location"]["latitude"],
        lng: input["label_location"]["longitude"]
      },
      map: map,
      icon: icons[cat]
    });

    var infoWindow = new google.maps.InfoWindow();
    //different infowindows for different categories
    switch (cat) {
      case "incident":
        google.maps.event.addListener(marker, "click", function() {
          //close current window and open another upon clicking marker
          closeCurrentInfoWindow();
          let content =
            "[Incident]: " +
            input["name"] +
            "<br>Latest update: " +
            input["updates"] +
            "<br>Time: " +
            input["time"] +
            "<br>";
          if (input["updDescr"]) {
            content = content + "UPDATE: " + input["updDescr"];
          }
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
          currentInfoWindow = infoWindow;
        });
        break;
      case "shelter":
        google.maps.event.addListener(marker, "click", function() {
          //close current window and open another upon clicking marker
          closeCurrentInfoWindow();
          infoWindow.setContent("[Shelter]: " + input["name"]);
          infoWindow.open(map, marker);
          currentInfoWindow = infoWindow;
        });
        break;
      case "hospital":
        google.maps.event.addListener(marker, "click", function() {
          //close current window and open another upon clicking marker
          closeCurrentInfoWindow();
          infoWindow.setContent("[Hospital]: " + input["name"]);
          infoWindow.open(map, marker);
          currentInfoWindow = infoWindow;
        });
        break;
      case "weather":
        google.maps.event.addListener(marker, "click", function() {
          //close current window and open another upon clicking marker
          closeCurrentInfoWindow();
          infoWindow.setContent(
            "[Weather]: " +
              input["name"] +
              " (" +
              data["weather"]["items"][0]["forecasts"][i]["forecast"] +
              ")"
          );
          infoWindow.open(map, marker);
          currentInfoWindow = infoWindow;
        });
        break;
      default:
        break;
    }

    markers[cat].push(marker); //append to category's marker array
  }
}

// fetch weather data from data.gov.sg api
function getRawWeatherData() {

  var receivedData; // store your value here
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast",
    async: false,
    success: function(data) {
      receivedData = data;
    }
  });
  return receivedData;
}

// process marker data from the api
function getProcessedWeatherData() {
  var dataPoints;
  dataPoints = getRawWeatherData();
  for (let i = 0; i < dataPoints["area_metadata"].length; i++) {
    inputs["weather"].push(dataPoints["area_metadata"][i]); // inputs is a global variable for setting markers
  }
  data["weather"] = dataPoints;
}

/**
 * For fetching a new incident
 */
socket.on("newIncidentReported", function(incident) {
  var x = incidentDataProcessing(result);
});

socket.on("newUpdateToIncident", function(update) {
  console.log("received update");
})

async function incidentDataProcessing(data) {
  /* Extract all unresolved incidents, with each has the following format:
   *	Location of the incident
   *	Unit Number of the incident
   *	Initial description of the incident
   *	Latest description of updates (if any)
   *	Time of the latest report on the incident
   */
  var newInc = data[0];
  var updInc = data[1];
  var result = [];
  var location, unitNum, initDescr, updDescr, time;

  for (var i = 0; i < newInc.length; i++) {
    if (newInc[i].Resolved == false) {
      location = newInc[i].Location;
      unitNum = newInc[i].UnitNum;
      initDescr = newInc[i].Descr;
      updDescr = "";

      // Format Time
      var date = new Date(newInc[i].InsTime);
      date.setHours(date.getHours() - 8);
      var time = date.toString().slice(4, 24);

      // Find any update incident for that recordID
      for (var j = 0; j < updInc.length; j++) {
        if (newInc[i].RecordID == updInc[j].RecordID) {
          if (newInc[i].InsTime <= updInc[j].UpdTime) {
            updDescr = updInc[j].Descr;

            // Format Time
            date = new Date(updInc[j].UpdTime);
            date.setHours(date.getHours() - 8);
            var time = date.toString().slice(4, 24);
          }
        }
      }

      var incident = {
        postalCode: location,
        unitNum: unitNum,
        initDescr: initDescr,
        updDescr: updDescr,
        time: time
      };
      result.push(incident);
    }
  }

  // Format coordinate
  var postalCodes = [];
  for (let i = 0; i < result.length; i++) {
    postalCodes.push(parseInt(result[i]["postalCode"]));
  }

  var coordsInfo = [];
  // var z;
  for (let i = 0; i < postalCodes.length; i++) {
    z = await getCoor(postalCodes[i]);
    // check if z is defined first. If z is not defined and we try and access it, the subsystem will crash.
    if (z) {
      result[i]["address"] = z["ADDRESS"];
      result[i]["lat"] = z["LATITUDE"];
      result[i]["lng"] = z["LONGITUDE"];
    }
  }

  return result;
}

function getCoor(postalCode) {
  return new Promise((resolve, reject) => {
    //PostalCodeToCoor.js
    const linkPart1 =
      "https://developers.onemap.sg/commonapi/search?searchVal=";
    const linkPart2 = "&returnGeom=Y&getAddrDetails=Y";

    // API link for data
    var GeneralLink = linkPart1 + postalCode + linkPart2;

    // Retrieve from API
    $.ajax({
      type: "GET",
      dataType: "json",
      url: GeneralLink,
      async: false,
      success: function(data) {
        resolve(data.results[0]) // get the first result
      }
    });

  });
}
