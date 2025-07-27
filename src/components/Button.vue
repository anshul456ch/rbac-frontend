<template>
  <button
    :class="[
      'px-4 py-2 rounded-lg font-semibold transition',
      color === 'primary' ? 'bg-purple-600 text-white hover:bg-purple-700' : '',
      color === 'danger' ? 'bg-red-500 text-white hover:bg-red-600' : '',
      color === 'secondary' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : ''
    ]"
    @click="$emit('click')"
    :type="type"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  color: { type: String, default: 'primary' },
  type: { type: String, default: 'button' }
})
</script>
