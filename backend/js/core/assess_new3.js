const shortid = require('shortid')
const natural =  require('natural')
const path = require('path')



let base_folder = path.join(path.dirname(require.resolve("natural")), "brill_pos_tagger");
let rulesFilename = base_folder + "/data/English/tr_from_posjs.txt";
let lexiconFilename = base_folder + "/data/English/lexicon_from_posjs.json";
let defaultCategory = 'N';

let lexicon = new natural.Lexicon(lexiconFilename, defaultCategory);
let rules = new natural.RuleSet(rulesFilename);
let tagger = new natural.BrillPOSTagger(lexicon, rules);
let stemmer  =  natural.PorterStemmer;
stemmer.attach();



const sw = require('stopword')


const classifier = {
       answers: {

       }
}


function addClassifier(data){

       return new Promise((resolve, reject) => {
              try {
                     let uid = shortid.generate()

                     classifier.answers[uid] = {

                            question: data.question,
                            c: new natural.BayesClassifier(),
                            trained: Date.now()

                     }

                     data.answers.forEach( k => {
                            k.trim()
                            if(k.length > 0)
                            {
                                   classifier.answers[uid].c.addDocument(k,k)
                            }
                     } )

                     resolve(classifier.answers[uid].c.train())
              }

              catch(e){
                     reject(e)
              }
       })

       
}


function assess(data,strict){

       

       if(classifier.answers.hasOwnProperty(data.uid))
       {
              let temp = classifier.answers[data.uid]
              let q = temp.question

              console.log('question is '+ q)
              

              //console.log(JSON.stringify(temp.c,'',2))

              console.log('Total sentences '+Object.keys(temp.c.classifier.classFeatures).length)

             // console.log(' Final result is = \n'+ JSON.stringify(finalRes))          
             let finalRes = assessMarks(temp.c,data.answers,q,strict)
              return finalRes
       }
       else
              return new Error('this answer has not been trained')
}


function getQuestions(){
       let list = Object.keys(classifier.answers)

       //  console.log(JSON.stringify(classifier))
       

       if(list.length > 0)
       {
              let temp = []
       
              list.forEach( k => {
                     let tt = {}
                     tt.uid = k,
                     tt.question = classifier.answers[k].question

                     temp.push(tt)
              })
              return temp   
       }

       else {
              return new Error('no questions has been trained')
       }

}


function assessMarks(c,data,q,strict){


       //console.log(`Strict mode = ${String(strict)}`)
       let finalResult = []

       data.forEach( k => {

              k.trim()

              //console.log(String(strict))

              if(k.length <= 0)
                     return null
              
              let clean_q = [] 
              
              
              let ans = c.classify(k).split(' ') 

              let clean_ans = []
              let clean_data = []

                     
              if(strict == 1)
              {
                     clean_q =  sw.removeStopwords(q.split(' '));
                     clean_ans = sw.removeStopwords(ans,clean_q)
                     clean_data = sw.removeStopwords(k.split(' '),clean_q)
                     console.log('in STRICT MODE !! \n'+ clean_q)
              }
              else
              {
                     clean_ans = sw.removeStopwords(ans)
                     clean_data = sw.removeStopwords(k.split(' '))

                     console.log(`
                            clean_ans is ${clean_ans}
                            clean_data is ${clean_data}
                     `)
              }
              


              // pos tagging 
              
              let pos = []
              let tt =[]
              tagger.tag(clean_ans).taggedWords.forEach(kk => {
                     tt.push(kk.tag)
              } )

              // Answer from corpus 
              pos.push(tt)


              tt =[]

              tagger.tag(clean_data)
              .taggedWords.forEach(kk => {
                     tt.push(kk.tag)
              } )

              // Answer given by user
              pos.push(tt)
              let result = { 
                     ss_jaro: natural.JaroWinklerDistance(ans.join(' '),k,undefined,true),
                     poss_dice: natural.DiceCoefficient(pos[0].join(' '),pos[1].join(' '))
              }


              let offset = 0;

              let perc;

              if(strict == 1)
              {
                     let testr = natural.DamerauLevenshteinDistance(pos[0].join(' '),pos[1].join(' '),{
                     
                            insertion_cost: 4,
                            deletion_cost: 1,
                            transposition_cost: 4,
                            substitution_cost: 2,
                            search: true
                            
                     })
                     let temprr = (testr.distance/(pos[0].join(' ').length))*100
                     temprr = Math.abs(100 - temprr)    
              
                     console.log('pos -> '+temprr)
                     console.log(
                            `
                            ======================== \n
                            student's answer  ||   ${k} \n
                            Classified as  ||   ${ans} \n
                            stopword free classified || ${clean_ans} \n
                            stopword free student's answer || ${clean_data} \n
                            Tagged words (classified) || ${pos[0]} \n
                            Tagged words (student) || ${pos[1]} \n
                            result before is || ${temprr}
                            ======================== \n
                            `
                     )
              
              
                     if(temprr <= 65)
                            temprr -=20
                     result.poss_dice =  temprr/100
                     


                     perc = Math.ceil(( (result.ss_jaro*1.65+result.poss_dice*1.35)/3 )* 100)
              
              }
              else
                     perc = Math.ceil(( (result.ss_jaro+result.poss_dice)/2 )* 100)
              
              


       /*   console.log(` 
              JARO % ${result.ss_jaro}
              POS % ${result.poss_dice}`) */

              
              
       
                     
                     finalResult.push(
                     {
                            data: k,
                            perc: perc,
                            marks: assignMarks(perc),
                            classified: ans.join(' '),
                            selected: false
                     }
                     )
              //   console.log(zzz)
                     



       })
       return finalResult

}


function assignMarks(n,ref=1){

       let arr = [
              85,
              80,
              75,
              60
       ]
       let top=arr[0]
       arr.forEach( k => {
              if(Math.abs(k - n) < Math.abs(top-n))
              {
                     top = k
              }
       } )

       switch(top){
              case 85: return 1*ref;
              case 80: return (3/4)*ref;
              case 75: return (1/2)*ref;
              case 60: return (1/4)*ref;
              default: return null
       }
}


function getClassifier(uid){
       if(classifier.answers.hasOwnProperty(uid))
              return classifier.answers[uid].c
       else
              false
}



module.exports = {
       classifier,
       addClassifier,
       assess,
       getQuestions,
       getClassifier

}