<template>

       <v-layout
              column
              fill-height
              align-center
              justify-center
              ml-5

       

              
       >
              <v-flex style='margin-top: 300px;'> 
                            <v-layout column
                                   fill-height
                            class='main' >
                                   <v-flex> 
                                                 <v-layout row justify-space-between>
                                                        <v-flex xs6 grow>
                                                               <h1 class='display-4'> Marks </h1>
                                                        </v-flex>
                                                        <v-flex xs6 grow> <h1 class='display-2 font-weight-thin'> A point awarded for a correct answer </h1> </v-flex>
                                                 </v-layout>
                                   </v-flex>

                                   <br/> <br/>

                                   <v-flex>
                                                 <v-layout row justify-space-between>
                                                        <v-flex xs6 grow>
                                                               <h1 class='display-4'> Assessment </h1>
                                                        </v-flex>
                                                        <v-flex xs6 grow> <h1 class='display-2 font-weight-thin'> The action of assessing someone or something </h1> </v-flex>
                                                 </v-layout>
                                   </v-flex>

                                   <v-flex>
                                                 <v-btn absolute
                                                        large
                                                        outline
                                                        color='purple'
                                                        to='/first'

                                                        style='
                                                               margin-top: 100px;
                                                               font-size: 32px;
                                                               height: 50px;
                                                               padding: 50px;
                                                               margin-left: 200px;
                                                        '
                                                 >
                                                        Launch
                                                 </v-btn>
                                   </v-flex>
                            </v-layout>
              </v-flex>
       

       </v-layout> 
</template>

<script>
export default {

       name: 'corpus'

}
</script>

<style>

       .main {
              position: relative;
              margin-left: 250px !important;
              
       }

       .main:before{

              position: absolute;
              content: ' ';
              left: -100px;
              top: 0px;
              width: 24px;
              height: 100%;
              background: #4c2ecc;
              
       }

</style>
