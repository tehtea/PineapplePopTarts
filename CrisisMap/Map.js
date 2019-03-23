/* Algorithm for fetching incident data to display on map:
1. Make sure each incident data has longitude and latitude
2. Make your frontend connect and talk with CM.js
3. Everytime something new comes from CM.js, display the incident on the map
*/
// https://github.com/tehtea/PineapplePopTarts/tree/master/CallCenterOperatorInterface/Code/JAVASCRIPT

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
  incident: 'http://maps.google.com/mapfiles/ms/micons/caution.png',
  shelter: 'http://maps.google.com/mapfiles/ms/micons/homegardenbusiness.png',
  weather: 'http://maps.google.com/mapfiles/ms/micons/rainy.png',
  hospital: 'http://maps.google.com/mapfiles/ms/micons/hospitals.png',
  dengue: ''
};

//Object to store arrays of Google Markers
var markers = {incident: [], shelter: [],
  weather: [], hospital: [], dengue: []
};

//store map and kmlLayer globally
var map;


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
        },
        {
          featureType: 'all',
          elementType: 'labels.icon',
          stylers: [{visibility: 'off'}]
        }
      ]
  }

  //new map
  map = new google.maps.Map(document.getElementById('map'), options);

  //get incident data
  var socket = io.connect('http://localhost:3333');

  socket.on('connect', function(){
  	console.log("received connection on port 3335 from PCTC.js");
  	socket.on('incidents', function(result){
  		incidents = result;
  		console.log(incidents);
  	});
  });
  socket.on('disconnect', function(){});

  //get api data
  getWeatherData();

  //get KML layer
  var src = 'https://sites.google.com/site/kmlfiles5473666/kml/dengue-clusters-kml.kml';
  kmlLayer = getKMLLayer(src);

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
  show('dengue');

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
      case 'incident':
        google.maps.event.addListener(marker, 'click', function(){
          //close current window and open another upon clicking marker
          closeCurrentInfoWindow();
          infoWindow.setContent("[Incident]: " +
            input["name"]
          );
          infoWindow.open(map, marker);
          currentInfoWindow = infoWindow;
        })
        break;
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
