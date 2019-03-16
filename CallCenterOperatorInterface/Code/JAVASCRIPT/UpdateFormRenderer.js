// Boundary Class - Update Form UI
// Boundary Class - Form UI

/* For form validation,
		1. Ensure that the format of inputs are correct
		2. If correct, save all inputs into database 
*/

function checkRecordID() {
	var recordID = document.getElementById("recordID").value;
	if (recordID == "" | /^\d+$/.test(recordID) == false) {
		document.getElementById("invalidRecord").innerHTML = "*invalid Record";
		return;
	}
	let validRecord = checkRecord(recordID);
	validRecord.then((result) => {
		if (result == null) {
			document.getElementById("invalidRecord").innerHTML = "*invalid Record";
		} else {
			document.getElementById("section-2").style.display = "block";
			document.getElementById("section-1").style.display = "none";
			document.getElementById("textRecord").innerHTML = recordID;
		}
	});
}


function formSubmission() {
	var respondentReporting = document.forms["updateIncidentForm"]["respondentReporting"].value
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
	done.then(() => {
		document.getElementById("content").style.display = "none";
		document.getElementById("complete").style.display = "block";
		document.getElementById("recordID").innerHTML = localStorage.getItem("recordID");
	});
	
	return false;
}


function hasError(description) {
	var err = false; 
	if (description == "" | description.length > 200) {
		document.getElementById("e-description").innerHTML = "*";
		err = true;
	} else {
		document.getElementById("e-description").innerHTML = "";
	}
	if (err == true) {
		document.getElementById("errorMsg").innerHTML = "*please edit/fill in using valid formating";
	} else {
		document.getElementById("errorMsg").innerHTML = "";
	}
	return err;	
}
