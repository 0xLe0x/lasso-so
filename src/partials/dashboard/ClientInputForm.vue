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
                <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">
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
      console.log('findCreators')
    }
  },
}
</script>

