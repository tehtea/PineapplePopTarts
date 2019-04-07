/**
 * An abstraction layer for making database queries to reduce the amount of boilerplate code to write
 */

const dbConfig = require('./dbConfig');
const sql = require('mssql');

function runQuery(query) {
    return new Promise(function(resolve, reject) {
        // Connect to DB
        var conn = new sql.ConnectionPool(dbConfig);
        var req = new sql.Request(conn);
    
        conn.connect().then(function () {
            req.query(query).then(function (recordset) {
                conn.close();
                resolve(recordset.recordset);
            })
            .catch(function (err) {
                console.log(`Error when running query: ${query}`);
                console.log("Error message: " + err);
                conn.close();
                reject(err);
            });
        })
        .catch(function (err) {
            console.log("Error when connecting to db");
            console.log("Error message: " + err);
            reject(err);
        });
    });
};

module.exports = {runQuery};

