/**
 * Change Respondent entity class
 */
class ChangeRespondent {
	/**
	 * ChangeRespondent constructor
	 * @param {number} recordID the incident recordID
	 * @param {string} respondent the respondent requested
	 * @param {date} instime the time when the respondent was requested 
	 */
    constructor(recordID, respondent, instime) {
        this.recordID = recordID;
        this.respondent = respondent;
        this.insTime = instime.toString();

        this.insTime = this.insTime.replace('T',', ');
        this.insTime = this.insTime.substring(0,this.insTime.length-8);
    }

	/** 
	 * Get the record ID of the incident 
	 * @returns {number} the record ID
	 */
    get recordID() { return this._recordID; }
    /**
	 * Get the respondent requested 
	 * @returns {string} the respondent 
	 */
	get respondent() { return this._respondent; }
    /**
	 * Get the time when the respondent was requested
	 * @returns {string} the time 
	 */
    get insTime() { return this._insTime; }

	/**
	 * Set the record ID of the incident 
	 * @param {number} value the record ID
	 */
    set recordID(value) { this._recordID = value; }
	/**
	 * Set the respondent requested 
	 * @param {string} value the respondent requested
	 */
    set respondent(value) { this._respondent = value; }
   	/**
	 * Set the time when the respondent is requested
	 * @param {string} value the time
	 */
	set insTime(value) { this._insTime = value; }
}
module.exports = ChangeRespondent;