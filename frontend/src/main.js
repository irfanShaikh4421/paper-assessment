import Vue from 'vue'
import vuetify from 'vuetify'
import router from 'vue-router'
import axios from 'axios'
import transition from 'vue2-transitions'
import qs from 'qs'


import { AtomSpinner } from 'epic-spinners'

Vue.component('AtomSpinner',AtomSpinner)

import centered from './components/helpers/centered'

Vue.component('centered',centered)

import anime from 'animejs'

Object.assign(Vue.prototype,'$anime',{value: anime})

import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(transition)

Object.defineProperty(Vue.prototype,'$axios',{value: axios})
Object.defineProperty(Vue.prototype,'$qs',{value: qs})


Vue.config.productionTip = false

Vue.use(router)
Vue.use(vuetify)


//essential

import 'vuetify/dist/vuetify.min.css' 

// router components  

import App from './App.vue'



// end of router components



import home from './components/home'
import assess from './components/assess'

new Vue({
  render: h => h(App),
  router: new router({
    routes: [
      {
        path: '/',
        component: home,
        name: 'Home'
        
      },
      {
        path: '/assess',
        component: assess,
        name: 'Assess'
        
      },
 
    ],
    mode: 'history'
  })
}).$mount('#app')
