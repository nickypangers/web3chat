<template>
  <div>
    <form @submit.prevent="sendMessage">
      <input type="text" placeholder="Enter message" v-model="message" />
      <input type="submit" value="Send" />
    </form>
    <button @click="sendTransaction">Send Transaction</button>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { ethers } from "ethers";
import { getProvider } from "@/ethers/ethers.js";

export default {
  name: "Chat Input Row",
  setup() {
    const store = useStore();

    const message = ref("");

    const socket = computed(() => store.state.socket);

    const sendMessage = () => {
      if (!message.value) {
        return;
      }
      socket.value.send(message.value);
      message.value = "";
    };

    const sendTransaction = async () => {
      //   const provider = new ethers.providers.Web3Provider(window.ethereum);
      let balance = await getProvider().getBalance(store.state.address);
      let balanceString = ethers.utils.formatEther(balance);
      console.log(balanceString + "ETH");
    };

    return {
      message,
      sendMessage,
      sendTransaction,
    };
  },
};
</script>
