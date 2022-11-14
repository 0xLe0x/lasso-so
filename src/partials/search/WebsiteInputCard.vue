<template>
  <div class="flex grow flex-col col-span-full bg-white rounded-sm">
    <div class="px-10 pb-4 pt-8">
      <h1 class="text-2xl font-semibold text-slate-800 mb-2">Add website for analysis</h1>
      <h2 class="text-lg text-slate-400 mb-6">Find creators whose content aligns with a brand's website content</h2>
      <div class="w-full">
        <div class="min-h-screen h-full flex flex-col after:flex-1">
          <div class="max-w-sm w-full py-2">
            <!-- Form -->
            <form @submit.prevent="findCreators">
              <div class="space-y-4">
                <div v-for="(client, index) in clients" :key=client.index>
                  <input type="text" class="form-input w-full" v-model="client.url" required>
                  <button class="text-xs ml-3" 
                    @click="removeClient(index)">Remove
                  </button>
                </div> 
              </div>
            </form>
            <!-- Add a client url -->
            <div class="flex items-center justify-between mt-6">
              <button class="btn font-semibold text-indigo-500 border-2 border-indigo-500 shadow"
                @click="addClient">
                Add another website
              </button>
            </div>
            <!-- Footer -->
            <div class="pt-5 mt-6 border-t border-slate-200">
              <!-- Start process -->
              <div class="flex items-center justify-between mt-6">
                <button v-if="loading" type="button"
                  class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  disabled="">
                  <svg class="w-5 h-5 mr-3 ml-3 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                  </svg>
                </button>
                <button v-else class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  @click="findCreators">
                  Find creators
                </button>
              </div>
              <!-- Notification Msg -->
              <NotificationBox v-if="notification" :message="notification" :is-error="error" />
            </div>
          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationBox from '../../partials/utils/NotificationBox.vue';
import { TASK_REQUEST } from '../../store/actions/creator-finder';

// Import utilities
import { isValidURL } from '../../utils/Utils'

export default {
  name: 'WebsiteInputCard',
  components: {
    NotificationBox,
  },
  data() {
    return {
      clients: [
        {
          url: '',
        },
      ],
      error: null,
      loading: false,
      notification: null,
      inputUrl: '',
    }
  },
  methods: {
    addClient() {
      this.clients.push({
        url: this.text || '',
      })
    },
    removeClient(index) {
      this.clients.splice(index, 1)
    },
    findCreators() {
      this.loading = true;
      if (this.clients.length === 0 || this.$store.state.creatorFinder.platformsSelected.length === 0) {
        this.error = true;
        this.notification = 'Please add at least one client and one platform';
        this.loading = false;
        return;
      }
      else if (this.clients.length > 10) {
        this.error = true;
        this.notification = 'Please remove some clients (max 10)';
        this.loading = false;
        return;
      }
      else if (!this.$store.state.user.profile.username) {
        this.error = true;
        this.notification = 'Please try logging in again to continue';
        this.loading = false;
        return;
      }
      else {
        const invalid_urls = this.clients.filter(item => (
          isValidURL(item.url) === false || 
          item.url === ''
        ));
        if (invalid_urls.length > 0) {
          this.error = true;
          this.notification = `Invalid url(s): ${invalid_urls.map(item => item.url).join(', ')}`;
          this.loading = false;
          return;
        }
        else {
          this.$store.dispatch(TASK_REQUEST, 
              { 
                urls: this.clients.map(item => item.url), 
                platforms: this.$store.state.creatorFinder.platformsSelected,
                locations: this.$store.state.creatorFinder.locationsSelected,
              }
            ).then(() => {
              if (this.$store.state.creatorFinder.error) {
                this.error = true;
                this.notification = this.$store.state.creatorFinder.error;
                this.loading = false;
              }
              else if (this.$store.state.creatorFinder.status === "success") {
                this.error = false;
                this.notification = "Task created successfully, we'll email you when it is done";
                this.loading = false;
              }
          });
        }
      }
    }
  },
}
</script>
