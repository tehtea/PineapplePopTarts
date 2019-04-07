class NewIncident {
    /**
     * Constructor for new incident
     * @param {number} recordID 
     * @param {string} name 
     * @param {string} contact 
     * @param {string} location 
     * @param {string} unitnum 
     * @param {string} desc 
     * @param {boolean} res 
     * @param {string} instime 
     * @param {string} insname 
     */
    constructor(recordID, name, contact, location, unitnum, desc, res, instime, insname) {
        this.recordID = recordID;
        this.name = name;
        this.contact = contact;
        this.location = location;
        this.unitNum = unitnum;
        this.desc = desc;
        this.insTime = instime.toString();
        this.insName = insname;

        if (res)
            this.res = 'Yes';
        else
            this.res = 'No';
        
        this.insTime = this.insTime.replace('T',', ');
        this.insTime = this.insTime.substring(0,this.insTime.length-8);
    }

    /**
     * Get record ID
     * @returns {number}
     */
    get recordID() { return this._recordID; }
    /**
     * Get name
     * @returns  {string}
     */
    get name() { return this._name; }
    /**
     * Get contact number
     * @returns {string}
     */
    get contact() { return this._contact; }
    /**
     * Get location
     * @returns {string}
     */
    get location() { return this._location; }
    /**
     * Get unit number
     * @returns {string}
     */
    get unitNum() { return this._unitNum; }
    /**
     * Get description
     * @returns {string}
     */
    get desc() { return this._desc; }
    /**
     * Get resolution status
     * @returns {boolean}
     */
    get res() { return this._res; }
    /**
     * Get insertion time
     * @returns {string}
     */
    get insTime() { return this._insTime; }
    /**
     * Get name of inserter
     * @returns {string}
     */
    get insName() { return this._insName; }

    /**
     * set record ID.
     */
    set recordID(value) { this._recordID = value; }
    /**
     * set name.
     */
    set name(value) { this._name = value; }
    /**
     * set contact.
     */
    set contact(value) { this._contact = value; }
    /**
     * set location.
     */
    set location(value) { this._location = value; }
    /**
     * set unit number.
     */
    set unitNum(value) { this._unitNum = value; }
    /**
     * set description.
     */
    set desc(value) { this._desc = value; }
    /**
     * set resolution status.
     */
    set res(value) { this._res = value; }
    /**
     * set inserted time.
     */
    set insTime(value) { this._insTime = value; }
    /**
     * set inserted name.
     */
    set insName(value) { this._insName = value; }
}
module.exports = NewIncident;