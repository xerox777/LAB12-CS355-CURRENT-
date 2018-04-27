/**
 * Created by student on 3/15/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getinfo = function(address_id, callback) {
    var query = 'CALL address_getinfo(?)';
    var queryData = [address_id];
    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};


exports.update = function(params, callback) {
    var query = 'UPDATE address SET street = ?, zip_code = ? WHERE address_id = ?';
    var queryData = [params.street, params.zip_code, params.address_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};



exports.getAll = function(callback) {
    var query = 'CALL address_getall();';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};
/*exports.getAll = function(callback) {
    var query = 'SELECT * FROM address;';

    connection.query(query, function(err, result[) {
        callback(err, result);
    });
}; */
/**
 * Created by student on 3/15/18.
 */
exports.insert = function(params, callback) {

    var query = 'INSERT INTO address (street) VALUES (?)';
    var queryData = [params.street];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};