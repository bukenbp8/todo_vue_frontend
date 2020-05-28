import Vue from "vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";

import axios from "axios";
import store from "./stores/store";

import App from "./App.vue";
import Todo from "./components/Todo";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Tasks from "./components/Tasks";
import NotesModal from "./components/NotesModal";

Vue.config.productionTip = false;

Vue.use(VueRouter);

axios.defaults.baseURL = "http://localhost:8000/api/";
axios.defaults.withCredentials = true;

const routes = [
  {
    path: "/",
    name: "todo",
    component: Todo,
    beforeEnter: (to, from, next) => {
      if (to.name !== "login" && store.getters.LOGGEDIN == false)
        next({ name: "login" });
      else next();
    },
  },
  {
    path: "/list/:id",
    name: "tasks",
    component: Tasks,
    beforeEnter: (to, from, next) => {
      if (to.name !== "login" && store.getters.LOGGEDIN == false)
        next({ name: "login" });
      else next();
    },
    children: [
      {
        path: "task/:taskId",
        component: NotesModal,
        name: "notes",
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: "/signup",
    component: Signup,
    name: "signup",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  base: "/",
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
