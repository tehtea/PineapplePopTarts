/**
 * Invoked to check if credentials provided is valid
 */

const dbQuery = require('./dbQuery');

/**
 * Checks if the username and password specified matches any records in the database.
 * @param {string} username 
 * @param {string} password 
 */
function checkAccount(username, password) {
    return new Promise(function (resolve, reject) {
        var queryPromise = dbQuery.runQuery(`SELECT * FROM AccountTbl WHERE username='${username}' AND password='${password}'`);
    
        queryPromise
        .then((results) => {
            if (results.length == 0) {
                reject('no account found');
            }
            resolve('account found');
        })
        .catch((err) => reject);
    });
}

module.exports = {
    checkAccount
}