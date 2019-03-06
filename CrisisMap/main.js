  //Initialisations

  //keep track of Info Window that is currently open
  var currentInfoWindow = null;

  //Object storing all the data (api + bomb shelters + hospitals)
  //KIV for further use/deletion (may help in marker infoboxes)
  //a.k.a local copy of data
  var data = {incident: {}, shelter: {},
    weather: {}, hospital: {}, dengue: {}
  };

  //Object storing marker input coords only
  var inputs = {incident: [], shelter: [],
    weather: [], hospital: [], dengue: []
  };

  //Object of icons for each type
  var icons = {
    incident: '',
    shelter: '',
    weather: '',
    hospital: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    dengue: ''
  };

  //Object to store arrays of Google Markers
  var markers = {incident: [], shelter: [],
    weather: [], hospital: [], dengue: []
  };

  function initMap(){
    //settings of map zoom and map's initial centre
    var options = {
      zoom: 11,
      center: {lat: 1.3521, lng: 103.8198},
      //night mode style
      styles: [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ]
    }
    //new map
    var map = new google.maps.Map(document.getElementById('map'), options);

    //get api data
    getWeatherData();

    //manual input of bomb shelters & hospitals
    addHospitals();
    addShelters();

    //loop through inputs object
    for (let cat in inputs){
      for (let i=0; i<inputs[cat].length; i++){
        addMarker(inputs[cat][i], cat, i);
      }
    }

    //initialise categories
    show('incident');
    hide('shelter');
    hide('hospital');
    hide('weather');
    hide('dengue');

    //close window upon clicking on map, outside markers
    google.maps.event.addListener(map, 'click', function(event){
      closeCurrentInfoWindow();
    })

    //add marker on map and append to array
    function addMarker(input, cat, i){
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
      switch (cat){
        case 'shelter':
          google.maps.event.addListener(marker, 'click', function(){
            //close current window and open another upon clicking marker
            closeCurrentInfoWindow();
            infoWindow.setContent("[Shelter]: " +
              input["name"]
            );
            infoWindow.open(map, marker);
            currentInfoWindow = infoWindow;
          })
          break;
        case 'hospital':
          google.maps.event.addListener(marker, 'click', function(){
            //close current window and open another upon clicking marker
            closeCurrentInfoWindow();
            infoWindow.setContent("[Hospital]: " +
              input["name"]
            );
            infoWindow.open(map, marker);
            currentInfoWindow = infoWindow;
          })
          break;
        case 'weather':
          google.maps.event.addListener(marker, 'click', function(){
            //close current window and open another upon clicking marker
            closeCurrentInfoWindow();
            infoWindow.setContent("[Weather]: " +
              input["name"] + " (" +
              data['weather']['items'][0]['forecasts'][i]['forecast'] +
              ")"
            );
            infoWindow.open(map, marker);
            currentInfoWindow = infoWindow;
          })
          break;
        default:
          console.log("Type of marker undefined. Marker not added.")
          break;
      }

      markers[cat].push(marker); //append to category's marker array

    }

  }

  //manual input of hospitals
  function addHospitals(){
    inputs['hospital'][0] = {name: "Khoo Teck Puat",
      label_location: {latitude: 1.4246, longitude: 103.8382}
    };
  }

  //manual input of bomb shelters
  function addShelters(){
    inputs['shelter'][0] = {name: "Yishun Ring Rd",
      label_location: {latitude: 1.432110, longitude: 103.841280}
    }
  }

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

  //show markers
  function show(cat){
    for (var i=0; i<markers[cat].length; i++){
      markers[cat][i].setVisible(true);
    }
    //tick checkbox
    document.getElementById(cat + "box").checked = true;
    alert("Displaying " + cat + " markers\nNo. of markers: " + markers[cat].length);
  }

  //hide markers
  function hide(cat){
    for (var i=0; i<markers[cat].length; i++){
      markers[cat][i].setVisible(false);
    }
    //clear checkbox and close any open info window
    document.getElementById(cat + "box").checked = false;
  }

  //clicking checkbox function
  function boxclick(box, cat){
    closeCurrentInfoWindow();
    if (box.checked){
      show(cat);
    }
    else {
      hide(cat);
    }
  }

  //close current infoWindow
  function closeCurrentInfoWindow(){
    if (currentInfoWindow != null){
      currentInfoWindow.close();
    }
  }
