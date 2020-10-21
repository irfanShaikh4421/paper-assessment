

/*
const express = require('express')
app = express()

app.get('/abc', (req,res,next) =>{
       console.log('IN /abc')
} )


app.listen(82)

*/


const assess = require('./core/assess_new2')




let mockData = {
       question: 'What is genetic algorithm',
       answers: [
              'genetic algorithm belongs to evolutionary algorithms',
              'genetic algorithm is based on human genetics',
              'genetic algorithm is based on  biological genes'
       ],

       student: {
              question: 'What is genetic algorithm',
              answers: ['genetic algorithm uses heuristic technique',
              'it is adaptive in nature.',
              'it is based on human genetics',
              'it is a good algorithm',
              'it is efficient algorithm',
              'it is fast algorithm',
              'genetic technique heuristic uses algorithm']
       }
}

var a = ''


async function train(){

       try{

       
              let uid = await assess.addClassifier({
                     question: mockData.question,
                     answers: mockData.answers
              })

              if(uid){
                     resolve('Trained successfully')
              }
       }

       catch(e){
             reject(e)
       }


}



function grade(data){
       let r = assess.assess({
              uid: data,
              answers: mockData.student.answers
       })

       console.log(r)
}

/*

train()



setTimeout( () => {
       grade('0')
}, 0)

*/




var global = {
       trained: 0,
       failed: 0
}



for(var i =0; i < 10000; i++){
       train()
       .then(
              z => {
                     global.trained++
                     console.log(z)

                     console.log(JSON.stringify(global,'',2))

                     if(global.trained >= 10000)
                     {
                            
                            let l = assess.getQuestions().length

                            console.log('length is '+l)
                     }
              }

              
       )
       .catch( 
              e => {
                     global.failed++
                     console.log(e)
                     console.log(JSON.stringify(global,'',2))
              }
       )


       

}


