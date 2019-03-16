// Boundary Class - Database Retriever 

const config = {
	server:"172.21.146.196",
	database:"Database3003",
	user:"Admin1",
	password:"pineapple"
};

const sql = require("./Apps/node_modules/mssql");

module.exports = {
	getAllNewIncident: function() {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				req.query("SELECT * FROM NewIncident").then(function (recordset) {
					conn.close();
					console.log(recordset.recordset);
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
	
	getNameBySessionKey: function(sessionKey) {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				req.query("SELECT username FROM AccountTbl WHERE sessionKey='"+sessionKey+"'").then(function (recordset) {
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
	
	// For Status Report
	getDataSR: function() {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	
			conn.connect().then(function () {
				// Query on NewIncident
				req.query("	SELECT * FROM NewIncident \
							WHERE InsTime < CURRENT_TIMESTAMP \
							AND InsTime > DateADD(mi, -30, Current_TimeStamp)", function(err, recordset){
					if (err) {
						console.log(err);
						return;
					}
					else {
						// Results
						results[0] = recordset.recordset;
					}
				});
			
				// Query on UpdateIncident
				req.query("	SELECT * FROM UpdateIncident \
							WHERE UpdTime < CURRENT_TIMESTAMP \
							AND UpdTime > DateADD(mi, -30, Current_TimeStamp)", function(err, recordset){
					if (err) {
						console.log(err);
						return;
					}
					else {
						// Results
						results[1] = recordset.recordset;
					}
				});
			
				// Query on RespondentRequest
				req.query("	SELECT * FROM RespondentRequest \
							WHERE InsTime < CURRENT_TIMESTAMP \
							AND InsTime > DateADD(mi, -30, Current_TimeStamp)", function(err, recordset){
					if (err) {
						console.log(err);
						return;
					}
					else {
						// Results
						results[2] = recordset.recordset;
					}
					conn.close();
					resolve(results);
				});
			});
		});
	}
}

