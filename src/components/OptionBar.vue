<template>
  <div v-if="show">
    <v-card height="100%">
      <v-toolbar color="pink" dark>
        <v-toolbar-title>Options</v-toolbar-title>
      </v-toolbar>

      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>arrow_back</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-4">All Lists</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-for="(item, key) in items"
          v-bind:key="key"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-for="(subItem, key) in item.items"
            v-bind:key="key"
            active-class
            v-on="item.action === 'sort' ? { click: () => sort(subItem.by)} : { click: () => filter(subItem.by)}"
          >
            <v-list-item-content>
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item @click.prevent="removeList()">
          <v-list-item-icon>
            <v-icon>delete</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="ml-4 danger">Remove list</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "optionBar",
  components: {},
  data: () => ({
    items: [
      {
        action: "sort",
        title: "Sort by",
        active: false,
        items: [
          {
            title: "Date",
            by: "date"
          },
          {
            title: "Name",
            by: "name"
          }
        ]
      },
      {
        action: "filter_list",
        title: "Filter by",
        active: false,
        items: [
          {
            title: "Remaining",
            by: "remaining"
          },
          {
            title: "Completed",
            by: "completed"
          },
          {
            title: "All",
            by: "all"
          }
        ]
      }
    ]
  }),
  computed: {
    show() {
      return !!this.$route.params.id;
    }
  },
  methods: {
    sort(value) {
      this.$store.dispatch("SORT_BY", { value, listId: this.$route.params.id });
    },
    filter(value) {
      this.$store.dispatch("FILTER_BY", {
        value,
        listId: this.$route.params.id
      });
    },
    removeList() {
      this.$store
        .dispatch("DELETE_LIST", {
          listId: this.$route.params.id
        })
        .then(response => {
          this.$store.commit("SET_NOTIFICATION", {
            display: true,
            text: "List has been removed",
            alertClass: "success"
          });
          this.$router.push({ name: "todo" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    displayNotification() {
      this.$store.commit("SET_NOTIFICATION", {
        display: true,
        text: "List removed!",
        alertClass: "error",
        timeout: 3000
      });
    }
  }
};
</script>

<style>
</style>