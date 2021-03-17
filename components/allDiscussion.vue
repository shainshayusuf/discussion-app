<template>
  <div>
    <loading v-if="loading"></loading>
    <v-card v-else
      v-for="(discussion, i) in discussions"
      :key="discussion._id"
      style="margin: 20px"
      elevation="10"
    >
      <v-card-title>{{ discussion.topic }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>{{ discussion.description }}</v-card-text>
      <v-card-actions>
        <span style="font-size: 10px"> - {{ discussion.createdBy }}</span>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="teal accent-4"
          v-if="getAuthValue"
          @click="openDetailed(i)"
        >
          Learn More
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="500" v-if="discussions">
      <v-card>
        <v-card-title class="headline">
          <v-flex xs12 class="d-flex flex-row-reverse"
            ><v-btn icon color="white" @click="dialog = false"
              ><v-icon dark> mdi-close </v-icon></v-btn
            ></v-flex
          >
          <br />
          {{ selected.topic }}
        </v-card-title>

        <v-card-text>
          {{ selected.description }}
          <v-divider style="margin: 10px 0px"></v-divider>
          <h5>Comments</h5>
          <v-list style="max-height: 200px" class="overflow-y-auto">
            <v-list-item v-for="(commentVal, i) in selected.comments" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ commentVal.by }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  commentVal.comment
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-text-field
            label="Add comment"
            append-outer-icon="mdi-send"
            @click:append-outer="addComment()"
            v-model="comment"
          >
          </v-text-field>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  props: ["update"],
  data() {
    return {
      discussions: [],
      dialog: false,
      comment: null,
      loading: false,
      selected: {},
    };
  },
  computed: {
    ...mapGetters(["getuserLogged", "getAuthValue"]),
  },
  watch: {
    update: function () {
      this.getAllDiscussion();
    },
  },
  methods: {
    getAllDiscussion() {
      this.loading = true
      this.$axios
        .$get("api/discussion/getAll")
        .then((res) => {
          this.discussions = res.data;
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
        });
    },
    addComment() {
      const data = { comment: this.comment, by: this.getuserLogged };

      this.$axios
        .$put("api/discussion/addComment", {
          id: this.selected._id,
          comment: data,
        })
        .then((res) => {
          this.comment = "";
          this.discussions.forEach((val, index) => {
            if (val._id == res._id) {
              this.discussions[index].comments.push(data);
            }
          });
         // this.selected.comments.push(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openDetailed(val) {
      this.dialog = true;
      this.selected = this.discussions[val];
    },
  },
  created() {
    this.getAllDiscussion();
  },
};
</script>