import axios from "axios";
export default {
  state: {
    loggedin: false,
  },
  getters: {
    LOGGEDIN: (state) => {
      return state.loggedin;
    },
  },
  mutations: {
    SET_LOGGEDIN: (state, payload) => {
      state.loggedin = payload;
    },
  },
  actions: {
    LOGIN: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`login_check`, payload)
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(true);
              commit("SET_LOGGEDIN", true);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    REGISTER: ({ commit }, { email, password }) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`register`, {
            email,
            password,
          })
          .then(({ data, status }) => {
            if (status === 201) {
              resolve(true);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    LOGOUT: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`logout`)
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(true);
              commit("SET_LOGGEDIN", false);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
