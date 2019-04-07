/**
 * UpdateIncident entity class
 * Used by the incident update form
 */
class UpdateIncident{
    /** 
	 * UpdateIncident constructor
	 * @param {number} recordID the incident record ID
	 * @param {string} respondentReporting the respondent reporting the update
	 * @param {string[]} respondentRequested the respondent requested for the incident
	 * @param {string} updateDescr the description of the incident
	 * @param {string} updateName the name of the call center reporter
	 */
    constructor(recordID, respondentReporting, respondentRequested, updateDescr, updateName) {
        this.recordID = recordID;
        this.respondentReporting = respondentReporting;
        this.respondentRequested = respondentRequested;
        this.updateDescr = updateDescr;
        // Time generated in db
        this.updateTime;
        this.updateName = updateName;
    }
    
   	/** 
	 * Get incident's record ID
	 * @returns {number} the record ID
	 */
    getRecordID() {return this.recordID;}
    /**
	 * Get respondent reporting the update
	 * @returns {string} the respondent reporting
	 */
    getRespondentReporting() {return this.respondentReporting;}
	/**
	 * Get incident's respondents requested
	 * @returns {string[]} the respondents requested
	 */
    getRespondentRequested() {return this.respondentRequested;}
	/** 
	 * Get incident's description 
	 * @returns {string} the description
	 */
    getUpdateDescr() {return this.updateDescr;}
	/**
	 * Get name of the call center operator who submitted the incident
	 * @returns {string} call center operator name
	 */
    getUpdateName() {return this.updateName;}
	/** 
	 * Get update time 
	 * @returns {string} the update time
	 */
    getUpdateTime() {return this.updateTime;}
    
	/** 
	 * Get update time 
	 * @returns {string} the update time
	 */
    setRecordID(recordID) {this.recordID = recordID;}
	/**
	 * Set the respondent reporting
	 * @param {string} respondentReporting the respondent reporting
	 */
    setRespondentReporting(respondentReporting) {this.respondentReporting=respondentReporting;}
	/**
	 * Set respondents requested
	 * @param {string[]} respondentRequested the respondent requested
	 */
	setRespondentRequested(respondentRequested) {this.respondentRequested=respondentRequested;}
	/**
	 * Set incident's description
	 * @param {string} updateDescr the update description
	 */
	setUpdateDescr(updateDescr) {this.updateDescr=updateDescr;}
	/**
	 * Set call center operator name
	 * @param {string} updateName the call center operator name
	 */
	setUpdateName(updateName) {this.updateName=updateName;}
	/**
	 * Set update time
	 * @param {string} updateTime the update time
	 */
    setUpdateTime(updateTime) {this.updateTime=updateTime;}
}