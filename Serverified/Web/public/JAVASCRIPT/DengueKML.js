var kmlLayer;

//get data from KML
function getKMLLayer(src) {
  var kmlLayer = new google.maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: map
  });
  return kmlLayer;
}

//toggle KML Layer
function toggleKML(box, cat) {
  closeCurrentInfoWindow();
  if (box.checked) {
    kmlLayer.setMap(map);
    document.getElementById(cat + "box").checked = true;
  } else {
    kmlLayer.setMap(null);
    document.getElementById(cat + "box").checked = false;
  }
}
