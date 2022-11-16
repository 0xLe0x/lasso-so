<template>
  <main class="bg-white">

    <div class="relative flex pb-2">

      <!-- Content -->
      <div class="w-full">
        <div class="flex flex-col after:flex-1">     

          <div class="max-w-lg">
            <div class="relative">
              <label class="block text-sm font-medium mb-1">{{ title }}</label>
              <input @keyup.enter="submit" v-on:keydown.enter.prevent="submit" v-model="text" class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter some tags">
              <!-- selections -->
              <div class="bg-indigo-500 inline-flex items-center text-sm rounded mt-2 mr-1 overflow-hidden" v-for="(item,index) in tags" :key="index">
                <span class="font-medium ml-2 mr-1 text-white leading-relaxed truncate max-w-xs px-1">{{item}}</span>
                <i class="w-6 h-8 inline-block align-middle text-white bg-indigo-500 focus:outline-none" @click="remove(index)">
                  <svg class="w-6 h-6 text-white mx-auto my-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"/></svg>
                </i>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

  </main>
</template>

<script>
export default {
  name: 'TagsInput',
  props: {
    title: {
      type: String,
      default: 'Tags'
    },
    tags: {
      type: Array,
      default: () => []
    }
  },
  components: {
  },
  data() {
    return {
      newTag: '',
    }
  },
  computed: {
  },
  methods: {
    remove(index) {
      this.tags.splice(index, 1);
    },
    submit(e) {
      if (!this.text) return;
      if (this.text == ",") {
        this.text = "";
        return;
      }
      this.text = this.text.replace(",", "");
      const isNotExist = this.tags.every(item => {
        return item != this.text;
      });
      if (isNotExist) {
        this.tags.push(this.text.replace(",", ""));
        this.text = "";
      }
      this.$emit('change',this.tags);
    }
  }
}
</script>
