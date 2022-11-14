<template>
  <main class="bg-white">

    <div class="relative flex">

      <!-- Content -->
      <div class="grid grid-cols-12 gap-6 w-full">
        <PlatformFilterCard />
        <LocationFilterCard />
        <WebsiteInputCard />
      </div>

    </div>

  </main>
</template>


<script>
import LocationFilterCard from './LocationFilterCard.vue';
import PlatformFilterCard from './PlatformFilterCard.vue';
import WebsiteInputCard from './WebsiteInputCard.vue';


export default{
  name: 'ClientInputForm',
  components: {
    LocationFilterCard,
    PlatformFilterCard,
    WebsiteInputCard,
  },
}
</script>

