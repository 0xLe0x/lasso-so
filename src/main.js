import { createApp } from 'vue'
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import router from './router'
import client from './client';
import store from "./store/index";
import App from './App.vue'

import './css/style.css'

const app = createApp(App)

Sentry.init({
  app,
  dsn: "https://953f58a4378248edb1130131172c697b@o1406871.ingest.sentry.io/6741154",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["app.topaly.xyz", "local-app.topaly.xyz", /^\//],
    }),
  ],
  tracesSampleRate: 1.0,
  logErrors: true, // log errors to console
  environment: import.meta.env.VITE_NODE_ENV,
});

app.use(router)
app.use(client) 
app.use(store)
app.mount('#app')
