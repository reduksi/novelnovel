const express = require('express')
const routes = express.Router()
const User = require('../models').User
const pwd = require('../helper/pass')

routes.get('/',(req,res)=>{
    res.render('login',{status:0})
})
routes.post('/',(req,res)=>{
    let password = pwd('hacktiv8',req.body.password)
    User.findAll({where:{username:req.body.username, password}}).then(data=>{
        if(data.length < 1){
            res.render('login',{status:'wrong'})
        }
        res.redirect('/home')
    }).catch(err=>{
        res.send(err)
    })
})
routes.get('/home',(req,res)=>{
    res.render('index')
})
routes.post('/register',(req,res)=>{
    User.create(req.body).then(data=>{
        res.redirect('/')
    }).catch(err=>{
        res.send(err)
    })
})
routes.get('/article',(req,res)=>{
    res.render('article')
})
routes.get('/account',(req,res)=>{
    res.render('account')
})
routes.get('/article/content',(req,res)=>{
    res.render('articleContent')
})

module.exports = routes