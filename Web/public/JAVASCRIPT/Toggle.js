/**
 * For toggling the filters on the map. Contains functions used by Map.js
 */


/**
 * Show markers for the category specified.
 * @param {string} cat - category as specified by the keys of the `inputs` global variable.
 */
function show(cat) {
  //tick checkbox
  document.getElementById(cat + "box").checked = true;
  for (var i = 0; i < markers[cat].length; i++) {
    markers[cat][i].setVisible(true);
  }
}

/**
 * Hide markers for the category specified
 * @param {string} cat - category as specified by the keys of the `inputs` global variable.
 */
function hide(cat) {
  //clear checkbox
  document.getElementById(cat + "box").checked = false;
  for (var i = 0; i < markers[cat].length; i++) {
    markers[cat][i].setVisible(false);
  }
}

/**
 * Callback for each filter's checkbox.
 * @param {string} box - the DOM object associated with the checkbox
 * @param {string} cat - the category to be filtering using
 */
function boxclick(box, cat) {
  closeCurrentInfoWindow();
  if (box.checked) {
    show(cat);
  } else {
    hide(cat);
  }
}

/**
 * Current info window is the popup that appears on the map.
 * This is used as a callback function for closing any info window that is currently appearing.
 */
function closeCurrentInfoWindow() {
  if (currentInfoWindow != null) {
    currentInfoWindow.close();
  }
}
