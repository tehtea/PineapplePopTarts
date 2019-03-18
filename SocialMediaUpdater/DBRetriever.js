
const config = {
	server:"172.21.146.196",
	database:"Database3003",
	user:"Admin1",
	password:"pineapple"
};

const sql = require("./Apps/node_modules/mssql");

module.exports = {
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