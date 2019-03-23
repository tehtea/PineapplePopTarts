// Boundary Class - Form UI

/* For form validation,
		1. Ensure that the format of inputs are correct
		2. If correct, save all inputs into database 
*/

function formSubmission() {
 	// Input type: name, mobileNumber, postalCode, building, respondent, description
	var name = document.forms["incidentForm"]["name"].value;
	var contact = document.forms["incidentForm"]["mobileNumber"].value;
	var address = document.forms["incidentForm"]["postalCode"].value;
	var unitNum = document.forms["incidentForm"]["building"].value;
	var respondent = [];
	var j = 0;
	for (var i = 0; i < document.forms["incidentForm"]["respondent"].length; i ++) {
		var tempR = document.forms["incidentForm"]["respondent"][i];
		if (tempR.checked) {
			respondent[j] = tempR.value;
			j ++;
		}
	}
	var descr = document.forms["incidentForm"]["description"].value; 
	
	// Ensure correctness of input
	var error = hasError(name, contact, address, unitNum, respondent, descr);
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
		name: name,
		contact: contact,
		address: address,
		unitNum: unitNum,
		respondent: respondent,
		descr: descr,
		sessionKey: sessionKey
	};  
	
	 let done = createNewIncident(temp);
	
	// Prompt use the successful submission
	done.then(() => {
		document.getElementById("content").style.display = "none";
		document.getElementById("complete").style.display = "block";
		document.getElementById("recordID").innerHTML = localStorage.getItem("recordID");
	}); 
	
	return false;
}


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

