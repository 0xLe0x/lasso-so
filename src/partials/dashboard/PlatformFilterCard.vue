<template>
  <div class="flex grow flex-row flex-col col-span-full bg-white rounded-sm border-b border-slate-200">
    <div class="px-10 pb-4 pt-8">
      <h1 class="text-2xl font-semibold text-slate-800 mb-2">Select creator platforms</h1>
      <h2 class="text-lg text-slate-400 mb-2">Select the platforms to source creators from</h2>
      <!-- Platform checkboxes -->
      <div class="grow my-4">
        <div class="flex flex-col h-full">
          <!-- Card content -->
          <div class="grid grid-flow-rows grid-cols-12 gap-4 grow">
            <ul class="col-span-12 md:col-span-4 lg:col-span-3 space-y-1 text-sm text-slate-800 mt-3 mb-4" v-for="platform in platforms" :key="platform">
              <input @change="updateStore" :id="platform" :value="platform" type="checkbox" v-model="checkedPlatforms" class="ml-1 mr-3 w-4 h-4 text-indigo-500 bg-white rounded border-slate-300 focus:ring-indigo-300"/>
              <label class="text-sm font-medium text-slate-800" :for="platform"><span>{{ platform }} </span></label>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PlatformFilterCard',
  components: {
  },
  data() {
    return {
      platforms: ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn', 'Medium', 'Substack'],
      checkedPlatforms: [],
    }
  },
  methods: {
    updateStore() {
      this.$store.state.creatorFinder.platformsSelected = this.checkedPlatforms;
    }
  },
}
</script>
