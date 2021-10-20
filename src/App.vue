<template>
  <div v-if="!isConnected">
    <input class="border border-black" type="text" v-model="address" />
    <button class="bg-blue-200 px-2 py-1" @click="connectToChat">
      Connect
    </button>
  </div>
  <div v-if="isConnected">
    <div class="mt-3 w-full mt-12 container">
      <ChatBubble
        v-for="(chatMessage, index) in chatMessages"
        :chat="chatMessage"
        :key="'chat-' + index"
      />
    </div>
    <input type="text" v-model="message" class="border border-black" />
    <button
      class="button bg-blue-300 px-4 py-2"
      @click="sendMessage"
      :disabled="socket == null"
    >
      Hi
    </button>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import ChatBubble from "@/components/ChatBubble.vue";

export default {
  name: "App",
  components: {
    ChatBubble,
  },
  setup() {
    let store = useStore();

    const socket = computed(() => store.state.socket);

    const message = ref("");

    const chatMessages = ref([]);

    const address = ref("");

    const sendMessage = () => {
      if (!message.value) {
        return;
      }
      socket.value.send(message.value);
      message.value = "";
    };

    const isConnected = ref(false);

    const connectToChat = () => {
      if (!address.value) {
        console.log("address cannot be empty");
        return;
      }
      let newSocket = new WebSocket(
        // "ws://" + window.location.hostname + ":3000/ws?address=" + address.value
        "ws://gowschatserver.herokuapp.com/ws?address=" + address.value
      );

      console.log("Attempting WebSocket Connection");

      newSocket.onopen = () => {
        store.commit("setSocket", newSocket);
        isConnected.value = true;
        console.log("Successfully connected");

        store.commit("setAddress", address.value);
        address.value = "";
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
    };

    onMounted(() => {});

    return {
      address,
      isConnected,
      connectToChat,
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
