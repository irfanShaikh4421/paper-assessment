<template>
    <v-toolbar dark class=' grey darken-4 white--text' 
    >
    
        
        <v-spacer> </v-spacer>

        <!-- 
        <v-btn flat class='custom-active'> Home </v-btn>
        <v-btn flat> Products </v-btn>
        <v-btn flat> Certifications </v-btn>
        <v-btn flat> About us </v-btn> -->

        <v-toolbar-items>
            <template v-for='item in path'> 
                <v-btn flat 
                    exact
                    :to='item.path'
                    v-if='filterNav(item)'
                > {{item.name}} </v-btn>
            </template>
        </v-toolbar-items>

        
    </v-toolbar>
</template>

<script>
export default {

    name : 'Navigation',
    methods: {
        filterNav(item){
            return !item.hidden ? true : false
        }
    },
    computed: {
        path(){
            
            return this.$router.options.routes
        }
    }

}
</script>

<style>

</style>
