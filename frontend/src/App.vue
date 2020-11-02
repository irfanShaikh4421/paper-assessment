<template>
  
  <v-app style='height: 100%;'>

    <navbar> </navbar>
    
      <fade-transition mode='out-in'> 
        <router-view> </router-view>
      </fade-transition>
      
      
  </v-app>

</template>

<script>

import navbar from './components/navbar'

function process(data)
{

  
    if(typeof data === 'object') {
        
        var temp = []
        temp[0] = Object.keys(data)

        if( temp[0].length > 0)
        {
            temp[1] = new URLSearchParams()
            temp[0].forEach( k => {

                let tt = ''
                if(Array.isArray(data[k])){
                  data[k].forEach( zz => {
                    temp[1].append(k,zz)
                  } )
                }
                else
                temp[1].append(k, data[k])
            } )

          //  console.log(temp[1].toString())


            return temp[1]

        }  
        
    
        return false
    }  


/*

    let temp =  Object.keys(data)
    let res = new FormData()
    temp.forEach( k => {
        res.append(k,data[k])
    
       console.log(k+'   - '+JSON.stringify(data[k]))
       // console.log('res is ')
    } )
 */
    //alert(JSON.stringify(res))
    console.log(JSON.stringify(res))
    //return res 



}

export default {
  name: 'app',
  components: {
    navbar
  },

  mounted(){
    /*
    
    var temp = {
      question: 'What is genetic Algorithm',
      answers: [
        'genetic algorithm uses heuristic technique',
        'it is adaptive in nature',
        'it is based on human genetics',
        'it is a good algorithm',
        'it is efficient algorithm',
        'it is fast algorithm'
     ]
    }

    console.log(process(temp).toString())

    console.log('yo')

    this.$axios(
      {
        baseURL: 'http://localhost:80/api/',
        url: '/train',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        data: process({
          main: 'What is genetic algo',
          questions: 
            ["explain genetic algorithm",
            "short note on genetic algorithm",
            "pros and cons of genetic algorithm",
            "advantages and disadvantages of genetic algorithm"],
          answers: 
          ["genetic algorithm belongs to evolutionary algorithms",
            "genetic algorithm is based on human genetics",
            "genetic algorithm is based on  biological genes",
            "genetic algorithm is based on the concept of human genes",
            "it belongs to adaptive hueristic algorithm",
            "it gets better with each iteration"] 

        })

      }
    )
    */
  }
}
</script>

<style>

#app {

  background: #ECECEC;

  height: 100%;
}


</style>
