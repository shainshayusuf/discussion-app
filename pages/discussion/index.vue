<template>
  <v-container>
    <add-discussion></add-discussion>
    <v-card v-for="discussion in discussions" :key="discussion._id">
        <v-card-title>{{discussion.topic}}</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: "authenticated",
  name: "discussionPage",
  layout: "discussionLayout",
  data(){
      return {
     discussions : []
      }
  },
  methods: {
      getAllDiscussion(){
          this.$axios.$get('api/discussion/getAll').then((res) => {
              console.log(res.data)
              this.discussions = res.data
          }).catch((err) => {
              console.log(err)
          })
      }
  },
  created(){
      this.getAllDiscussion();
  }
};
</script>