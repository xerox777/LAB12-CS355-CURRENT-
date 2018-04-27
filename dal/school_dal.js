/**
 * Created by student on 3/15/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

var schoolInsert = function(school_id, schoolIdArray,
                             callback){
    var query = 'INSERT INTO account (school_name, address_id)' +
        'VALUES ?';
    var schoolData = [];
    if (schoolIdArray.constructor === Array) {
        for (var i = 0; i < schoolIdArray.length; i++) {
            schoolData.push([schoolIdArray[i], school_name, address_id]);
        }
    } else {
        schoolData.push([schoolIdArray, school_name, address_id]);
    }
    connection.query(query, [schoolData], function(err, result) {
        callback(err, result);
    });
};
var accountUpdate = function(schoolIdArray, school_name, address_id, callback){
    var query = 'CALL school_delete(?)';

    connection.query(query, address_id, function(err, result){
        if(err || schoolIdArray === undefined) {
            callback(err, result);
        } else {
            schoolInsert(schoolIdArray, callback);
        }
    });
};
exports.update = function(params, callback){
    var query = 'UPDATE school SET school_name = ?, address_id = ? WHERE school_id = ?';
    var queryData = [params.school_name, params.address_id, params.school_id];
    connection.query(query, queryData, function(err, result) {
            callback(err, result);
        });
};


exports.getinfo = function(school_id, callback) {
    var query = 'CALL school_info(?)';
    var queryData = [school_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.getAll = function(callback) {
    //var query = 'SELECT * FROM account;';
    var query = 'CALL school_getall();';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};
/**
 * Created by student on 3/15/18.
 */
exports.insert = function(params, callback) {

    var query = 'INSERT INTO school (school_name, address_id) VALUES (?, ?)';
    var queryData = [params.school_name, params.address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};