var mysql = require('mysql');
var db = require('./db_connection.js');
var resume_dal = require('./resume_dal.js');
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
        if (err || params.account_id === undefined) {
            console.log(err);
            callback(err, result);
        }
        else {
            var resume_id = result.insertId;
            var query = 'INSERT INTO resume_school (resume_id, school_id) VALUES (?)';
            var resumeschoolData = [];

            if (params.account_id.constructor === Array) {
                for (var i = 0; i < params.account_id.length; i++) {
                    resumeschoolData.push(
                        [resume_id, params.account_id[i]]
                    );
                }
            }
            else {
                resumeschoolData.push([resume_id, Number(params.account_id)]);
            }
            connection.query(query, resumeschoolData, function (err, result) {
                if (err || params.account_id === undefined) {
                    console.log(err);
                    callback(err, result);
                } else {
                    var query = 'INSERT INTO resume_skill (resume_id, skill_id) VALUES (?)';
                    var resumeskillData = [];

                    if (params.account_id.constructor === Array) {
                        for (var i = 0; i < params.account_id.length; i++) {
                            resumeschoolData.push(
                                [resume_id, params.account_id[i]]
                            );
                        }
                    }
                    else {
                        resumeskillData.push([resume_id, Number(params.account_id)]);
                    }
                    connection.query(query, resumeschoolData, function (err, result) {
                        if (err || params.account_id === undefined) {
                            console.log(err);
                            callback(err, result);
                        } else {
                            var query = 'INSERT INTO resume_company (resume_id, company_id) VALUES (?)';
                            var resumecompanyData = [];

                            if (params.account_id.constructor === Array) {
                                for (var i = 0; i < params.account_id.length; i++) {
                                    resumecompanyData.push(
                                        [resume_id, params.account_id[i]]
                                    );
                                }
                            }
                            else {
                                resumecompanyData.push([resume_id, Number(params.account_id)]);
                            }
                            connection.query(query, resumecompanyData, function (err, result) {
                                callback(err, result);
                            });
                        }
                    });
                }
            });
        }
    });
};
            /*if (err) {  TODO - THIS WAS OLD TRIINSERT FUNCTION
            console.log(err);
        } else {

                var query = 'INSERT INTO resume_school (resume_id, school_id) VALUES (?,?)';
                var queryData = [result.insertId, Number(params.account_id)];
            connection.query(query, queryData, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    var query = 'INSERT INTO resume_skill (skill_id,resume_id) VALUES (?,?)';
                    var queryData = [Number(params.account_id), result.insertId];
                    connection.query(query, queryData, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            var query = 'INSERT INTO resume_company (resume_id, company_id) VALUES (?,?)';
                            var queryData = [result.insertId, params.account_id];
                            connection.query(query, queryData, function (err, result) {
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
            });*/

exports.getaccinfo = function(res_id, callback) {
    var query = 'CALL resume_acc()'; //, ?, ?)';
    //var queryData =  [res_id.resume_id];//[params.account_id, params.account_id, params.account_id];
    connection.query(query, function(err, result) {
        callback(err, result);
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
    var queryData = [params.rname, Number(params.skill_id), Number(params.resume_id)];
    connection.query(query, queryData, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            var query = 'call resume_edit(?)';
            var queryData = [Number(params.resume_id)];
            connection.query(query, queryData, function (error, Result) {
                callback(err, result);

            });

        }
    });
};




var resumeUpdate = function(resume_id, accountid, callback){
    var query = 'CALL resume_delete(?)';

    connection.query(query, resume_id, function (err, result) {
        if(err || accountid === undefined) {
            callback(err, result);
        }
        else {
            resume_dal.triinsert(accountid, callback);
        }
    });
};

exports.update = function(params, callback){
    var query = 'UPDATE resume SET rname = ? WHERE resume_id = ?';
    var queryData = [params.rname, params.resume_id];
    connection.query(query, queryData, function(err, result) {
        resumeUpdate(params.resume_id, params.account_id, function (err, result) {
            callback(err, result);
        });
    });
};

