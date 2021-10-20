<template>
  <input type="text" v-model="message" class="border border-black" />
  <button
    class="button bg-blue-300 px-4 py-2"
    @click="sendMessage"
    :disabled="socket == null"
  >
    Hi
  </button>
  <div>
    <div
      class="border"
      v-for="(chatMessage, index) in chatMessages"
      :key="'chat-' + index"
    >
      <p class="text-start">
        {{ chatMessage.time }}
      </p>
      <p class="text-start">
        {{ chatMessage.message }}
      </p>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
// import { sendMessage as send, decodeMessage } from "@/helpers/socket.js";

export default {
  name: "App",
  setup() {
    let store = useStore();

    const socket = computed(() => store.state.socket);

    const message = ref("");

    const chatMessages = ref([]);

    const sendMessage = () => {
      if (!message.value) {
        return;
      }
      socket.value.send(message.value);
      message.value = "";
    };

    onMounted(() => {
      let newSocket = new WebSocket(
        "ws://" + window.location.hostname + ":3000/ws"
      );
      console.log("Attempting WebSocket Connection");

      newSocket.onopen = () => {
        console.log("Successfully connected");
        store.commit("setSocket", newSocket);
        socket.value.send("hello");
      };

      newSocket.onmessage = (msg) => {
        let object = JSON.parse(msg.data);
        console.log(object);
        chatMessages.value.push(object);
      };

      newSocket.onclose = (event) => {
        console.log("Closed connection: ", event);
        store.commit("setSocket", null);
      };
    });

    return {
      sendMessage,
      message,
      socket,
      chatMessages,
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
