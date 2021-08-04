var express = require('express')
var router = express.Router()
const fs = require('fs');
const { json } = require('express');
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', async function (req, res, next) {

    var jsonfile=fs.readFileSync("./json/skills.json")
        res.json(JSON.parse(jsonfile))
})
module.exports = router