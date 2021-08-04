//allow unsecure connections to be made
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require('express')
const app = express()
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
app.use('/request-type', (req, res, next) => {
    console.log('Request type: ', req.method);
    next();
});
app.use(express.static('public'));
app.use('/public', express.static('public'))



app.get('/', (req, res) => {
    res.sendFile( __dirname + "/" + "index.html" );
    // res.writeHead(302, { Location: "/index.html" })
    // res.end();
    // res.send('Successful response.');
});
app.get('/home', (req, res) => {
    //if the url path is home.html then get the home.html file from public directory
        res.sendFile( __dirname + "/" + "home.html" );
})
app.get('/fetchskills', (req, res) => {
    //if the url path is home.html then get the home.html file from public directory
        res.sendFile( __dirname + "/" + "skills.html" );
})

var bio = require('./bio')
app.use('/bio', bio)
var opportunity = require('./opportunity')
app.use('/opportunity', opportunity)
var skills = require('./skills')
app.use('/skills', skills)
var getskills = require('./getskills')
app.use('/getskills', getskills)

const port = process.env.PORT || 80;

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})