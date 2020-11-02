<template>
       <v-layout 
              column 
              fill-height
              justify-center
              align-center
       
       >
              <v-flex xs8 shrink class='center' style='position: relative; width: 45vw;' pa-5>

                     <v-img width='5rem' src='dot.svg' class='container-img'> </v-img>


                     <v-layout column fill-height justify-space-between> 
                            <div  class='container-text' >
                                   <h1> SELECT A QUESTION TO ASSESS </h1>
                            </div>
                            

                            <div class='mt-5 text-xs-center'>
                                   <template v-if='questions.length > 0'> 
                                          <div class='list'>
                                                 <v-select
                                                        outline
                                                        v-model='assess.value'
                                                        item-text = 'question'
                                                        item-value = 'uid'
                                                        :items='assess.result'
                                                        style='opacity: .6'

                                                 > </v-select>

                                                 <transition name='fade'>
                                                        <template v-if='value'>
                                                               <div>
                                                                      <v-textarea
                                                                             flat
                                                                             label="Enter Student's Answer"
                                                                             outline
                                                                             style='opacity: .6'
                                                                             v-model='assess.answers'
                                                                      >
                                                                      </v-textarea>
                                                                      <v-switch v-model='assess.strict'
                                                                             true-value='1'
                                                                             false-value='-1'
                                                                      <v-btn round  depressed block utline @click='handleAssess' large dark> GRADE IT</v-btn>
                                                               </div>
                                                        
                                                        </template>
                                                 </transition>
                                          </div>
                                   </template>

                                   <template v-else>
                                          <p> NO QUESTION FOUND IN THE SYSTEM. </p>
                                   </template>
                            </div>
                            
                            <v-flex shrink>
                                   <div class='mt-5 text-xs-center bottom' style='opacity: .5'>
                                          <h2> DESIRED QUESTION IS MISSING ? </h2>
                                          <v-btn round small  outline @click='visibility = !visibility' > ADD </v-btn> 
                                   </div>
                            </v-flex>
                     </v-layout>
              </v-flex>

       <v-bottom-sheet  :value='visibility' persistent class='white'>

              <v-icon class='close-icon' @click='visibility = !visibility'>close</v-icon>

              <v-layout  column class='' justify-space-between>
                     <v-flex xs12 class='white' pa-4 text-xs-center>
l
                            <h1 class=''> TRAIN THE SYSTEM FOR A NEW QUESTION </h1>

                            <v-text-field
                            color='purple'
                            box
                            label="Question"
                            
                            v-model='train.main'
                            ></v-text-field>
                            <v-textarea
                                   flat
                                   label="Enter An Ideal Answer"
                                   outline
                                   style=''
                                   v-model='train.answers'
                            >
                            </v-textarea>

                            <v-btn  block round :loading='train.loading' @click='handleTrain' :color='btnColor' large> TRAIN  </v-btn>


                     </v-flex>

                     
                   

              </v-layout>


              

       </v-bottom-sheet>
              <v-dialog v-model='dialog' dark>
                     <div class='result pa-5'>
                            <v-layout column
                                   fill-height
                                   justify-space-between
                                   align-center
                            >
                                   <v-flex xs12>
                                          <div class='inner-text text-xs-center'>
                                                 <h1 class='display-2'> THE STUDENT SCORED </h1> <h1 class='display-3 success--text' style='font-weight: 500; position: relative' > {{assess.finalResult}} MARKS

                                                        OUT OF <span style='font-size: 6rem;'> {{assess.total}} </span>

                                                 </h1>
                                          </div>
                                          <br/> <br/>
                                          <v-data-table
                                                 :items='sortedResult'
                                                 :headers='headers'
                                                 :rows-per-page-items=[100]
                                                 must-sort
                                                 
                                          >
                                                 <template slot='items' slot-scope='props'>
                                                        <td> <p class='subheading'> {{props.item.data}} <v-icon style='opacity:.4'  v-if='!props.item.selected'> repeat </v-icon> </p> 
                                                        </td>
                                                        <td>{{props.item.perc}}</td>
                                                        <td>{{props.item.marks}}</td>
                                                        <td> 
                                                               <template v-if='props.item.perc > 60 && props.item.selected'>
                                                                      <v-icon size='30' color='green'> check_circle </v-icon>
                                                               </template>
                                                               <template v-else>
                                                                      <v-icon color='white' style='background:red; border-radius: 100%; margin-left:3px'> close </v-icon>

                                                               </template>
                                                        </td>

                                                 </template>
                                   </v-data-table>
 
                                   </v-flex>
                            </v-layout>
                     </div>
             </v-dialog>

       
       </v-layout>
</template>

<script>



export default {


       name : 'assess',
       data(){
              return {

                     dialog: false,

                     btnColor: 'success',

                     visibility: false,
                     
                     assess: 
                     {
                            loaded: true,
                            value: '',
                            result: [],
                            resultArr: [],
                            answers: '',
                            finalResult: 0,
                            strict: -1,
                            total: 0
                     },
                     train: 
                     {
                            loading: false,
                            main: '',
                            answers: ''
                     },
                     headers: [
                            {
                                   text: 'Input',
                                   align: 'left',
                                   sortable: false,
                                   value: 'answer'
                            },
                            { text: 'Similarity Percentage', value: 'perc' },
                            { text: 'Marks alloted', value: 'marks' },
                            { text: 'Status', value: 'status', sortable: false }
                     ],

              
              }
       },
       methods: {

              reloadQ(){
                     this.$axios({
                     method: 'GET',
                     url: 'http://localhost:80/api/all',
                     })
                     .then((r) => {
                            
                            if(r.data)
                            {
                            
                                   r.data.forEach( k => {
                                          this.assess.result.push(k)
                                          //console.log(k)
                                   } )
                            
                            }
                            

                     })
              },
             /* customSort(items, index, isDescending) {
             
              items.sort((a, b) => {
                     if (index === 'calories') {
                     if (isDescending) {
                            return b.calories - a.calories;
                     } else {
                            return a.calories - b.calories;
                     }
                     }
              });

              return items;
              }, */
              animate(){

              },

              handleTrain(){

                     this.train.loading = true

                     this.$axios({
                            method: 'POST',
                            url: 'http://localhost:80/api/train',
                            headers: {
                                   Accept: 'application/json',
                                   'Content-Type' : 'application/x-www-form-urlencoded'
                            },
                            data: this.$qs.stringify({
                                   main: this.train.main,
                                   answers: this.train.answers

                            })        
                     })
                     .then((r) => {
                            

                            if(r.data.success)
                            {
                            

                                   this.train.loading = false
                                   this.visibility = false

                                   this.reloadQ()
                            }
                     })

                     .catch( (e) => {
                            if(e)
                            {
                                   this.train.loading = false
                                   this.btnColor = 'error'
                                   
                            }
                     } )
              },
              handleAssess(){
                     this.$axios({
                            method: 'POST',
                            url: 'http://localhost:80/api/assess',
                            headers: {
                                   Accept: 'application/json',
                                   'Content-Type' : 'application/x-www-form-urlencoded'
                            },
                            data: this.$qs.stringify({
                                   uid: this.assess.value,
                                   answers: this.assess.answers,
                                   strict: this.assess.strict

                            })        
                     })
                     .then((r) => {
                            this.assess.finalResult = 0;
                            this.assess.resultArr = []

                            if(r.data.success)
                            {

                            
                                   r.data.data.forEach( k => {
                                          
                                        
                                          this.assess.resultArr.push(k)
                                          if(k.perc > 60 && k.selected)
                                                 this.assess.finalResult += k.marks

                                   } )
                                 
                                   this.assess.total = r.data.total
                                   this.dialog = true
                            }
                     })
                     .catch( e => {
                            
                     })

                     }
       },
       mounted(){
              
              this.$axios({
                     method: 'GET',
                     url: 'http://localhost:80/api/all',
              })
              .then((r) => {
                     
                     if(r.data)
                     {
                     
                            r.data.forEach( k => {
                                   this.assess.result.push(k)
                                   //console.log(k)
                            } )
                     
                     }
                     

              })
       },
       computed: {
              
       
              questions(){
                     return this.assess.result.map( k => {
                            
                            return k.question
                     } )
              },

              sortedResult(){
                     
                     return this.assess.resultArr.sort( (p,n) => {
                            return n.perc - p.perc
                     })
              }
       }

}
</script>

<style>

.a-left{
     

}


.container-img{
       position: absolute;
       top:  -1rem;
       left: -2rem;
}


.container-text{
       font-size: 1.0rem;
       color: #616161;
       letter-spacing: 2px;

}

.center {
       /* background: #E0DFEF; */
       background: #D6D4EB;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.bottom{
       font-size: 1rem;
}


.close-icon{
       position: absolute;
       right: 0;
       background: white;
       border-radius: 20px;
       padding: 5px;
}

.result{
       background: #212121;
       min-height: 80vh;
       border-radius: 20px;
}
</style>
