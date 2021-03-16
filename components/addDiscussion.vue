<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="white"
          light
          v-bind="attrs"
          v-on="on"
        >
          Add discussion
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Discussion</span>
        </v-card-title>
        <v-card-text>
         <v-text-field
            label="Title"
            v-model="data.title"
          ></v-text-field>
          <v-textarea
          name="input-7-1"
          label="Description"
          v-model="data.description"
          hint="Hint text"
        ></v-textarea>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            outlined
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="white"
            text
            outlined
            @click="addTopic()"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
  export default {
      name:'discussion',
    data: () => ({
      dialog: false,
      data:{
          title:'',
           description:''
      }
    }),
     computed: {
    ...mapGetters(["getuserLogged"])
     },
    methods:{
        addTopic(){
            console.log('entered')
            this.$axios.$post('/api/discussion/addTopic',{title:this.data.title,description:this.data.description,user:this.getuserLogged}).then((res) => {
                this.dialog = false
            })
        }
    }
  }
</script>