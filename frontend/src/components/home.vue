<template>
       <v-layout row fill-height>

              <v-flex class='' offset-xs1 xs4>   

                     <v-layout 
                            column
                            fill-height
                            justify-center
                            align-center
                     >
                            <v-flex xs4 shrink class=' inner-text s' pa-5> 

                                   <v-layout row>
                                          
                                          <v-flex xs2 mr-4 ml-1>
                                                 <div class='h-line' style=''> </div>
                                          </v-flex>

                                          <v-flex xs> 
                                                 <h1 class='spaced display-1' > EYIC </h1>
                                          </v-flex>
                     
                                   </v-layout>

                                   <br/>
 
                                   <div class='spaced'> 
                                          <h1> MARKS </h1>
                                          <h1> ASSESSMENT </h1>
                                   </div>

                                   <br/> 
                                   <p> Bringing artificial intelligence to education system </p>

                                   <br/> <br/> 
                                   <v-btn
                                          round
                                          block
                                          outline
                                          large
                                          color='#6C63FF'
                                          to='assess'
                                   > LAUNCH </v-btn>
                            </v-flex>
                     </v-layout>

              </v-flex>
              <v-flex offset-xs-1  xs6 pa-5 >
                     <illustration id='ill'></illustration>
              </v-flex>

       </v-layout>
</template>

<script>

import illustration from './props/illustration'

export default {

       name: 'home',
       components: {
              illustration
       }

}
</script>

<style>

#ill{
       width: 110%
}

.s{
       margin-top: -20vh;
       margin-left: -30vh;
}

.inner-text{
       
       font-size: 1.5rem;
       color: #616161;

      
}

.spaced {
       letter-spacing: 6px;
       line-height: 1.5;
}

.h-line{
       margin-top: 25% ;
       width: 100%;
       height: 5px;
       background: #6C63FF;
}

</style>
