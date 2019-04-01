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
                resolve(recordset);
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
};

module.exports = {runQuery};

