<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      <!-- Slot for content -->
      <slot />
      <!-- Footer -->
      <div class="mt-4 text-right">
        <Button color="secondary" @click="$emit('close')">Close</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from './Button.vue'
defineProps({
  show: Boolean
})
</script>
