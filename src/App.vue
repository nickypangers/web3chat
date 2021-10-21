<template>
  <div v-if="!isConnected">
    <form @submit.prevent="connectToChat">
      <!-- <input class="border border-black" type="text" v-model="address" /> -->
      <input class="bg bg-blue-200 px-2 py-1" type="submit" value="Connect" />
    </form>
  </div>
  <div v-if="isConnected">
    <p>{{ store.state.address }}</p>
    <ChatSection />
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import ChatSection from "@/components/ChatSection.vue";

import { websocketURL } from "@/settings/index.js";
import { processMessage } from "@/helpers/messages.js";
import { ethers } from "ethers";

export default {
  name: "App",
  components: {
    ChatSection,
  },
  setup() {
    let store = useStore();

    const socket = computed(() => store.state.socket);

    const address = ref("");

    const isConnected = ref(false);

    const connectToChat = () => {
      if (!address.value) {
        console.log("address cannot be empty");
        return;
      }
      let newSocket = new WebSocket(websocketURL(address.value));

      console.log("Attempting WebSocket Connection");

      newSocket.onopen = () => {
        store.commit("setSocket", newSocket);
        isConnected.value = true;
        console.log("Successfully connected");

        store.commit("setAddress", address.value);
        address.value = "";
      };

      newSocket.onmessage = (msg) => {
        // let object = JSON.parse(msg.data);
        // store.commit("pushToChatMessageList", object);
        processMessage(msg.data);
      };

      newSocket.onclose = (event) => {
        console.log("Closed connection: ", event);
        store.commit("setSocket", null);
        store.commit("clearChatMessageList");
      };
    };

    onMounted(async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      store.commit("setProvider", provider);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      store.commit("setSigner", signer);
      // console.log("Account:", await signer.getAddress());
      address.value = await signer.getAddress();
    });

    return {
      address,
      isConnected,
      connectToChat,
      socket,
      store,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
