<template>
  <v-container fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue">
            <v-toolbar-title>Signup form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-alert
                :value="userExists"
                color="error"
                icon="warning"
                dark
              >This user already exists, try a different email address.</v-alert>

              <v-text-field
                prepend-icon="email"
                name="email"
                v-model="email"
                label="Email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                prepend-icon="lock"
                name="password"
                v-model="password"
                label="Password"
                :rules="[rules.required]"
                type="password"
              ></v-text-field>

              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Confirm Password"
                :rules="[rules.required]"
                type="password"
                v-model="confirm_password"
                :error="!valid()"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn to="/login" rounded dark color="primary">Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded color="success" @click.prevent="register()">
              Register
              <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "signup",
  data: () => ({
    userExists: false,
    email: "",
    password: "",
    confirm_password: "",
    rules: {
      required: value => !!value || "Required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  methods: {
    register() {
      if (this.valid()) {
        this.$store
          .dispatch("REGISTER", {
            email: this.email,
            password: this.password
          })
          .then(({ status }) => {
            this.$store.commit("SET_NOTIFICATION", {
              display: true,
              text: "You successfully registered!",
              alertClass: "success"
            });
            this.$router.push("/login");
          })
          .catch(error => {
            this.userExists = true;
          });
      }
    },
    valid() {
      return this.password === this.confirm_password;
    }
  }
};
</script>

<style>
</style>