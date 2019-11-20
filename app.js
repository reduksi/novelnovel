const express = require('express');
const app = express()
const routes = require('./routes')

app.use(express.static(__dirname + '/public'));

app.set('view engine','ejs')

app.use(express.urlencoded({ extended: true }))

//app.use("/asset/",express.static(__dirname + "/public/"));
app.use(express.static("public"))

app.use('/',routes)

app.listen(3000)