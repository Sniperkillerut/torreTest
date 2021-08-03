var express = require('express')
var router = express.Router()
const { pipeline } = require('stream');
const got = require('got');
const { json } = require('express');
const { lchmodSync } = require('fs');
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', async function (req, res, next) {
    if (req.query) {
        //get the first and last name from the query string
        let username = req.query.username
        //&after=b2Zmc2V0IDIw
        //[offset=$offset&size=$size&aggregate=$aggregate]
        //{"name":{"term":"Christian gil"}}
        //{"and":[{"or":[{"skill/role":{"text":"Christian gil","experience":"1-plus-year"}},{"name":{"term":"Christian gil"}},{"organization":{"term":"Christian gil"}}]},{"language":{"term":"English","fluency":"conversational"}},{"language":{"term":"English","fluency":"conversational"}}]}
        var ptd = {};
        var exp = {};
        var next = 'null'
        var dir='https://search.torre.co/opportunities/_search/?size=5000'
        while (next != null) {
            let data
            if (next==='null') {
                data  = await got.post(dir,{
                    json: {
                    }
                }).json()
            } else {
                data = await got.post(dir+'&after='+next, {
                    json: {
                    }
                }).json()
            }
            next=data.pagination.next
            data.results.forEach(element => {
                element.skills.forEach(element => {
                    if (element.proficiency == 'potential-to-develop') {
                        ptd[element.name]??=0
                        ptd[element.name]++
                    }
                    else {
                        exp[element.name]??= 0
                        exp[element.name]++
                    }
                });
            });
        }
        // arr.reduce((acc, curr) => {
        //     acc[curr] ??= {[curr]: 0};
        //     acc[curr][curr]++;
        //     return acc;
        // }, {});
        const mergedObject = {ptd,exp};

        res.json(mergedObject)
    }
})
module.exports = router