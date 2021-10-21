import { createStore } from "vuex";

export default createStore({
  state: {
    provider: null,
    signer: null,
    socket: null,
    address: "",
    chatMessageList: [],
  },
  mutations: {
    setProvider(state, provider) {
      state.provider = provider;
    },
    setSigner(state, signer) {
      state.signer = signer;
    },
    setSocket(state, socket) {
      state.socket = socket;
    },
    setAddress(state, address) {
      state.address = address;
    },
    pushToChatMessageList(state, chatMessage) {
      state.chatMessageList.push(chatMessage);
    },
    clearChatMessageList(state) {
      state.chatMessageList = [];
    },
  },
  actions: {},
  modules: {},
});
