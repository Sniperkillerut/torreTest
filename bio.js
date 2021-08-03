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
        let username = req.query.username

        const data = await got(`https:/bio.torre.co/api/bios/${username}`);
        res.json(data.body)
        // const dataStream = got.stream(`https:/bio.torre.co/api/bios/${username}`);
        // pipeline(dataStream, res, (err) => {
        //     if (err) {
        //         console.log(err);
        //         res.sendStatus(500);
        //     }
        // });
    }
})
router.post('/', async function (req, res, next) {
    if (req.query) {
        //get the first and last name from the query string
        let username = req.query.username
        //[offset=$offset&size=$size&aggregate=$aggregate]
        //{"name":{"term":"Christian gil"}}
        //{"and":[{"or":[{"skill/role":{"text":"Christian gil","experience":"1-plus-year"}},{"name":{"term":"Christian gil"}},{"organization":{"term":"Christian gil"}}]},{"language":{"term":"English","fluency":"conversational"}},{"language":{"term":"English","fluency":"conversational"}}]}
        const {data} = await got.post(`https://search.torre.co/opportunities/_search/?${username}`,{
            json: {
                hello: 'world'
            }
            }).json()
        res.json(data.body)
    }
})
module.exports = router