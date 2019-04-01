const dbQuery = require('./dbQuery');

function checkAccount(username, password) {
    return new Promise(function (resolve, reject) {
        var queryPromise = dbQuery.runQuery(`SELECT * FROM AccountTbl WHERE username='${username}' AND password='${password}'`);
    
        queryPromise
        .then((results) => {
            if (results.length == 0) {
                reject('fuck');
            }
            resolve('lol');
        })
        .catch((err) => reject);
    });
}

// checkAccount('cheese', 'Pie').then((val) => console.log(val));
// checkAccount('', '').then((val) => console.log(val)).catch((err) => console.log(err));

module.exports = {
    checkAccount
}