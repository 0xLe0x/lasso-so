import { createClient } from '@urql/vue';
import store from "./store/index";

const client = createClient({
  url: 'https://local-api.topaly.xyz/', // TODO: change this to the production API URL
  fetchOptions: () => {
    const token = store.getters.authToken;
    console.log("Token: ", token)
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});

export default client;
