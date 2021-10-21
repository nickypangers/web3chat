<template>
  <div>
    <ChatArea />
    <ChatInputRow />
  </div>
</template>
<script>
import ChatArea from "@/components/ChatArea.vue";
import ChatInputRow from "@/components/ChatInputRow.vue";
export default {
  name: "Chat Section",
  components: {
    ChatArea,
    ChatInputRow,
  },
  setup() {},
};
</script>
