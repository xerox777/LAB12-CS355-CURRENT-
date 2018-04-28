/**
 * Created by student on 4/17/18.
 */
var express = require('express');
var router = express.Router();
var resume_dal = require('../dal/resume_dal');
var account_dal = require('../dal/account_dal');
var skill_dal = require('../dal/skill_dal');

router.get('/all', function(req, res, next){
    resume_dal.getAll(function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('resume/resume_view_all', {resume: result});
        }
    })
});

router.get('/edit', function(req, res) {
    resume_dal.getinfo(req.query.resume_id, function(err, result) {
        resume_dal.getacAll(function(err, result1) {
            res.render('resume/resume_update',
                {resume: result[0][0], res: result1});
        });

    });
});

router.get('/add/selectuser', function(req, res) {
    resume_dal.getAll(function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            account_dal.getAll(function(error, ressult) {


            res.render('resume/resume_add_user', {resume: result, acc: ressult});
          });
        }
    });
});


router.get('/add', function(req, res) {
    resume_dal.getacAll(function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            resume_dal.getAll(function(err, resume){
            res.render('resume/resume_add', {resume: req.query, resumeINFO: resume});
        });
        }
    });
});

router.get('/insert', function(req, res) {
    resume_dal.insert(req.query, function(err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.redirect(302, '/resume/all');//, {Ecorp: result});
        }
    });
});

router.get('/update', function(req, res){
    resume_dal.update(req.query, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.redirect(302, '/resume/all');
        }
    });

});

router.get('/delete', function(req, res){
        resume_dal.delete(req.query, function(err, result){
            if(err){
                res.send(err);
            }
            else {
                res.redirect(302, '/resume/all');
            }
        });
});

router.get('/add/resume', function(req, res) {
    resume_dal.gettable(req.query, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
                res.render('resume/resume_add_resume', {skill: result, resume: req.query});//req.query}); //was result
                resume_dal.triinsert(result, function(err, result) {
                    if(err){
                        res.send(err);
                    } else {
                        //resume_dal.dubinsert(req.query, function(err, result) {
                        res.redirect(302, '/resume/all');
                        }

                });
            }
    });
});


module.exports = router;