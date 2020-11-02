<template>
       <transition appear v-bind='$attrs' :css='false' @enter='handleEnter'>  
              <div class='d-block'>  
              <div style='position: relative; display: inline-block'>
                     <div class='__wrapper'> 
                            <div ref='__cover' class='__cover' :style='coverStyle'> </div>
                            <div ref='__data' style='opacity: 0'> 
                                   <slot />
                            </div>
                     </div>
              
              </div>
              </div>
</transition>
</template>

<script>
export default {
       name: 'yo',
       methods: {
              handleEnter(){
                     //console.log('entered')
                     this.timeline = this.$anime.timeline({
                            targets: [this.$refs.__data, this.$refs.__cover],
                            autoplay: true,
                            duration: 10,
                            delay: this.delay
                     })

                     this.timeline.add({
                            targets: this.$refs.__cover,
                            scaleX: [0,1],
                            easing: 'easeInOutQuad',
                            duration: this.duration})
                     this.timeline.add({
                            targets: this.$refs.__data,
                            opacity: 1
                     },'-=10')
                     this.timeline.add({
                            targets: this.$refs.__cover,
                            scaleX: [1,0],
                            easing: 'easeInOutQuad',
                            delay: this.endDelay,
                            duration: this.duration})
                     
                     
                     
              }
       },
       props: {
              zindex: {
                     type: Number,
                     required: false,
                     default: 55
              },
              background: {
                     type: String,
                     required: false,
                     default: '#008364'
              },
              padding: {
                     type: String,
                     required: false,
                     default: '0px 0px'
              },
              delay: {
                     required: false,
                     default: 0
              },
              endDelay: {
                     required: false,
                     default: 0
              },
              direction: {
                     required: false,
                     default: 'right'
              },
              duration: {
                     required: false,
                     default: 200
              }
       },
       data(){
              return {
                     timeline: null ,
                     coverStyle: {
                            position: 'absolute',
                            display: 'inline-block',
                            top: '0px',
                            left: '0px',
                            width: '100%',
                            height: '100%',
                            'z-index': this.zindex,
                            background: this.background,
                            padding: this.padding,
                            transformOrigin: this.direction
                     }
              }
       }
}
</script>

<style>

.__wrapper{
       display: inline-block;
}

</style>
