<template>
  <main class="bg-white">

    <div class="relative flex">

      <!-- Content -->
      <div class="w-full md:w-1/2">
        <div class="min-h-screen h-full flex flex-col after:flex-1">

          <div class="flex-1">
            <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <!-- Logo -->
              <router-link class="block" to="/">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <defs>
                    <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                      <stop stop-color="#A5B4FC" stop-opacity="0" offset="0%" />
                      <stop stop-color="#A5B4FC" offset="100%" />
                    </linearGradient>
                    <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                      <stop stop-color="#38BDF8" stop-opacity="0" offset="0%" />
                      <stop stop-color="#38BDF8" offset="100%" />
                    </linearGradient>
                  </defs>
                  <rect fill="#6366F1" width="32" height="32" rx="16" />
                  <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
                  <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
                  <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
                </svg>
              </router-link>
            </div>
          </div>          

          <div class="max-w-sm mx-auto px-4 py-8">
            <h1 class="text-3xl text-slate-800 font-bold mb-6">Create your Account ✨</h1>
            <!-- Form -->
            <form @submit.prevent="signUp">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="email">Email Address <span class="text-rose-500">*</span></label>
                  <input required id="email" v-model="email" class="form-input w-full" type="email" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="username">User Name <span class="text-rose-500">*</span></label>
                  <input required id="username" v-model="username" class="form-input w-full" type="text" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="password">Password</label>
                  <input required id="password" v-model="password" class="form-input w-full" type="password" autoComplete="on" />
                </div>
                <!-- reCAPTCHA -->
                <VueRecaptcha
                  :sitekey="siteKey"
                  @verify="handleRecaptchaSuccess"
                  @error="handleRecaptchaError"
                ></VueRecaptcha>

                <div class="flex items-center justify-between mt-6">
                  <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" to="/">Sign Up</button>
                </div>
              </div>
            </form>

            <!-- Footer -->
            <div class="pt-5 mt-6 border-t border-slate-200">
              <div class="text-sm">
                Already have an account? <router-link class="font-medium text-indigo-500 hover:text-indigo-600" to="/signin">Sign In</router-link>
              </div>
              <!-- Notification Msg -->
              <NotificationBox v-if="notification" :message="notification" :is-error="error" />
            </div>
          </div>

        </div>
      </div>

      <!-- Image -->
      <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
        <img class="object-cover object-center w-full h-full" src="../images/auth-image.jpg" width="760" height="1024" alt="Authentication" />
        <img class="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src="../images/auth-decoration.png" width="218" height="224" alt="Authentication decoration" />
      </div>

    </div>

  </main>
</template>

<script>
import { VueRecaptcha } from 'vue-recaptcha';
import NotificationBox from '../partials/utils/NotificationBox.vue'
import { USER_CREATE } from '../store/actions/user'

export default {
  name: 'Signup',
  components: {
    NotificationBox,
    VueRecaptcha,
  },
  data() {
    return {
      email: '',
      username: '',
      password: '',
      notification: null,
      error: null,
      siteKey: import.meta.env.VITE_GCP_RECAPTCHA_KEY,
      is_recaptcha_verified: false,
    }
  },
  methods: {
    signUp() {
      if (!this.is_recaptcha_verified) {
        this.notification = 'Please verify that you are not a robot.'
        this.error = true
        return
      }
      const { email, username, password } = this
      this.$store.dispatch(USER_CREATE, { email, username, password }).then(resp => {
        if (this.$store.state.user.error) {
          this.notification = this.$store.state.user.error
          this.error = true
        } else {
          this.notification = 'Account verification email sent! Please check your inbox.'
          this.error = false
        }
      }, error => {})
    },
    handleRecaptchaSuccess() {
      this.is_recaptcha_verified = true
    },
    handleRecaptchaError() {
      this.error = true
      this.notification = 'Recaptcha verification failed. Please try again.'
    }
  }
}
</script>
