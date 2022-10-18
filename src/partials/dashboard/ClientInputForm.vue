<template>
  <main class="bg-white">

    <div class="relative flex">

      <!-- Content -->
      <div class="grid grid-cols-12 gap-6 w-full">
        <PlatformFilterCard />
        <WebsiteInputCard />
      </div>

    </div>

  </main>
</template>


<script>
import WebsiteInputCard from './WebsiteInputCard.vue';
import PlatformFilterCard from './PlatformFilterCard.vue';

export default{
  name: 'ClientInputForm',
  components: {
    WebsiteInputCard,
    PlatformFilterCard,
  },
}
</script>

