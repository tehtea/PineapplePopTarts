var kmlLayer;
/** 
 * Get data from KML
 * @param {Object} src source for google map kml layer
 * @returns the kmlLayer
 */
function getKMLLayer(src){
  var kmlLayer = new google.maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: map
  });
  return kmlLayer;
}

/**
 * Toggle the KML layer
 * @param {Object} box the checkbox 
 & @param {Object} cat the category
 */
function toggleKML(box, cat){
  closeCurrentInfoWindow();
  if (box.checked) {
    kmlLayer.setMap(map);
    document.getElementById(cat + "box").checked = true;
  } else {
    kmlLayer.setMap(null);
    document.getElementById(cat + "box").checked = false;
  }
}
