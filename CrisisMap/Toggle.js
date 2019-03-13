
  //keep track of Info Window that is currently open
  var currentInfoWindow = null;


  //show markers
  function show(cat){
    for (var i=0; i<markers[cat].length; i++){
      markers[cat][i].setVisible(true);
    }
    //tick checkbox
    document.getElementById(cat + "box").checked = true;
  }

  //hide markers
  function hide(cat){
    for (var i=0; i<markers[cat].length; i++){
      markers[cat][i].setVisible(false);
    }
    //clear checkbox
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
