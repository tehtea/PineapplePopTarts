// Boundary Class - Update Form UI

/* For form validation,
		1. Ensure that the format of inputs are correct
		2. If correct, save all inputs into database 
*/
displayIncidentOption();

/** 
 * Display all unresolved incident to update
 */
function displayIncidentOption() {
	// Get all unresolved incidents
	var asyncGetUnresolvedIncidents = getUnresolvedIncidents();
	asyncGetUnresolvedIncidents.then((result) => {
		// Display in select option
		for (var incident of result) {
			var dropdown = document.getElementById("incidentList");
			var option = document.createElement("option");
			option.value = incident.RecordID;
			option.text = "RecordID: " + incident.RecordID + ", Description: " + incident.Descr;
			dropdown.add(option);
		}
	});
}

/**
 * Display update form after selecting incident to update
 */
function confirmRecordID() {
	var recordID = document.getElementById("incidentList").value;
	
	// Get record ID
	let validRecord = checkRecord(recordID);
	validRecord.then((result) => {
		document.getElementById("section-2").style.display = "block";
		document.getElementById("section-1").style.display = "none";
		document.getElementById("textRecord").innerHTML = recordID;
		document.getElementById("textDescr").innerHTML = result.Descr;
		
		// Choices for respondent reporting
		var asyncGetRespondents = getRespondents(recordID);
		asyncGetRespondents.then((result) => {
			// Remove duplicates
			var set = new Set();
			for (var j = 0; j < result.length; j ++) {
				set.add(result[j].Respondent);
			}
			var dropdown = document.getElementById("respondentReportingList");
			
			for (var res of set) {
				var option = document.createElement("option");
				option.value = res;
				option.text = res;
				dropdown.add(option);
			}
		});
		
	});
}

/** 
 * Submission of update incident form
 * @returns {boolean} refresh page
 */
function formSubmission() {
	var respondentReporting = document.forms["updateIncidentForm"]["respondentReporting"].value;
	var respondentRequest = [];
	var j = 0;
	for (var i = 0; i < document.forms["updateIncidentForm"]["respondent"].length; i ++) {
		var tempR = document.forms["updateIncidentForm"]["respondent"][i];
		if (tempR.checked) {
			respondentRequest[j] = tempR.value;
			j ++;
		}
	}
	var descr = document.forms["updateIncidentForm"]["description"].value; 
	
	// Ensure correctness of input
	var error = hasError(descr);
	if (error == true) {
			return false;
	}
	
 	// Adjustment on description
	for (var c=0;c < descr.length; c ++) {
		if (descr.charAt(c) == '\'') {
			descr = descr.substr(0,c) + '"' + descr.substr(c+1);
			console.log("change");
		}
	}
	
	// IF CORRECT, Save to database
	var sessionKey = localStorage.getItem("sessionKey");
	var temp = {
		respondentRequest: respondentRequest,
		respondentReporting: respondentReporting,
		descr: descr,
		sessionKey: sessionKey,
		recordID: document.getElementById("textRecord").innerHTML
	}; 
	
 	let done = createUpdateIncident(temp);
	
	// Prompt use the successful submission
	done.then(() => {
		document.getElementById("content").style.display = "none";
		document.getElementById("complete").style.display = "block";
	});
	
	return false;
}

/**
 * Check whether the form inputs are in the valid format for update incident
 * @param {string} description
 * @returns {boolean} has error
 */
function hasError(description) {
	var err = false; 
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

/**
 * Resolve incident 
 * @returns {boolean} refresh page
 */
function resolveSubmission() {
	var respondentReporting = document.forms["updateIncidentForm"]["respondentReporting"].value;
	var respondentRequest = [];
	var j = 0;
	for (var i = 0; i < document.forms["updateIncidentForm"]["respondent"].length; i ++) {
		var tempR = document.forms["updateIncidentForm"]["respondent"][i];
		if (tempR.checked) {
			respondentRequest[j] = tempR.value;
			j ++;
		}
	}
	var descr = document.forms["updateIncidentForm"]["description"].value; 
	
	// Ensure correctness of input
	var error = hasErrorResolve(respondentRequest);
	if (error == true) {
			return false;
	}
	
	 // Adjustment on description
	for (var c=0;c < descr.length; c ++) {
		if (descr.charAt(c) == '\'') {
			descr = descr.substr(0,c) + '"' + descr.substr(c+1);
			console.log("change");
		}
	}
	
	// IF CORRECT, Save to database
	var sessionKey = localStorage.getItem("sessionKey");
	var temp = {
		respondentReporting: respondentReporting,
		descr: "[RESOLVED]" + descr,
		sessionKey: sessionKey,
		recordID: document.getElementById("textRecord").innerHTML
	}; 
	
 	let done = resolveIncident(temp);
	
	// Prompt use the successful submission
	done.then(() => {
		document.getElementById("content").style.display = "none";
		document.getElementById("complete").style.display = "block";
	});
	
	return false;
}

/**
 * Check whether the form inputs are in the valid format for resolve incident
 * @param {string[]} respondentRequest
 * @returns {boolean} has error
 */
function hasErrorResolve(respondentRequest) {
	if (respondentRequest.length > 0) {
		document.getElementById("e-respondent").innerHTML = "*";
		document.getElementById("errorMsg").innerHTML = "*this field must be empty";
		return true;
	} else {
		document.getElementById("e-respondent").innerHTML = "";
		return false;
	}
}

/**
 * Change the UI from update incident form back to choosing incident to update
 */
function returnSection1() {
	var dropdown = document.getElementById("respondentReportingList");
	var length = dropdown.options.length;
	for (var i = 0; i < length; i++) {
		dropdown.remove(0);
	}
	document.getElementById("section-1").style.display = "block";
	document.getElementById("section-2").style.display = "none";
	document.getElementById("textRecord").innerHTML = "";
	document.getElementById("textDescr").innerHTML = "";
}
