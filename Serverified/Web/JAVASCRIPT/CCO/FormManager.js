// Control Class - Incident Manager
/**
 * Add new incident into database
 * @param {object} temp new incident form inputs
 */
function createNewIncident(temp) {
	return new Promise((resolve,reject) => {
		var asyncGetAccount = getAccountViaKey(temp.sessionKey);
		asyncGetAccount.then((account) => {
			var username = account[0].username;
			var obj = new NewIncident(temp.name,temp.contact,temp.address,temp.unitNum,temp.respondent,temp.descr,username);
			
			var asyncStoreNewIncident = storeNewIncident(obj);
			asyncStoreNewIncident.then((recordID) => {
				localStorage.setItem("recordID", recordID);
				resolve();
			});
		});
	});
}

/**
 * Add update incident into database
 * @param {object} temp update incident form inputs
 */ 
function createUpdateIncident(temp) {
	return new Promise((resolve,reject) => {
		// From Database Retrieve Name using session Key
		var asyncGetAccount = getAccountViaKey(temp.sessionKey);
		asyncGetAccount.then((account) => {
			var username = account[0].username;
			// Create Object "UpdateIncident"
			var obj = new UpdateIncident(temp.recordID,temp.respondentReporting,temp.respondentRequest,temp.descr,username);
			
			// Store update incident
			var asyncStoreUpdateIncident = storeUpdateIncident(obj);
			asyncStoreUpdateIncident.then(() => {
				resolve();
			});
		});
	});
}

/** 
 * Set incident to "resolved" in the database
 * @param {object} temp update incident form inputs
 */
function resolveIncident(temp) {
	return new Promise((resolve,reject) => {
		// From Database Retrieve Name using session Key
		var asyncGetAccount = getAccountViaKey(temp.sessionKey);
		asyncGetAccount.then((account) => {
			var username = account[0].username;
			// Create Object "UpdateIncident"
			var obj = new UpdateIncident(temp.recordID,temp.respondentReporting,[],temp.descr,username);
			
			// Store update incident
			var asyncStoreUpdateIncident = storeUpdateIncident(obj);
			asyncStoreUpdateIncident.then(() => {
				// Change incident to resolved
				var asyncUpdateToResolved = updateToResolved(temp.recordID);
				asyncUpdateToResolved.then(() => {
					resolve();
				});
			});
		});
	});
}