// Entity Class - NewIncident

class NewIncident{
	// Constructor
	constructor(name,contact,address,unitNum,respondentRequested,descr,insName) {
		this.name = name;
		this.contact = contact;
		this.address = address;
		this.unitNum = unitNum;
		this.respondentRequested = respondentRequested;
		this.descr = descr;
		// Generate record ID in the db
		this.recordID = null;
		
		this.resolved = false;
		// Generated in the database
		this.insTime = null;
		this.insName = insName;
		// Association
		this.updateIncident = []; 
	}
	
	// Accessor
	getName() {return this.name;}
	getContact() {return this.contact;}
	getAddress() {return this.address;}
	getUnitNum() {return this.unitNum;}
	getRespondentRequested() {return this.respondentRequested;}
	getDescr() {return this.descr;}
	getRecordID() {return this.recordID;}
	getResolved() {return this.resolved;}
	getInsTime() {return this.insTime;}
	getInsName() {return this.insName;}
	getUpdateIncident() {return this.updateIncident;}		
	
	// Mutator
	setName(name) {this.name = name;}
	setContact(contact) {this.contact = contact;}
	setAddress(address) {this.address = address;}
	setUnitNum(unitNum) {this.unitNum = unitNum;}
	setRespondentRequested(respondentRequested) {this.respondentRequested = respondentRequested;}
	setDescr(descr) {this.descr = descr;}
	setRecordID(recordID) {this.recordID = recordID;}
	setResolved(resolved) {this.resolved = resolved;}
	setInsTime(insTime) {this.insTime = insTime;}
	setInsName(insName) {this.insName = insName;}
	setUpdateIncident(respondentReporting, respondentRequested, updateDescr, updateTime, updateName) {
		this.updateIncident = new UpdateIncidentClass.UpdateIncident(this.recordID, respondentReporting, respondentRequested, updateDescr, updateTime, updateName);
	}
	
	// Append Update Incident
}

