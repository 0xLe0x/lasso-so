<template>
  <div class="mt-5" v-show="message">
    <div 
      class="px-3 py-2 rounded" 
      :class="isError ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'"
    >
      <span class="text-sm">
        {{ isError ? '✕' : '✔' }} {{ message }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NotificationBox',
  props: ['message', 'isError'], 
}
</script>
