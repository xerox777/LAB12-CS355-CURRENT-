/**
 * Created by student on 3/15/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);
var accountInsert = function(account_id, accountIdArray,
callback){
    var query = 'INSERT INTO account (account_id, email, first_name, last_name)' +
        'VALUES ?';
    var accountData = [];
    if (accountIdArray.constructor === Array) {
        for (var i = 0; i < accountIdArray.length; i++) {
            accountData.push([accountIdArray[i], email, first_name, last_name]);
        }
    } else {
        accountData.push([accountIdArray, email, first_name, last_name]);
    }
    connection.query(query, [accountData], function(err, result) {
        callback(err, result);
    });
};
var accountUpdate = function(accountIdArray, email, first_name, last_name, callback){
    var query = 'CALL account_delete(?)';
    connection.query(query, email, function(err, result){
        if(err || accountIdArray === undefined) {
            callback(err, result);
        } else {
            accountInsert(account_id, accountIdArray, callback);
        }
    });
};

exports.update = function(params, callback){
    var query = 'UPDATE account SET email = ?, first_name = ?, last_name = ? WHERE account_id = ?';
    var queryData = [params.email, params.first_name, params.last_name, params.account_id];
    connection.query(query, queryData, function(err, result) {
           callback(err, result);

    });
};


exports.getinfo = function(email, callback) {
    var query = 'CALL account_getinfo(?)';
    var queryData = [email];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.getAll = function(callback) {
    //var query = 'SELECT * FROM account;';
    var query = 'CALL account_getall();';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};
/**
 * Created by student on 3/15/18.
 */
exports.insert = function(params, callback) {

    var query = 'INSERT INTO account (email, first_name, last_name) VALUES (?, ?, ?)';
    var queryData = [params.email, params.first_name, params.last_name];

    connection.query(query, queryData, function(err, result) {
         callback(err, result);



    });
};