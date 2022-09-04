<template>
  <div v-if="fetching">
    Loading...
  </div>
  <div v-else-if="error">
    Oh no... {{error}}
  </div>
  <div v-else>
    <ul v-if="data">
      <li v-for="user in data.users.edges" :key="user.node.id">{{ user.node.username }}</li>
    </ul>
  </div>
</template>

<script>
import { useQuery } from '@urql/vue';

export default {
  name: "URQL",
  setup() {
    const result = useQuery({
      query: `
        {
          users {
            edges {
              node {
                id
                username
              }
            }
          }
        }
      `
    });
    console.log(result);
    return {
      fetching: result.fetching,
      data: result.data,
      error: result.error,
    };
  }
};
</script>
