<template>
  <div class="flex items-center" :class="rowClass">
    <div class="bubble" :class="bubbleClass">
      <p v-if="!isSelf">{{ chat.address }}</p>
      <div class="bubble-content" :class="{ 'mt-2': !isSelf }">
        <p>{{ chat.message }}</p>
        <p class="text-sm text-gray-600 ml-2">{{ chat.displayTime }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    chat: Object,
  },
  setup(props) {
    const store = useStore();

    const isSelf = computed(() => props.chat.address == store.state.address);

    const rowClass = computed(() => {
      return {
        "justify-end": isSelf.value,
        "justify-start": !isSelf.value,
      };
    });

    const bubbleClass = computed(() => {
      return {
        self: isSelf.value,
        other: !isSelf.value,
      };
    });

    return {
      rowClass,
      isSelf,
      bubbleClass,
    };
  },
};
</script>

<style scoped>
.bubble {
  @apply px-3 pt-3 py-2 my-0.5 rounded-xl text-left;
  min-width: 4rem;
}

.bubble-content {
  @apply flex items-center justify-between items-end;
}

.self {
  @apply bg-blue-300;
}

.other {
  @apply bg-green-300;
}
</style>
