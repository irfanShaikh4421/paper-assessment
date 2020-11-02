<template>
       <v-layout
              v-bind='$attrs'
              row
              align-center
              justify-center
              pa-2
              fill-height
       >
              <v-flex  >
                     <slot/>
              </v-flex>
       </v-layout>
</template>

<script>
export default {
       
}
</script>

<style>

</style>
