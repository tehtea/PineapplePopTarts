class UpdatedIncident {
    constructor(recordID, respondent, updtime, updname, desc) {
        this.recordID = recordID;
        this.respondent = respondent;
        this.updTime = updtime.toString();
        this.updName = updname;

        if (desc.includes("[RESOLVED]")) {
            this.res = "Yes";
            this.desc = desc.replace('[RESOLVED]', '');
        }
        else {
            this.res = "No";
            this.desc = desc;
        }

        this.updTime = this.updTime.replace('T',', ');
        this.updTime = this.updTime.substring(0,this.updTime.length-8);
    }

    get recordID() { return this._recordID; }
    get respondent() { return this._respondent; }
    get desc() { return this._desc; }
    get res() { return this._res; }
    get updTime() { return this._updTime; }
    get updName() { return this._updName; }

    set recordID(value) { this._recordID = value; }
    set respondent(value) { this._respondent = value; }
    set desc(value) { this._desc = value; }
    set res(value) { this._res = value; }
    set updTime(value) { this._updTime = value; }
    set updName(value) { this._updName = value; }
}
module.exports = UpdatedIncident;