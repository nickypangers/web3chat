import { createStore } from "vuex";

export default createStore({
  state: {
    socket: null,
  },
  mutations: {
    setSocket(state, newSocket) {
      state.socket = newSocket;
    },
  },
  actions: {},
  modules: {},
});
