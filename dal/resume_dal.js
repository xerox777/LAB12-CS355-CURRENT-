var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);


exports.getinfo = function(resume_id, callback) {
    var query = 'CALL resume_getinfo(?)';
    var queryData = [resume_id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.getAll = function(callback) {
    var query = 'SELECT * FROM resume';

    connection.query(query, function (err, result) {
        callback(err, result);
    });
};
exports.getacAll = function(callback) {
    var query = 'SELECT * FROM account';

    connection.query(query, function (err, result) {
        callback(err, result);
    });
};

exports.select = function(params, callback) {
    var query = 'call resume_getinfo(?)';
    var queryData = [params.resume_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(params, callback) {
    var query = 'DELETE FROM resume WHERE resume_id = ?';
    var queryData = [params.resume_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO resume (account_id, fname, lname, rname) VALUES (?,?,?,?)';
    var queryData = [params.account_id, params.fname, params.lname, params.rname];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.triinsert = function(params, callback) {
    var query = 'INSERT INTO resume (account_id, fname, lname, rname) VALUES (?,?,?,?)';
    var queryData = [params.account_id, params.fname, params.lname, params.rname];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};


exports.update = function(params, callback) {
    var query = 'UPDATE resume SET rname = ?, fname = ?, lname = ?, account_id = ? WHERE resume_id = ?';
    var queryData = [params.rname, params.fname, params.lname, params.account_id, params.resume_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

