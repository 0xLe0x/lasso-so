<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <!-- Site header -->
      <Header
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div class="flex grow flex-col col-span-full bg-white rounded-sm">
            <div class="px-10 pb-4 pt-8">
              <h1 class="text-2xl font-semibold text-slate-800 mb-2">Email</h1>
              <div>
                <div v-if="!email_connected" :key="componentKey">
                  <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                    @click="connectGmail">
                    Connect Gmail
                  </button>
                  <!-- Notification Msg -->
                  <NotificationBox v-if="notification" :message="notification" :is-error="error" />
                </div>
                <div v-else>
                  <EmailForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import store from "../store/index";
import EmailForm from "../partials/email/EmailForm.vue";
import Header from "../partials/Header.vue";
import NotificationBox from '../partials/utils/NotificationBox.vue'
import Sidebar from "../partials/Sidebar.vue";
import { EMAIL_CONNECT_REQUEST, GET_EMAIL_CONNECT_STATUS_REQUEST } from '../store/actions/email';

import { getGoogleUrl } from "../utils/Google";

export default {
  name: "Email",
  components: {
    EmailForm,
    Header,
    NotificationBox,
    Sidebar,
  },
  data() {
    return {
      componentKey: 0,
      email_connected: false,
      notification: null,
      error: null,
      loading: false,
    };
  },
  mounted() {
    this.$store.dispatch(GET_EMAIL_CONNECT_STATUS_REQUEST).then(() => {
      this.email_connected = store.getters.isEmailConnected;
    }).then(() => {
      if (!store.getters.isEmailConnected) {
        var query = this.$route.query;
        if (query && query.code) {
          this.$store.dispatch(EMAIL_CONNECT_REQUEST, query.code).then(() => {
          if (this.$store.state.email.error) {
            this.notification = "Error connecting to Gmail";
            this.error = true
            this.loading = false
            this.email_connected = store.getters.isEmailConnected;
          } else {
            this.error = false
            this.loading = false
            this.notification = "Successfully connected to Gmail";
          }
          }, error => {});
        }
      }
    });
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
  methods: {
    connectGmail() {
      this.loading = true
      var url = getGoogleUrl();
      window.location.href = url;
    },
  },
};
</script>
