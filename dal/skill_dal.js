/**
 * Created by student on 3/15/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.update = function(params, callback) {
    var query = 'UPDATE skill SET skill_name = ?, description = ? WHERE skill_id = ?';
    var queryData = [params.skill_name, params.description, params.skill_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.getinfo = function(skill_id, callback) {
    var query = 'CALL skill_getinfo(?)';
    var queryData = [skill_id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.delete = function(params, callback) {
    var query = 'DELETE FROM skill WHERE skill_id = ?';
    var queryData = [params.skill_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getAll = function(callback) {
    //var query = 'CALL skill_getall()';
    var query = 'SELECT * FROM skill';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};
/**
 * Created by student on 3/15/18.
 */
exports.insert = function(params, callback) {

    var query = 'INSERT INTO skill (skill_name, description) VALUES (?, ?)';
    var queryData = [params.skill_name, params.description];

        connection.query(query, queryData, function(err, result) {
            callback(err, result);
        });


};