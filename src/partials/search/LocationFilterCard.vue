<template>
  <div class="flex grow flex-row flex-col col-span-full bg-white rounded-sm border-b border-slate-200">
    <div class="px-10 pb-4 pt-8">
      <h1 class="text-2xl font-semibold text-slate-800 mb-2">Select creator locations</h1>
      <h2 class="text-lg text-slate-400 mb-2">Select the locations to source creators from</h2>
      <!-- Location checkboxes -->
      <div class="grow my-4">
        <div class="flex flex-col h-full">
          <!-- Card content -->
          <div class="grid grid-flow-rows grid-cols-12 gap-4 grow">
            <ul class="col-span-12 md:col-span-4 lg:col-span-3 space-y-1 text-sm text-slate-800 mt-3 mb-4" v-for="location in locations" :key="location">
              <input @change="updateStore" :id="location" :value="location" type="checkbox" v-model="checkedLocations" class="ml-1 mr-3 w-4 h-4 text-indigo-500 bg-white rounded border-slate-300 focus:ring-indigo-300"/>
              <label class="text-sm font-medium text-slate-800" :for="location"><span>{{ location }} </span></label>
            </ul>
          </div>
          <div class="grid grid-flow-rows grid-cols-12 gap-4 grow mt-3">
            <div class="col-span-12 md:col-span-4 lg:col-span-3 space-y-1 text-sm text-slate-800 mt-3 mb-4">
              <input @change="updateStore" :id="otherLocation" v-model="otherLocation" class="block text-sm font-medium mb-1 form-input w-full" type="text" placeholder="Other" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LocationFilterCard',
  components: {
  },
  data() {
    return {
      locations: ['USA', 'UK'],
      checkedLocations: [],
      otherLocation: null,
    }
  },
  methods: {
    updateStore() {
      this.$store.state.creatorFinder.locationsSelected = this.checkedLocations;
      if (this.otherLocation) {
        this.$store.state.creatorFinder.locationsSelected = this.$store.state.creatorFinder.locationsSelected.filter(
          item => ![this.otherLocation].includes(item))
        this.$store.state.creatorFinder.locationsSelected.push(this.otherLocation);
      }
    }
  },
}
</script>
