const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // baseUrl: "https://local.topaly.xyz",
  // env: {
  //   BASE_API_URL: "https://local-api.topaly.xyz",
  // },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
