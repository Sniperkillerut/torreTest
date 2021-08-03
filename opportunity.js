var express = require('express')
var router = express.Router()
const { pipeline } = require('stream');
const got = require('got')
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
router.get('/', async function (req, res, next) {
    if (req.query) {
        //get the first and last name from the query string
        let opportunity = req.query.opportunity

        const data = await got(`https://torre.co/api/opportunities/${opportunity}`)
        res.json(data.body)
        // pipeline(dataStream, res, (err) => {
        //     if (err) {
        //         console.log(err);
        //         res.sendStatus(500);
        //     }
        // })
    }
})
module.exports = router