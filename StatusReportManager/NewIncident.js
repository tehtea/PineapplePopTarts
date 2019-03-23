class NewIncident {
    constructor(recordID, name, contact, location, unitnum, desc, res, instime, insname) {
        this.recordID = recordID;
        this.name = name;
        this.contact = contact;
        this.location = location;
        this.unitNum = unitnum;
        this.desc = desc;
        this.res = res;
        this.insTime = instime;
        this.insName = insname;
    }

    get recordID() { return this._recordID; }
    get name() { return this._name; }
    get contact() { return this._contact; }
    get location() { return this._location; }
    get unitNum() { return this._unitNum; }
    get desc() { return this._desc; }
    get res() { return this._res; }
    get insTime() { return this._insTime; }
    get insName() { return this._insName; }

    set recordID(value) { this._recordID = value; }
    set name(value) { this._name = value; }
    set contact(value) { this._contact = value; }
    set location(value) { this._location = value; }
    set unitNum(value) { this._unitNum = value; }
    set desc(value) { this._desc = value; }
    set res(value) { this._res = value; }
    set insTime(value) { this._insTime = value; }
    set insName(value) { this._insName = value; }
}
module.exports = NewIncident;