// Boundary Class - Form UI

/* For form validation,
		1. Ensure that the format of inputs are correct
		2. If correct, send POST to backend with the data.
*/

/**
 * Submission of new incident form
 * @return {boolean} refresh page 
 */
function formSubmission() {
 	// Input type: name, contact, address, unitNum, respondent, description
	var name = document.forms["incidentForm"]["name"].value;
	var contact = document.forms["incidentForm"]["contact"].value;
	var address = document.forms["incidentForm"]["address"].value;
	var unitNum = document.forms["incidentForm"]["unitNum"].value;
	var respondent = [];
	var j = 0;
	for (var i = 0; i < document.forms["incidentForm"]["respondentRequested"].length; i ++) {
		var tempR = document.forms["incidentForm"]["respondentRequested"][i];
		if (tempR.checked) {
			respondent[j] = tempR.value;
			j ++;
		}
	}

	var descr = document.forms["incidentForm"]["descr"].value; 

	// Adjustment on description
	for (var c=0;c < descr.length; c ++) {
		if (descr.charAt(c) == '\'') {
			descr = descr.substr(0,c) + '"' + descr.substr(c+1);
			console.log("change");
		}
	}
	document.forms["incidentForm"]["descr"].value = descr;

	// Ensure correctness of input
	var error = hasError(name, contact, address, unitNum, respondent, descr);
	
	return !error;
}

/**
 * Check whether form inputs are valid
 * @param {string} name the reporter's name
 * @param {string} mobileNum the reporter's mobile number
 * @param {string} postalCode the postal code of the incident
 * @param {string} building the unit number of the incident 
 * @param {string[]} respondent the respondents requested
 * @param {string} description the description of the incident 
 * @returns {boolean} has error
 */
function hasError(name, mobileNum, postalCode, building, respondent, description) {
	var err = false; 
	if (name == "") {
		document.getElementById("e-name").innerHTML = "*";
		err = true;
	} else {
		document.getElementById("e-name").innerHTML = "";
	}
	if (mobileNum == "" | mobileNum.length != 8 | isNaN(mobileNum)) {
		document.getElementById("e-mobileNumber").innerHTML = "*";
		err = true;
	} else {
		document.getElementById("e-mobileNumber").innerHTML = "";
	}
	if (postalCode == "" | postalCode.length != 6 | isNaN(postalCode)) {
		document.getElementById("e-postalCode").innerHTML = "*";
		err = true;
	} else {
		document.getElementById("e-postalCode").innerHTML = "";
	}

	if (respondent.length < 1) {
		document.getElementById("e-respondent").innerHTML = "*";
		err = true;
	} else {
		document.getElementById("e-respondent").innerHTML = "";
	}
	if (description == "" | description.length > 200) {
		document.getElementById("e-description").innerHTML = "*";
		err = true;
	} else {
		document.getElementById("e-description").innerHTML = "";
	}
	if (err == true) {
		document.getElementById("errorMsg").innerHTML = "*please edit/fill in using valid formatting";
	} else {
		document.getElementById("errorMsg").innerHTML = "";
	}
	return err;	
}