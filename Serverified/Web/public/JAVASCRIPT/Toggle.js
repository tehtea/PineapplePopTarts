/**
 * For toggling the filters on the map.
 */

  //keep track of Info Window that is currently open
  var currentInfoWindow = null;


  //show markers
  function show(cat){
    //tick checkbox
    document.getElementById(cat + "box").checked = true;
    for (var i=0; i<markers[cat].length; i++){
      markers[cat][i].setVisible(true);
    }
  }

  //hide markers
  function hide(cat){
    //clear checkbox
    document.getElementById(cat + "box").checked = false;
    for (var i=0; i<markers[cat].length; i++){
      markers[cat][i].setVisible(false);
    }
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
