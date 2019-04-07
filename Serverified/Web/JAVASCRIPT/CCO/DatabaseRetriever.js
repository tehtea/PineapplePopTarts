// Boundary Class - Database Retriever 

/**
 * Configuration of database
 */
const config = {
	server:"172.21.146.196",
	database:"Database3003",
	user:"Admin1",
	password:"pineapple"
};

const sql = require("./Apps/node_modules/mssql");

/**
 * Database retriever boundary class
 */
module.exports = {
	/**
	 * Get account details by username
	 * @param {Account} acc the account 
	 * @returns {Account} matching account 
	 */
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
	
	/**
	 * Check whether sessionkey is valid for content validation
	 * @param {string} sessionKey given session key
	 * @returns {object} matching account
	 */
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
	/**
	 * Store respondents requested into the database
	 * @param {string} respondent the respondent requested
	 * @param {string} recordID the record ID of the incident
	 * @param {string} insTime the time respondent is requested
	 */
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
	
	/**
	 * Store new incident report into the database
	 * @param {object} obj the new incident report
	 */
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
	
	/**
	 * Get record ID for the newly generated incident
	 * @param {object} obj the new incident report
	 * @return {object} new incident in database
	 */
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
	
	/**
	 * Get incident with the matching record ID 
	 * @param {string} recordID incident's record ID
	 * @return {object} new incident in database with the same record ID
	 */
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
	
	/**
	 * Store update incident into the database
	 * @param {object} obj update incident information
	 */
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
	
	/**
	 * Get time for respondent table from update table
	 * @param {object} obj update incident
	 * @return {object} update time
	 */
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

	/**
	 * Resolve incident in the database
	 * @param {string} recordID the incident's recordID
	 */
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
	
	/**
	 * Get all respondent requested for a particular incident
	 * @param {string} recordID the incident's recordID
	 * @returns {object} all respondent requested
	 */
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

	/** 
	 * Get all unresolved incidents in the database
	 * @returns {object} all unresolved incidents
	 */
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
	
	/**
	 * Retrieve new incidents for Status Report Manager 
	 * @returns {object} new incidents created in the last 30 minutes
	 */
	getRecentNewIncident: function() {
		return new Promise(function(resolve, reject) {
			// Connect to DB
			var conn = new sql.ConnectionPool(config);
			var req = new sql.Request(conn);
	conn.connect().then(function () {
				// Query DB
				req.query("SELECT * FROM NewIncident \
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
	
	/**
	 * Retrieve update incidents for Status Report Manager
	 * @returns {object} update incidents created in the last 30 minutes
	 */
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
	
	/**
	 * Retrieve respondent requested for Status Report Manager
	 * @returns {object} respondent requested in the last 30 minutes
	 */
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
	
	/**
	 * Retrieve new incident for crisis map
	 * @returns {object} all new incidents
	 */
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
	
	/**
	 * Retrieve update incident for crisis map
	 * @returns {object} all update incidents
	 */
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
	
	/**
	 * Retrieve respondent requested for crisis map
	 * @returns {object} all respondent requested 
	 */
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

