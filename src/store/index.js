import { createStore } from "vuex";

export default createStore({
  state: {
    socket: null,
    address: "",
  },
  mutations: {
    setSocket(state, newSocket) {
      state.socket = newSocket;
    },
    setAddress(state, address) {
      state.address = address;
    },
  },
  actions: {},
  modules: {},
});
