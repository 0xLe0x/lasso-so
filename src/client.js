import { createClient } from '@urql/vue';


const client = createClient({
  url: 'https://local-api.topaly.xyz/', // TODO: change this to the production API URL
});

export default client;
