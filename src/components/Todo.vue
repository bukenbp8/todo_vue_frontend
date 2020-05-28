<template>
  <v-container fill-height>
    <v-layout>
      <v-flex>
        <v-btn v-if="loggedin" rounded dark @click.prevent="logout()">Logout</v-btn>
        <Lists />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import Tasks from "./Tasks";
// import OptionsBar from "./OptionBar";
import Lists from "./Lists";
// import Tasks from "./Tasks";

export default {
  name: "todo",
  components: { Lists }
};
</script>

<style>
</style>