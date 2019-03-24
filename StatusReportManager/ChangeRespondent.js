class ChangeRespondent {
    constructor(recordID, respondent, instime) {
        this.recordID = recordID;
        this.respondent = respondent;
        this.insTime = instime.toString();

        this.insTime = this.insTime.replace('T',', ');
        this.insTime = this.insTime.substring(0,this.insTime.length-5);
    }

    get recordID() { return this._recordID; }
    get respondent() { return this._respondent; }
    get insTime() { return this._insTime; }

    set recordID(value) { this._recordID = value; }
    set respondent(value) { this._respondent = value; }
    set insTime(value) { this._insTime = value; }
}
module.exports = ChangeRespondent;