<template>
  <main class="bg-white">

    <div class="relative flex">

      <!-- Content -->
      <div class="w-full">
        <div class="min-h-screen h-full flex flex-col after:flex-1">          
          
          <div class="pb-2">
            <h2 class="text-lg text-slate-400 mb-4">Set your email outreach copy</h2>
            <!-- Form -->
            <form @submit.prevent="setEmailCopy">
              <div class="w-4/5 md:w-1/2 space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="subject">Subject</label>
                  <input required id="subject" v-model="subject" class="form-input w-full" type="subject" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="message">Message</label>
                  <textarea class="form-input w-full" required v-model="message" name="message" id="message" placeholder="Your message..." />
                </div>
              </div>
              <div class="flex items-center justify-between mt-6">
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
                <button v-else class="btn bg-indigo-500 hover:bg-indigo-600 text-white " to="/">Set Email Copy</button>
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
import { UPDATE_EMAIL_COPY_REQUEST } from '../../store/actions/email';
import store from "../../store/index";
import NotificationBox from '../utils/NotificationBox.vue'


export default {
  name: 'EmailForm',
  components: {
    NotificationBox,
  },
  data() {
    return {
      subject: '',
      message: '',
      notification: null,
      error: null,
      loading: false,
    }
  },
  methods: {
    setEmailCopy() {
      this.loading = true
      this.$store.dispatch(UPDATE_EMAIL_COPY_REQUEST, {
        subject: this.subject,
        message: this.message,
      }).then(() => {
        if (store.getters.emailTaskComplete) {
          this.notification = "Email copy updated successfully"
          this.error = false
          this.loading = false
        } else {
          this.notification = err
          this.error = true
          this.loading = false
        }
      })
    }
  }
}
</script>

