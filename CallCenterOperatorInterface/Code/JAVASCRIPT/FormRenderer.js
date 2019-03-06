
/* For form validation,
		1. Ensure that the format of inputs are correct
		2. If correct, save all inputs into database 
*/

/* Input type: name, mobileNumber, postalCode, building, respondent, description*/
function validateForm() {
	var name = document.forms["incidentForm"]["name"].value;
	var mobileNum = document.forms["incidentForm"]["mobileNumber"].value;
	var postalCode = document.forms["incidentForm"]["postalCode"].value;
	var building = document.forms["incidentForm"]["building"].value;
	var respondent = [];
	var j = 0;
	for (var i = 0; i < document.forms["incidentForm"]["respondent"].length; i ++) {
		var tempR = document.forms["incidentForm"]["respondent"][i];
		if (tempR.checked) {
			respondent[j] = tempR.value;
			j ++;
		}
	}
	var description = document.forms["incidentForm"]["description"].value;
	
	// Ensure correctness of input
	var error = hasError(name, mobileNum, postalCode, building, respondent, description);
	if (error == true) {
			return false;
	}
	
	// IF CORRECT, ADD TO DATABASE
	var incident = {
		name: name,
		mobileNum: mobileNum,
		postalCode: postalCode,
		building: building,
		respondent: respondent,
		description: description
		};
	
	var username = getUsername(sessionKey);
	$.ajax({
		type:"post",
		url:"form_handler.php",
		data: {
			name: name,
			mobileNum: mobileNum,
			postalCode: postalCode,
			building: building,
			respondent: respondent,
			description: description
			username: username
			},
		success: function(results){
			alert(results);
		}
	});
	
	// Testing
	console.log(incident);
	return false;
	
}

function hasError(name, mobileNum, postalCode, building, respondent, description) {
	var err = false; 
	// Note: name, mobileNumber fix formating
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
		document.getElementById("errorMsg").innerHTML = "*please edit/fill in using valid formating";
	} else {
		document.getElementById("errorMsg").innerHTML = "";
	}
	return err;
	
}
