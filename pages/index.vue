<template>
  <v-container>
    <v-snackbar v-model="successsnackBar" absolute top right color="success">
      <span>{{ messageText }}</span>
      <v-icon dark>mdi-checkbox-marked-circle</v-icon>
    </v-snackbar>
    <v-snackbar v-model="failuresnackBar" absolute top right color="red">
      <span>{{ messageText }}</span>
      <v-icon dark>mdi-progress-alert</v-icon>
    </v-snackbar>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs7>
          <v-card style="margin: 20px; padding: 10px;max-height: 700px" class="overflow-y-auto">
            <v-card-title>All Discussions</v-card-title>
            <all-discussion></all-discussion>
          </v-card>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs5>
          <v-card style="margin: 20px">
            <v-card-text>
              <v-tabs v-model="tab" show-arrows icons-and-text dark grow>
                <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                <v-tab v-for="i in tabs" :key="i.name">
                  <v-icon large>{{ i.icon }}</v-icon>
                  <div class="caption py-1">{{ i.name }}</div>
                </v-tab>
                <v-tab-item>
                  <v-card class="px-4">
                    <v-card-text>
                      <v-form ref="loginForm" v-model="valid" lazy-validation>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="loginEmail"
                              :rules="emailRules"
                              label="E-mail"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="loginPassword"
                              :append-icon="show1 ? 'eye' : 'eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="show1 ? 'text' : 'password'"
                              name="input-10-1"
                              label="Password"
                              hint="At least 8 characters"
                              counter
                              @click:append="show1 = !show1"
                            ></v-text-field>
                          </v-col>
                          <v-col class="d-flex" cols="12" sm="6" xsm="12">
                          </v-col>
                          <v-spacer></v-spacer>
                          <v-col
                            class="d-flex"
                            cols="12"
                            sm="3"
                            xsm="12"
                            align-end
                          >
                            <v-btn
                              block
                              :disabled="!valid"
                              color="success"
                              @click="validateLogin()"
                            >
                              Login
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card class="px-4">
                    <v-card-text>
                      <v-form
                        ref="registerForm"
                        v-model="validRegister"
                        lazy-validation
                      >
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="email"
                              :rules="emailRules"
                              label="E-mail"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="password"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="show1 ? 'text' : 'password'"
                              name="input-10-1"
                              label="Password"
                              hint="At least 8 characters"
                              counter
                              @click:append="show1 = !show1"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              block
                              v-model="verify"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, passwordMatch]"
                              :type="show1 ? 'text' : 'password'"
                              name="input-10-1"
                              label="Confirm Password"
                              counter
                              @click:append="show1 = !show1"
                            ></v-text-field>
                          </v-col>
                          <v-spacer></v-spacer>
                          <v-col
                            class="d-flex ml-auto"
                            cols="12"
                            sm="3"
                            xsm="12"
                          >
                            <v-btn
                              block
                              :disabled="!validRegister"
                              color="success"
                              @click="validateRegister()"
                              >Register</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "HomePage",
  data: () => ({
    dialog: true,
    isLogin: false,
    successsnackBar: false,
    failuresnackBar: false,
    messageText: "",
    tab: 0,
    tabs: [
      { name: "Login", icon: "mdi-account" },
      { name: "Register", icon: "mdi-account-outline" },
    ],
    valid: false,
    validRegister:false,
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
  },
  methods: {
    ...mapMutations(["update"]),
    validateRegister() {
      if (this.$refs.registerForm.validate()) {
        // submit form to server/API here...
        this.$axios
          .$post("/api/users/register", {
            email: this.email,
            password: this.password,
            password2: this.verify,
          })
          .then((response) => {
            this.successsnackBar = true;
            this.messageText =
              response.message + " Login with your credentials";
          })
          .catch((err) => {
            this.failuresnackBar = true;
            this.messageText = "Mail Already Exists";
          });
      }
    },
    validateLogin() {
      if (this.$refs.loginForm.validate()) {
        this.$axios
          .$post("/api/users/login", {
            email: this.loginEmail,
            password: this.loginPassword,
          })
          .then((response) => {
            this.successsnackBar = true;
            this.messageText = response.message;
            this.update({ authenticated: true, userLogged: response.user });
            this.$router.push("/discussion");
          })
          .catch((err) => {
            this.failuresnackBar = true;
            this.messageText = "Check your email and password";
          });
      }
    },
  },
};
</script>
