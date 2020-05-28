<template>
  <v-navigation-drawer permanent style="width: 100%;">
    <v-toolbar color="blue" dark>
      <v-toolbar-title v-if="!DISPLAY_SEARCH_LIST">Your lists</v-toolbar-title>
      <SearchBar v-if="DISPLAY_SEARCH_LIST" />
      <v-spacer></v-spacer>
      <v-btn icon @click="toogleSearchList()">
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list>
      <v-list-item @click.prevent="openNewListForm()" v-if="!isOpen">
        <v-list-item-content class="primary--text">Create a new list</v-list-item-content>
        <v-list-item-action>
          <v-list-item-title>
            <v-icon>add</v-icon>
          </v-list-item-title>
        </v-list-item-action>
      </v-list-item>
      <v-list-item v-if="openNewListFormValue">
        <NewList />
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-responsive>
      <v-list>
        <v-list-item
          :to="{ name: 'tasks', params: { id: list.id }}"
          v-for="(list, key) in CURATED_LISTS"
          v-bind:key="key"
        >
          <v-list-item-content>
            <v-list-item-title>{{ list.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-title>{{ TASKS_COUNT(list.id) }}</v-list-item-title>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-responsive>
  </v-navigation-drawer>
</template>

<script>
import SearchBar from "./SearchBar";
import NewList from "./NewList";
import { mapGetters } from "vuex";

export default {
  name: "lists",
  components: { SearchBar, NewList },
  computed: {
    ...mapGetters(["DISPLAY_SEARCH_LIST", "CURATED_LISTS"]),
    openNewListFormValue: {
      get() {
        return this.$store.getters.NEW_LIST_FORM;
      },
      set(value) {
        this.$store.commit("SET_NEW_LIST_FORM", value);
      }
    },
    isOpen() {
      return this.$store.getters.NEW_LIST_FORM;
    }
  },
  methods: {
    toogleSearchList() {
      this.$store.commit("SET_DISPLAY_SEARCH_LIST", !this.DISPLAY_SEARCH_LIST);
    },
    openNewListForm() {
      this.$store.commit("SET_NEW_LIST_FORM", true);
    },
    TASKS_COUNT(index) {
      return this.$store.getters.TASKS_COUNT(index);
    }
  },
  mounted() {
    this.$store.dispatch("GET_LISTS");
  }
};
</script>
