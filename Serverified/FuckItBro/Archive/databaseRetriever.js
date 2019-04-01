const dbQuery = require('../Web/dbQuery');

// Boundary Class - Database Retriever 

const config = {
	server:"172.21.146.196",
	database:"Database3003",
	user:"Admin1",
	password:"pineapple"
};

const sql = require("mssql");

module.exports = {	
	// Store Respondent
	storeRespondent: function(respondent, recordID, insTime) {
		return new Promise(function(resolve, reject) {
			dbQuery.runQuery("INSERT INTO RespondentRequest(RecordID, Respondent, InsTime) VALUES \
            ('"+recordID+"','"+respondent+"','"+insTime+"');")
            .then(() => {
                resolve();
            })
            .catch((err) => {
                console.log(err);
                reject();
            })
		});
	},
	
	// Store New Incident
	storeNewIncident: function(obj) {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				// New Incident Table
				req.query("INSERT INTO NewIncident(Name, Contact, Location, UnitNum, Descr, InsName) VALUES \
							('"+obj.name+"', '"+obj.contact+"', '"+obj.address+"', '"+obj.unitNum+"', '"+obj.descr+"', '"+obj.insName+"');").then(function (recordset) {
					conn.close();
					resolve();
				})
				.catch(function (err) {
					console.log(err);
					conn.close();
					reject(err);
				});
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	},
	
	// Get Record ID for newly made Incident
	getRecordIDIncident: function(obj) {
		return new Promise(function(resolve, reject) {
            const query = "SELECT RecordID, InsTime FROM NewIncident \
            WHERE RecordID = (	\
                SELECT MAX(RecordID) as RecordID FROM NewIncident \
                WHERE InsName='"+obj.operator+"');"

            dbQuery.runQuery(query)
            .then((recordset) => resolve(recordset.recordset[0]))
            .catch((err) => reject(err));
		});
	},
	
	// For Update Form, find recordID
	getFormViaRecordID: function(recordID) {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				req.query("SELECT * FROM NewIncident WHERE \
							RecordID = '"+recordID+"'").then(function (recordset) {
					conn.close();
					resolve(recordset.recordset[0]);
			})
				.catch(function (err) {
					console.log(err);
					conn.close();
					reject(err);
				});
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	},
	
	// Store Update Form
	storeUpdateIncident: function(obj) {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				req.query("INSERT INTO UpdateIncident(RecordID, Respondent, UpdName, Descr) VALUES \
							('"+obj.recordID+"','"+obj.respondentReporting+"','"+obj.updateName+"','"+obj.updateDescr+"');").then(function (recordset) {
					conn.close();
					resolve();
				})
				.catch(function (err) {
					console.log(err);
					conn.close();
					reject(err);
				});
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	},
	
	// Get time for respondent table from update table
	getTimeUpdateIncident: function(obj) {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				req.query("SELECT MAX(UpdTime) as Time FROM UpdateIncident \
							WHERE RecordID = '"+obj.recordID+"' \
							AND UpdName = '"+obj.updateName+"' ").then(function (recordset) {
					conn.close();
					resolve(recordset.recordset[0]);
				})
				.catch(function (err) {
					console.log(err);
					conn.close();
					reject(err);
				});
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	},
	
	resolveIncident: function(recordID) {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				req.query("UPDATE NewIncident SET Resolved=1 WHERE RecordID = "+recordID).then(function (recordset) {
					conn.close();
					resolve();
				})
				.catch(function (err) {
					console.log(err);
					conn.close();
					reject(err);
				});
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	},
	
	getRespondents: function(recordID) {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				req.query("SELECT Respondent FROM RespondentRequest WHERE RecordID =" + recordID).then(function (recordset) {
					conn.close();
					resolve(recordset.recordset);
				})
				.catch(function (err) {
					console.log(err);
					conn.close();
					reject(err);
				});
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	},
	
	getUnresolvedIncidents: function() {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				// New Incident Table
				req.query("SELECT * FROM NewIncident \
							WHERE Resolved = 0").then(function (recordset) {
					conn.close();
					resolve(recordset.recordset);
				})
				.catch(function (err) {
					console.log(err);
					conn.close();
					reject(err);
				});
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	},
	
	// Data retrieval for Status Report Manager 
	getRecentNewIncident: function() {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	conn.connect().then(function () {
				// Query DB
				req.query("SELECT * FROM NewIncident \
							WHERE InsTime > DateADD(mi, -30, Current_TimeStamp)").then(function (recordset) {
					console.log(`From DatabaseRetriever.js: ${recordset}`);
					conn.close();
					resolve(recordset.recordset);
				})
				.catch(function (err) {
					console.log(err);
					conn.close();
					reject(err);
				});
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	},
	getRecentUpdateIncident: () => {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				// Query DB
				req.query("SELECT * FROM UpdateIncident \
							WHERE UpdTime > DateADD(mi, -30, Current_TimeStamp)").then(function (recordset) {
					conn.close();
					resolve(recordset.recordset);
				})
				.catch(function (err) {
					console.log(err);
					conn.close();
					reject(err);
				});
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	},
	getRecentRespondentRequested: () => {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				// Query DB
				req.query("SELECT * FROM RespondentRequest \
							WHERE InsTime > DateADD(mi, -30, Current_TimeStamp)").then(function (recordset) {
					conn.close();
					resolve(recordset.recordset);
				})
				.catch(function (err) {
					console.log(err);
					conn.close();
					reject(err);
				});
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	},
	
	// Data Retrieval for Crisis Map
	getAllNewIncident: () => {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				// Query DB
				req.query("SELECT * FROM NewIncident").then(function (recordset) {
					conn.close();
					resolve(recordset.recordset);
				})
				.catch(function (err) {
					console.log(err);
					conn.close();
					reject(err);
				});
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	},
	getAllUpdateIncident: () => {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				// Query DB
				req.query("SELECT * FROM UpdateIncident").then(function (recordset) {
					conn.close();
					resolve(recordset.recordset);
				})
				.catch(function (err) {
					console.log(err);
					conn.close();
					reject(err);
				});
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	},
	getAllRespondentRequested: () => {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				// Query DB
				req.query("SELECT * FROM RespondentRequest").then(function (recordset) {
					conn.close();
					resolve(recordset.recordset);
				})
				.catch(function (err) {
					console.log(err);
					conn.close();
					reject(err);
				});
			})
			.catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	}
}

