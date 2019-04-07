/**
 * New incident entity class
 */
class NewIncident{
	/** 
	 * NewIncident constructor
	 * @param {string} name the reporter's name
	 * @param {string} contact the reporter's contact number
	 * @param {string} address the location of the incident
	 * @param {string} unitNum the unit number of the location
	 * @param {string[]} respondentRequested the respondent requested for the incident
	 * @param {string} descr the description of the incident
	 * @param {string} insName the name of the call center reporter
	 */
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
	
	/**
	 * Get incident's reporter's name
	 * @returns {string} reporter's name
	 */
	getName() {return this.name;}
	/**
	 * Get incident's reporter's contact 
	 * @returns {string} reporter's contact
	 */
	getContact() {return this.contact;}
	/**
	 * Get incident's postal code
	 * @returns {string} the postal code
	 */
	getAddress() {return this.address;}
	/**
	 * Get incident's unit number
	 * @returns {string} the unit number
	 */
	getUnitNum() {return this.unitNum;}
	/**
	 * Get incident's respondents requested
	 * @returns {string[]} the respondents requested
	 */
	getRespondentRequested() {return this.respondentRequested;}
	/** 
	 * Get incident's description 
	 * @returns {string} the description
	 */
	getDescr() {return this.descr;}
	/** 
	 * Get incident's record ID
	 * @returns {number} the record ID
	 */
	getRecordID() {return this.recordID;}
	/**
	 * Get confirmation of whether the incident is resolved
	 * @returns {boolean} resolved  
	 */
	getResolved() {return this.resolved;}
	/** 
	 * Get instantiated time 
	 * @returns {string} the instantiated time
	 */
	getInsTime() {return this.insTime;}
	/**
	 * Get name of the call center operator who submitted the incident
	 * @returns {string} call center operator name
	 */
	getInsName() {return this.insName;}
	/**
	 * Get updates on this incident
	 * @returns {UpdateIncident[]} all updates on this incident
	 */
	getUpdateIncident() {return this.updateIncident;}		
	
	/**
	 * Set reporter's name  
	 * @param {string} name new reporter's name 
	 */
	setName(name) {this.name = name;}
	/**
	 * Set reporter's contact
	 * @param {string} contact new reporter's contact
	 */
	setContact(contact) {this.contact = contact;}
	/**
	 * Set incident address
	 * @param {string} address new address
	 */
	setAddress(address) {this.address = address;}
	/**
	 * Set unit number
	 * @param {string} unitNum new unit number
	 */
	setUnitNum(unitNum) {this.unitNum = unitNum;}
	/**
	 * Set respondents requested
	 * @param {string[]} respondentRequested new respondent requested
	 */
	setRespondentRequested(respondentRequested) {this.respondentRequested = respondentRequested;}
	/**
	 * Set incident's description
	 * @param {string} descr new description
	 */
	setDescr(descr) {this.descr = descr;}
	/**
	 * Set record ID
	 * @param {number} recordID new record ID
	 */
	setRecordID(recordID) {this.recordID = recordID;}
	/**
	 * Set resolved boolean value
	 * @param {boolean} resolved new resolved boolean value 
	 */
	setResolved(resolved) {this.resolved = resolved;}
	/**
	 * Set instantiated time
	 * @param {string} insTime new instantiated time
	 */
	setInsTime(insTime) {this.insTime = insTime;}
	/**
	 * Set call center operator name
	 * @param {string} insName new call center operator name
	 */
	setInsName(insName) {this.insName = insName;}
	/**
	 * Set update incident 
	 * @param {string} respondentReporting the respondent reporting
	 * @param {string[]} respondentRequested the respondent requested
	 * @param {string} updateDescr the update description
	 * @param {string} updateTime the update time
	 * @param {string} updateName the call center operator name
	 */
	setUpdateIncident(respondentReporting, respondentRequested, updateDescr, updateTime, updateName) {
		this.updateIncident = new UpdateIncidentClass.UpdateIncident(this.recordID, respondentReporting, respondentRequested, updateDescr, updateTime, updateName);
	}
	
}

