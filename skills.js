var express = require('express')
var router = express.Router()
const fs = require('fs');
const { pipeline } = require('stream');
const got = require('got');
const { json } = require('express');
const { lchmodSync, fstat } = require('fs');
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

//Skills Downloader, TODO: every few hours update the file
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
        var dir ='https://search.torre.co/opportunities/_search/?size=5000&aggregate=false'
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
            next = data.pagination.next
            data.results.forEach(element => {
                element.skills.forEach(element2 => {
                    if (element2.proficiency == 'potential-to-develop') {
                        ptd[element2.name]??=0
                        ptd[element2.name]++
                    }
                    else {
                        exp[element2.name]??= 0
                        exp[element2.name]++
                    }
                });
            });
        }

        const mergedObject = {ptd,exp};
        fs.writeFileSync("./public/skills.json",JSON.stringify(mergedObject))
        res.json(mergedObject)
    }
})
module.exports = router