<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn 
      text
      @click="logout()"
      >Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data () {
    return {
      clipped: false,
      title: 'Discussion Forum'
    }
  },
  methods:{
       ...mapMutations(["update"]),
      logout(){
          this.$axios.$get('/api/users/logout').then(()=>{
              this.update({authenticated:false,userLogged:''})
              this.$router.push('/')
          })
      }
  }
}
</script>
