"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const dbConfg = require('./config/database.config');
const mongose = require('mongoose');
const routes = require('./app/routes/routes');
const port = process.env.PORT || 3000
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

mongose.Promise = global.Promise;

//connection databse

mongose.connect(dbConfg.url,{
    useNewUrlParser : true,
    useFindAndModify: false,
}).then(() => {
    console.log('succesfull connection');
}).catch(()=>{
    console.log('could not connect to the databse .exiting now ...',err);
    process.exit();
})
app.get('/',(req,res) => {
    res.json({
        status : 200,
        message : 'welcome to mngose'
    })
})
routes(app);
app.listen(port);
console.log(`server is listening ${port}`);