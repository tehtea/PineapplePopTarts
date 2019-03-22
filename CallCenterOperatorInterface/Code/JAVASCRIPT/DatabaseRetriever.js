// Boundary Class - Database Retriever 

const config = {
	server:"172.21.146.196",
	database:"Database3003",
	user:"Admin1",
	password:"pineapple"
};

const sql = require("./Apps/node_modules/mssql");

module.exports = {
	getAccountByID: function(acc) {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				req.query("SELECT * FROM AccountTbl WHERE username='"+acc.username+"' AND password='"+acc.password+"' COLLATE SQL_Latin1_General_CP1_CS_AS").then(function (recordset) {
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
	
	// For Content Validation
	checkKey: function(sessionKey) {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				req.query("SELECT * FROM AccountTbl WHERE sessionKey = '" + sessionKey + "'").then(function (recordset) {
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
	
	// Store Respondent
	storeRespondent: function(respondent, recordID, insTime) {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				// New Incident Table
				req.query("INSERT INTO RespondentRequest(RecordID, Respondent, InsTime) VALUES \
							('"+recordID+"','"+respondent+"','"+insTime+"');").then(function (recordset) {
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
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				// New Incident Table
				req.query("SELECT RecordID, InsTime FROM NewIncident \
							WHERE RecordID = (	\
								SELECT MAX(RecordID) as RecordID FROM NewIncident \
								WHERE InsName='"+obj.insName+"');").then(function (recordset) {
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
	
	// For Update Form, find recordID
	validateRecordID: function(recordID) {
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
	}
}

