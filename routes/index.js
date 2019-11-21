const express = require('express')
const routes = express.Router()
const User = require('../models').User
const pwd = require('../helper/pass')
const Article = require('../models').Article
var HTMLParser = require('node-html-parser');

routes.get('/',(req,res)=>{
    res.render('login',{status:0})
})
routes.post('/',(req,res)=>{
    let password = pwd('hacktiv8',req.body.password)
    User.findAll({where:{username:req.body.username, password}}).then(data=>{
        if(data.length < 1){
            res.render('login',{status:'wrong'})
        }
        res.render('login',{status:'right',id:data[0].dataValues.id})
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
routes.post('/account/',(req,res)=>{
    User.findOne({include:Article,where:{id:req.body.id}}).then(user=>{
        // res.send(user)
        res.render('account',{user:user.dataValues})
    }).catch(err=>{
        res.send(err)
    })
})
routes.get('/account/deleteNovel/:id',(req,res)=>{
    Article.destroy({where:{id:req.params.id}}).then(()=>{
        res.redirect('/article')
    }).catch(err=>{
        res.send(err)
    })
})
routes.post('/account/addnovel',(req,res)=>{
    const root = HTMLParser.parse(req.body.editordata)
    console.log(req.body.UserId)
    Article.create({title:req.body.title,UserId:req.body.UserId,content:root.toString()}).then(data=>{
        res.redirect('/article')
    }).catch(err=>{
        res.send(err+'as')
    })
})
routes.get('/article',(req,res)=>{
    Article.findAll()
    .then(articles=>{
        articles=articles.map(article=>article.dataValues)
        res.render('article',{articles})
    })
    .catch(err=>res.send(err))
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