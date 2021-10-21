<template>
  <div class="mt-3 w-full mt-12 container h-5/6">
    <ChatBubble
      v-for="(chatMessage, index) in chatMessageList"
      :chat="chatMessage"
      :key="'chat-' + index"
    />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import ChatBubble from "@/components/ChatBubble.vue";
export default {
  name: "Chat Area",
  components: {
    ChatBubble,
  },
  setup() {
    const store = useStore();

    const chatMessageList = computed(() => store.state.chatMessageList);

    return {
      chatMessageList,
    };
  },
};
</script>
