<template>
  <v-app>
    <template>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <h1 style="font-family: Caladea">Task Manager</h1>
        <v-spacer></v-spacer>
        <v-btn v-if="loggedin" outlined @click.prevent="logout()">Logout</v-btn>
      </v-toolbar>
    </template>

    <router-view></router-view>

    <v-footer color="primary">
      <v-layout>
        <v-flex white--text text-center>
          &copy;2020
          <strong>Patrick Bukenberger</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
// import Login from "./components/Auth/Login";
// import Signup from "./components/Auth/Signup";
// import Todo from "./components/Todo";

export default {
  name: "App",
  components: {},
  computed: {
    loggedin() {
      return this.$store.getters.LOGGEDIN;
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch("LOGOUT")

        .then(success => {
          this.$router.push("/login");
        })
        .catch((this.error = true));
    }
  }
};
</script>

