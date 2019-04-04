const dbQuery = require('./dbQuery').runQuery;

// recordID = 13
// dbQuery("SELECT * FROM NewIncident WHERE RecordID = " + recordID).then((val) => console.log(val));
// dbQuery("UPDATE NewIncident SET Resolved=1 WHERE RecordID = "+recordID).then((val) => console.log(val));

console.log(typeof 'lol' == 'string')