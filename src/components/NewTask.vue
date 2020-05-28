<template>
  <v-form @submit.prevent="createNewTask()">
    <v-text-field v-model="title" solo label="Add a new Task" append-icon="add"></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: "newTask",
  methods: {
    createNewTask() {
      this.$store.dispatch("POST_TASK", {
        taskTitle: this.title,
        listId: this.$route.params.id
      });
      this.$store.commit("SET_NOTIFICATION", {
        display: true,
        text: "Task has been created!",
        alertClass: "success"
      });
      this.title = "";
    }
  }
};
</script>

<style>
</style>