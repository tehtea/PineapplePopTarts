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
		} else if (result.Resolved == true) {
			document.getElementById("invalidRecord").innerHTML = "*Record has already been resolved";
		} else {
			document.getElementById("section-2").style.display = "block";
			document.getElementById("section-1").style.display = "none";
			document.getElementById("textRecord").innerHTML = recordID;
			document.getElementById("textDescr").innerHTML = result.Descr;
			
			// Choices for respondent reporting
			var asyncGetRespondents = getRespondents(recordID);
			asyncGetRespondents.then((result) => {
				for (var i =0; i < result.length; i ++) {
					var dropdown = document.getElementById("respondentReportingList");
					var option = document.createElement("option");
					option.value = result[i].Respondent;
					option.text = result[i].Respondent;
					dropdown.add(option);
				}
			});
		}
	});
}

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
	
	// IF CORRECT, Save to database
	var sessionKey = localStorage.getItem("sessionKey");
	var temp = {
		respondentReporting: respondentReporting,
		descr: descr,
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

function hasErrorResolve(respondentRequest) {
	if (respondentRequest.length > 0) {
		document.getElementById("e-respondent").innerHTML = "*";
		document.getElementById("errorMsg").innerHTML = "*This field must be empty";
		return true;
	} else {
		document.getElementById("e-respondent").innerHTML = "";
		return false;
	}
}
