/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var skill_dal = require('../dal/skill_dal');

router.get('/update', function(req, res){
   skill_dal.update(req.query, function(err, result){
       if(err){
           res.send(err);
       } else {
           res.redirect(302, '/skill/all');
       }
   });

});


router.get('/edit', function(req, res){
    skill_dal.getinfo(req.query.skill_id, function(err, result){

            res.render('skill/SkillUpdate',
                {skill: result[0][0], skill_result: result[0]}); //skill: result[0][0], skill_result: result[1]

    });
});

router.get('/delete', function(req, res){
    skill_dal.delete(req.query, function(err, result){
        if(err){
            res.send(err);
        }
        else {
            res.redirect(302, '/skill/all');
        }
    });
});

/* GET users listing. */
router.get('/all', function(req, res, next) {
    skill_dal.getAll(function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('skill/skill_view', {skill: result});
        }

    });
});

router.get('/add', function(req, res) {
    res.render('skill/skill_add');

});

router.get('/insert', function(req, res) {
    skill_dal.insert(req.query, function(err, result) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.redirect(302, '/skill/all');
        }
    });
});

module.exports = router;

/**
 * Created by student on 3/15/18.
 */
