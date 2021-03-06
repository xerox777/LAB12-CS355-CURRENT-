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
            //callback(err, result);
        }
        else {
            var resume_id = result.insertId;
            var query = 'INSERT INTO resume_school (resume_id, school_id) VALUES (?)';
            var resumeschoolData = [];


            if (params.school_id.constructor === Array) {
                for (var i = 0; i < params.school_id.length; i++) {
                    resumeschoolData.push(
                        [Number(resume_id), Number(params.school_id[i])]
                    );
                }
            }

            else {
                resumeschoolData.push([Number(resume_id), Number(params.school_id)]);
            }

            connection.query(query, resumeschoolData, function (err, result) {
                if (err || params.skill_id === undefined) {
                    console.log(err);
                    //callback(err, result);
                } else {
                    var query2 = 'INSERT INTO resume_skill (resume_id, skill_id ) VALUES (?)';
                    var resumeskillData = [];

                    if (params.skill_id.constructor === Array) {
                        for (var i = 0; i < params.skill_id.length; i++) {
                            resumeskillData.push(
                                [Number(resume_id), params.skill_id[i]]
                            );
                        }
                    }

                    else {
                        resumeskillData.push([Number(resume_id), Number(params.skill_id)]);
                    }
                    connection.query(query2, resumeskillData, function (err, result) {
                        if (err || params.company_id === undefined) {
                            console.log(err);
                            //callback(err, result);
                        } else {
                            var query3 = 'INSERT INTO resume_company (resume_id, company_id) VALUES (?, ?)';
                            var resumecompanyData = [];
                                if (params.company_id.constructor === Array) {
                                    for (var i = 0; i < params.company_id.length; i++) {
                                        resumecompanyData.push([Number(resume_id), Number(params.company_id[i])]);
                                    connection.query(query3, resumecompanyData[i], function (err, result) {
                                        //allback(err, result);
                                    });
                                }
                                } else {
                                    resumecompanyData.push([Number(resume_id), Number(params.company_id)]);
                                    connection.query(query3, resumecompanyData, function (err, result) {
                                        //callback(err, result);
                                    });
                                }
                            callback(err, result);
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
    var queryData =  [acc_id.account_id];//, acc_id.school_id, acc_id.company_id];//[params.account_id, params.account_id, params.account_id];
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
    connection.query(query, queryData, function(err3, result3) {
        if(err3) {
            console.log(err3);
        } else {
           /* var query = 'call resume_edit(?)';
            var queryData = [Number(params.resume_id)];
            connection.query(query, queryData, function (error, Result) {
                callback(err, result);*/
            resumeSkillUpdate(params, function(err1, result1){
                if(err1) {
                    console.log(err1);
                } else {
                    resumeSchoolUpdate(params, function(err2, result2){
                        if(err2){
                            console.log(err2);
                        } else{
                            resumeCompanyUpdate(params, function(err, result){
                                if(err){
                                    console.log(err);
                                } else {
                                    callback(err, result);
                                }
                            });
                        //callback(err2, result2);
                        }
                    });
                   // callback(err1, result1);
                }
            });
            //callback(err3, result3);
            }

        });
};

/*exports.update = function(params, callback){
    var query = 'UPDATE resume SET rname = ? WHERE resume_id = ?';
    var queryData = [params.rname, params.resume_id];
    connection.query(query, queryData, function(err, result) {
        resumeUpdate(params.resume_id, params.account_id, function (err, result) {
            callback(err, result);
        });
    });
};
*/
var resumeSkillUpdate = function(params, callback){
    var query = 'Delete from resume_skill where resume_id = (?)';
    var queryData = [Number(params.resume_id)];
    if(params.skill_id != null) {


        if (params.skill_id.constructor === Array) {
            var arr = [];
            for (var i = 0; i < params.skill_id.length; i++) {
                arr.push(Number(params.skill_id[i]));
            }
        } else {
            var arr = [Number(params.skill_id)];
        }
    }
    connection.query(query, queryData, function(err, result){
        if(err) {
            console.log(err);
        }else if(arr!=null) {
            var query = 'CALL resumeskill_insert(?, ?)';
            for (var i = 0; i < arr.length; i++) {
                var param = [arr[i], Number(params.resume_id)];
                connection.query(query, param, function (err, result) {
                    if (err || param.account_id === undefined) {
                        callback(err, result);
                        //console.log(err);
                    }
                    else {
                        resume_dal.triinsert(param, callback);
                    }
                });
            }
        } else{
            callback(err, result);
        }
        });
};
var resumeSchoolUpdate = function(params, callback){
    var query = 'Delete from resume_school where resume_id = (?)';
    var queryData = [Number(params.resume_id)];
    if(params.school_id != null) {


        if (params.school_id.constructor === Array) {
            var arr = [];
            for (var i = 0; i < params.school_id.length; i++) {
                arr.push(Number(params.school_id[i]));
            }
        } else {
            var arr = [Number(params.school_id)];
        }
    }

    connection.query(query, queryData, function(err, result) {
        if (err) {
            console.log(err);
        } else if (arr != null) {
            var query = 'CALL resumeschool_insert(?, ?)';
            for (var i =0; i < arr.length; i++) {
            var param = [Number(params.resume_id), arr[i]];
            connection.query(query, param, function (err, result) {
                if (err || param.account_id === undefined) {
                    callback(err, result);
                    //console.log(err);
                }
                else {
                    resume_dal.triinsert(param, callback);
                }
            });
        }
    } else {
                callback(err, result);
        }
    });
};
var resumeCompanyUpdate = function(params, callback){
    //TODO THIS IS THA NEW STANDARD HOMIE!
    var query = 'Delete from resume_company where resume_id = (?)';
    var param = [Number(params.resume_id)];

    if(params.company_id != null) {


        if (params.company_id.constructor === Array) {
            var arr = [];
            for (var i = 0; i < params.company_id.length; i++) {
                arr.push(Number(params.company_id[i]));
            }
        } else {
            var arr = [Number(params.company_id)];
        }
    }

    connection.query(query, param, function(err, result) {
        if(err) {
            console.log(err);
        }else if( arr!= null){
            var query = 'CALL resumecompany_insert(?, ?)';

            for (var i = 0; i < arr.length; i++) {
                var param = [Number(params.resume_id), arr[i]];//, Number(params.account_id)];

                connection.query(query, param, function (err, result) {
                    if (err || param.account_id === undefined) {
                        callback(err, result);
                        //console.log(err);
                    }
                    else {
                        resume_dal.triinsert(param, callback);
                    }

                });
            }
        } else {
            callback(err, result);
        }
    });
};



