const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

const assess = require('./core/assess_new3')

const qs = require('qs')


app.use(express.json({
       inflate: true,
       extended: true
}))

app.use(express.urlencoded({
type : 'application/x-www-form-urlencoded',
inflate: true,
parameterLimit: 100,
limit: '100kb',
extended: false

}))



const handler = fn => (req,res,next) => {
Promise
.resolve(fn(req,res,next))
.catch(next)
}



app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
res.header('Access-Control-Allow-Credentials', 'true');
res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
res.header('Access-Control-Expose-Headers', 'Content-Length');
res.header('Access-Control-Allow-Headers', 'cache-control,x-requested-with');
next();
});


const loc = '/api/'

app.post(loc+'train',preTrain, handler((req,res,next) => 
{

       

       // Train question classifier

       let r = assess.addClassifier({
              question: req.body.main,
              answers: req.body.answers
       })


       if(r)
       {
              res
              .status(200)
              .json(
              {
                     success: true,
                     data: 'Successfully trained both the classifiers'
              }
              )
       }


}))



app.post(loc+'multiTrain', handler((req,res,next) => 
{

       

       // Train question classifier


       let parsed  = req.body.data.split(/\s*?^(.*?)\s*\?\s*?[\r\n]+/m).slice(1)
       .reduce((acc, m, i, arr) => 
              i%2 ? acc.concat({ main: arr[i-1], answers: m.replace(/\r|\n/g,'').trim().split('.') }) : acc, 
       []);
       
       console.log('parsed is '+ JSON.stringify(parsed))

       let r = []
       parsed.forEach( (k) => {

              let temp = assess.addClassifier({
                     question: k.main,
                     answers: k.answers
              })

              r.push(temp)
       } )

       

       if(r.every( i => i ? true: false ))
       {
              res
              .status(200)
              .json(
              {
                     success: true,
                     data: 'Successfully trained both the classifiers'
              }
              )
       }


}))





app.post(loc+'assess',preAssess,handler( (req,res,next) => {
if( true )
{  
     //  console.log('in')
     //  console.log(JSON.stringify(qs.parse(req.body)))
      // console.log('body - '+JSON.stringify(req.body))

       req.body = qs.parse(req.body)

       let strict = req.body.strict

       console.log('Strict is '+ String(req.body.strict))
       let r = assess.assess({
              uid: req.body.uid,
              answers: req.body.answers,
       },
       strict
       )

       let completed = {}

       let objStruct = {
              count: 0,
              top: -1,
              topPerc: -1,
              index: []
       }
       /*
              {
                     test 1 : {
                            count: 0
                            top: 0
                            topPerc: perc
                            index: [0,2]
                     }
              }
       */

       r.forEach( (k,i,a) => {
              if(completed[k.classified])
              {
                     let index = k.classified

                     completed[index].count++
                     if(completed[k.classified].topPerc < k.perc )
                     {
                            completed[index].top = i
                            completed[index].topPerc = k.perc
                     }
                     
                     completed[index].index.push(i)

              }
              else
              {
                     let index = k.classified
                     completed[index] = {
                            count: 1,
                            top: i,
                            topPerc: k.perc,
                            index: [i]
                     }
              }
       } )


       Object.keys(completed).forEach( (k,i,a) => {
              
       //  console.log('\n\n\n COMPLETED \n'+JSON.stringify(completed,'',2)+'\n k is '+ JSON.stringify(k,'',2))
              r[completed[k].top].selected = true
       } )


       let c =  assess.getClassifier(req.body.uid)
       let total = 0

       if(c)
       {
              total =  Object.keys(c.classifier.classFeatures).length;
       }
       res.status(200)
       .json({
              success: true,
              total: total,
              data: r
       })
       }

} ))


app.get(loc+'all',handler( (req,res,next) => {
       let r = assess.getQuestions()
     //  console.log

       res.status(200)
       .json(r)
} ))


app.use( (error,req,res,next) => {
       console.log(error)
       if(error)
              res
              .status(500)
              .json({
                     error: '=== Internal Server Error'
       })
} )


function preAssess(req,res,next){
      // console.log(` data is ${JSON.stringify(data)}`)

       if(req.body.uid && req.body.answers){
              req.body.answers = req.body.answers.split('.').map(function(item) {
                     return item.trim();
                     });

                     return req.body.answers.length > 0 ? next() : new Error('Invalid Assessment body Data')
       }
     

}

function preTrain(req,res,next){
       let q = req.body.main

       req.body.answers = req.body.answers.split('.').map(function(item) {
              return item.trim();
              });

       let a = req.body.answers

       if(q.length > 0 && a.length > 0)
       {
              next()
       } 

       return new Error('Invalid Pre Train Data')

}


function isValidT(data){

//  console.log(data)

       let q = data.questions
       let a = data.answers

       if(q.length > 0 && a.length > 0 && data.main.length > 0)
       {
                     return true
       } 


       return false

}


function isValidA(data){
      // console.log(` data is ${JSON.stringify(data)}`)
       return data.question && data.answers.length > 0 ? true : false

}



app.listen(80)
