const express = require('express')
const routes = express.Router()
const User = require('../models').User

routes.get('/',(req,res)=>{
    res.render('login',{status:0})
})
routes.post('/',(req,res)=>{
    User.findAll({where:{username:req.body.username, password:req.body.password}}).then(data=>{
        if(data.length < 1){
            res.render('login',{status:'wrong'})
        }
        res.render('index')
    })
})

module.exports = routes