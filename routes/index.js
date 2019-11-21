const express = require('express')
const routes = express.Router()
const User = require('../models').User
const pwd = require('../helper/pass')
const Article = require('../models').Article

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
    Article.findAll({include:[User]})
    .then(articles=>{
        articles=articles.map(article=>article.dataValues)
        res.render('article',{articles})
    })
    .catch(err=>res.send(err))
})
routes.get('/account',(req,res)=>{
    res.render('account')
})
routes.get('/article/:articleId/content',(req,res)=>{
    Article.findByPk(req.params.articleId)
    .then(article=>{
        console.log(article)
        let content = article.content
        res.render('articleContent',{content})
    })
})

module.exports = routes