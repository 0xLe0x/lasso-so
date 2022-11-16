<template>
  <main class="bg-white">

    <div class="relative flex">

      <!-- Content -->
      <div class="w-full">
        <div class="min-h-screen h-full flex flex-col after:flex-1">          
          
          <div class="pb-2">
            <h2 class="text-lg text-slate-400 mb-4">Set your creator qualification rules</h2>
            <!-- Form -->
            <form @submit.prevent="updateSettings">
              <div class="w-4/5 md:w-1/2 space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="num_views">Median number of views</label>
                  <input required id="num_views" type="number" v-model.number="num_views" min="1" class="form-input w-full" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="num_posts">Number of past posts to analyze</label>
                  <input required id="num_posts" type="number" v-model.number="num_posts" min="1" max="20" class="form-input w-full" />
                </div>
                <TagsInput title="Categories" :tags="categories" />
                <TagsInput title="Locations" :tags="locations "/>
              </div>
              <div class="flex items-center justify-between mt-8">
                <button v-if="loading" type="button"
                    class="btn bg-indigo-500 hover:bg-indigo-600 text-white "
                    disabled="">
                    <svg class="w-5 h-5 mr-3 ml-3 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                </button>
                <button v-else class="btn bg-indigo-500 hover:bg-indigo-600 text-white " to="/">Update Settings</button>
              </div>
            </form>
            <!-- Footer -->
            <div class="pt-5 mt-6 border-t border-slate-200">
              <!-- Notification Msg -->
              <NotificationBox v-if="notification" :message="notification" :is-error="error" />
            </div>
          </div>
        </div>
      </div>

    </div>

  </main>
</template>

<script>
import { SETTINGS_UPDATE, SETTINGS_GET } from '../../store/actions/qualify-settings';
import store from "../../store/index";
import NotificationBox from '../utils/NotificationBox.vue'
import TagsInput from "../utils/TagsInput.vue";


export default {
  name: 'SettingsForm',
  components: {
    NotificationBox,
    TagsInput,
  },
  data() {
    return {
      num_views: null,
      num_posts: null,
      categories: [],
      locations: [],
      notification: null,
      error: null,
      loading: false,
    }
  },
  async beforeCreate() {
    const getSettings = () => {
      this.$store.dispatch(SETTINGS_GET).then(() => {
        this.num_posts = store.getters.numPostsToAnalyze
        this.num_views = store.getters.medianNumViews
        this.categories = store.getters.categories
        this.locations = store.getters.locations
      })
    }

    await getSettings();
  },
  methods: {
    updateSettings() {
      this.loading = true
      this.$store.dispatch(SETTINGS_UPDATE, {
        num_posts_to_analyze: this.num_posts,
        median_num_views: this.num_views,
        categories: this.categories,
        locations: this.locations,
      }).then(() => {
        if (store.getters.settingsTaskComplete) {
          this.notification = "Settings updated successfully"
          this.error = false
          this.loading = false
        } else {
          this.notification = "Error updating settings"
          this.error = true
          this.loading = false
        }
      })
    },
  }
}
</script>

