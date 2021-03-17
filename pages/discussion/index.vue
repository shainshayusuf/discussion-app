<template>
  <v-container>
    <add-discussion v-on:passValue="emitValue"></add-discussion>
    <all-discussion :update="updateVal"></all-discussion>
  </v-container>
</template>

<script>
import allDiscussion from "~/components/allDiscussion.vue";
export default {
  components: { allDiscussion },
  middleware: "authenticated",
  name: "discussionPage",
  layout: "discussionLayout",
  data() {
    return {
      discussions: [],
      updateVal:true
    };
  },
  methods: {
    emitValue(val) {
      this.updateVal = !this.updateVal
    },
  },
  created() {},
};
</script>