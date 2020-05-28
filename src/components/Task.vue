<template>
  <v-list-item>
    <v-list-item-action>
      <v-btn icon @click.stop="openModal()">
        <v-icon color="pink">edit</v-icon>
      </v-btn>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title class="title">{{ task.title }}</v-list-item-title>
      <v-list-item-subtitle>This list has {{ NOTES_COUNT }} notes.</v-list-item-subtitle>
      <v-list-item-subtitle>Created {{ task.created_at | moment }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon @click="toggle(index)">
        <v-icon v-if="!task.is_complete" color="grey">check_circle</v-icon>

        <v-icon v-else color="green">check_circle</v-icon>
      </v-btn>
    </v-list-item-action>
    <router-view :key="$route.fullPath" :name="notes"></router-view>
  </v-list-item>
</template>

<script>
import moment from "moment";

export default {
  name: "task",
  props: {
    task: Object,
    index: Number
  },
  data: () => ({
    selected: [2]
  }),
  computed: {
    NOTES_COUNT() {
      return this.task.notes.length;
    }
  },
  filters: {
    moment: function(date) {
      return moment(date)
        .startOf("minutes")
        .fromNow();
    }
  },

  methods: {
    toggle(index) {
      this.$store.dispatch("TOGGLE_TASK", {
        taskId: this.task.id,
        listId: this.$route.params.id
      });
    },
    openModal() {
      this.$router.push({
        name: "notes",
        params: { taskId: this.task.id }
      });
    }
  }
};
</script>

<style>
</style>