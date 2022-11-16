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
              <h1 class="text-2xl font-semibold text-slate-800 mb-2">Qualify</h1>
              <SettingsForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Header from "../partials/Header.vue";
import Sidebar from "../partials/Sidebar.vue";
import SettingsForm from "../partials/qualify/SettingsForm.vue";


export default {
  name: "Qualify",
  components: {
    Header,
    Sidebar,
    SettingsForm,
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
};
</script>
