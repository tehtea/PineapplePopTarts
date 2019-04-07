
  //keep track of Info Window that is currently open
  var currentInfoWindow = null;

  /**
   * Show markers on map
   * @param {string} cat the category
   */
  function show(cat){
    //tick checkbox
    document.getElementById(cat + "box").checked = true;
    for (var i=0; i<markers[cat].length; i++){
      markers[cat][i].setVisible(true);
    }
  }

  /**
   * Hide markers on map
   * @param {string} cat the category
   */
  function hide(cat){
    //clear checkbox
    document.getElementById(cat + "box").checked = false;
    for (var i=0; i<markers[cat].length; i++){
      markers[cat][i].setVisible(false);
    }
  }

  /**
   * Update markers when checkbox are selected
   * @param {string} cat the category
   * @param {object} box the checkbox
   */
  function boxclick(box, cat){
    closeCurrentInfoWindow();
    if (box.checked){
      show(cat);
    }
    else {
      hide(cat);
    }
  }

  /**
   * Close current infoWindow
   */
  function closeCurrentInfoWindow(){
    if (currentInfoWindow != null){
      currentInfoWindow.close();
    }
  }
