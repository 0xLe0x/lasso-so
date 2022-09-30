<template>
  <main class="bg-white">

    <div class="relative flex">

      <!-- Content -->
      <div class="w-full md:w-1/2">
        <div class="min-h-screen h-full flex flex-col after:flex-1">

          <div class="max-w-sm mx-auto px-4 py-8">
            <h1 class="text-3xl text-slate-800 font-bold mb-6">Add your client list</h1>
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
            <div>
              <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 mt-4" 
                @click="addClient">Add another client
              </button>
            </div>

            <!-- Footer -->
            <div class="pt-5 mt-6 border-t border-slate-200">
              <!-- Start process -->
              <div class="flex items-center justify-between mt-6">
                <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
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

  </main>
</template>


<script>
import NotificationBox from '../../partials/utils/NotificationBox.vue';
import { TASK_REQUEST } from '../../store/actions/creator-finder';

// Import utilities
import { isValidURL } from '../../utils/Utils'

export default{
  name: 'ClientInputForm',
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
      notification: null,
      inputUrl: '',
    }
  },
  methods: {
    addClient() {
      this.clients.push({
        url: this.text,
      })
    },
    removeClient(index) {
      this.clients.splice(index, 1)
    },
    findCreators() {
      if (this.clients.length === 0) {
        this.error = true;
        this.notification = 'Please add at least one client';
        return;
      }
      else if (this.clients.length > 10) {
        this.error = true;
        this.notification = 'Please remove some clients (max 10)';
        return;
      }
      else {
        const invalid_urls = this.clients.filter(item => isValidURL(item.url) === false);
        console.log("invalid urls: ", invalid_urls, this.clients);
        if (invalid_urls.length > 0) {
          this.error = true;
          this.notification = `Please include complete urls, e.g. https://example.com. 
            Errors: ${invalid_urls.map(item => item.url).join(', ')}`;
          return;
        }
        else {
          console.log('Input urls ', this.clients.map(item => item.url));
          this.$store.dispatch(TASK_REQUEST, this.clients.map(item => item.url)).then(() => {
            if (this.$store.state.creatorFinder.error) {
              console.log('Error: ', this.$store.state.creatorFinder.error);
              this.error = true;
              this.notification = this.$store.state.creatorFinder.error;
            }
            else if (this.$store.state.creatorFinder.status === "success") {
              this.error = false;
              this.notification = "Task created successfully, we'll email you when it is done";
            }
          });
        }
      }
    }
  },
}
</script>

