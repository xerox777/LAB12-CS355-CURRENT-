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

/*exports.triinsert = function(params, callback) {

    var query = 'INSERT INTO resume (rname, account_id) VALUES (?,?)';
    var queryData = [params.rname, params.account_id];

    connection.query(query, queryData, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            callback(err, result);
        }
        var insertId = result.insertId;

        var query = 'INSERT INTO resume_company (resume_id, company_id) VALUES (?,?)';
        var queryData = [insertId, Number(params.account_id)];
        connection.query(query, queryData, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                callback(err, result);
            }
        });
        var query = 'INSERT INTO resume_school (resume_id, school_id) VALUES (?,?)';
        var queryData = [insertId, Number(params.account_id)];
        connection.query(query, queryData, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                callback(err, result);
            }
        });
        var query = 'INSERT INTO resume_skill (skill_id, resume_id) VALUES (?,?)';
        var queryData = [Number(params.account_id), insertId];
        connection.query(query, queryData, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(err, result);
                }
        });
    });
};*/


exports.triinsert = function(params, callback) {

    var query = 'INSERT INTO resume (rname, account_id) VALUES (?,?)';
    var queryData = [params.rname, Number(params.account_id)];
    connection.query(query, queryData, function (err, result) {
    if (err) {
        console.log(err);
    } else {

            var query = 'INSERT INTO resume_school (resume_id, school_id) VALUES (?,?)';
            var queryData = [result.insertId, Number(params.account_id)];
        connection.query(query, queryData, function (err, result1) {
            if (err) {
                console.log(err);
            } else {
                var query = 'INSERT INTO resume_skill (skill_id,resume_id) VALUES (?,?)';
                var queryData = [Number(params.account_id), result.insertId];
                connection.query(query, queryData, function (err, result2) {
                    if (err) {
                        console.log(err);
                    } else {
                        var query = 'INSERT INTO resume_company (resume_id, company_id) VALUES (?,?)';
                        var queryData = [result.insertId, params.account_id];
                        connection.query(query, queryData, function (err, result3) {
                            if (err) {
                                console.log(err);
                            } else {
                                    callback(err, result);
                                }
                            });

                            //callback(err, result);
                            }
                        });
                       // callback(err, result);
                    }
                });
               // callback(err, result);
            }
        });
 };


exports.dubinsert = function(params, callback) {
    var query = 'INSERT INTO resume (account_id, fname, lname, rname) VALUES (?,?,?,?)';
    var queryData = [params.account_id, params.fname, params.lname, params.rname];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};
exports.gettable = function(acc_id, callback) {
    var query = 'CALL resume_info(?)'; //, ?, ?)';
    var queryData =  [acc_id.account_id];//[params.account_id, params.account_id, params.account_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.editinfo = function(res_id, callback) {
    var query = 'CALL resume_edit(?)';
    var queryData = [res_id.resume_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE resume SET rname = ?, account_id = ? WHERE resume_id = ?';
    var queryData = [params.rname, Number(params.account_id), Number(params.resume_id)];
    connection.query(query, queryData, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            var query = 'call resume_edit(?)';
            var queryData = [params.resume_id];
            connection.query(query, queryData, function (error, Result) {
                callback(err, result);

            });

        }
    });
};

