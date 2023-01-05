const http = require('http');
const app = require('./app.js');
// require('dotenv').config();

const port = process.env.SERVER_PORT || 3000;
const server = http.createServer(app);

server.listen(port,(err,cb) => {
    if(err){
        console.log(err);
    }
    console.log(`Listening on port ${port}`)
});