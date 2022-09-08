import { createClient, dedupExchange, cacheExchange, fetchExchange, gql } from '@urql/vue';
import { authExchange } from '@urql/exchange-auth';
import store from './store/index';
import router from './router';
import { AUTH_LOGOUT } from './store/actions/auth';


const REFRESH_USER_TOKEN = gql`
  mutation ($refresh_token: String!) {
    refreshToken(
      refreshToken: $refresh_token
    ) {
      success,
      errors,
      payload,
      token,
      refreshToken
    }
  }
`

const signout = () => {
  store.dispatch(AUTH_LOGOUT).then(() => {
    router.push('/signin')
  })
}

const getAuth = async ({ authState, mutate }) => {
  if (!authState) {
    const token = localStorage.getItem('user-token');
    const refreshToken = localStorage.getItem('user-refresh-token');
    if (token && refreshToken) {
      return { token, refreshToken };
    }
    return null;
  }
  /**
   * the following code gets executed when an auth error has occurred
   * we should refresh the token if possible and return a new auth state
   * If refresh fails, we should log out
   **/
  const result = await mutate(REFRESH_USER_TOKEN, {
    refresh_token: authState?.refreshToken,
  });

  if (result.data?.refreshToken.success) {
    // save the new tokens in storage for next restart
    localStorage.setItem('user-token', result.data.refreshToken.token);
    localStorage.setItem('user-refresh-token', result.data.refreshToken.refreshToken);

    // return the new tokens
    return {
      token: result.data.refreshToken.token,
      refreshToken: result.data.refreshToken.refreshToken,
    };
  }

  // otherwise, if refresh fails, log clear storage and log out
  localStorage.clear();
  signout();

  return null;
};

const addAuthToOperation = ({ authState, operation }) => {
  // the token isn't in the auth state, return the operation without changes
  if (!authState || !authState.token) {
    return operation;
  }

  // fetchOptions can be a function (See Client API) but you can simplify this based on usage
  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return {
    ...operation,
    context: {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          "Authorization": authState.token,
        },
      },
    },
  };
}

const client = createClient({
  url: 'https://local-api.topaly.xyz/', // TODO: change this to the production API URL
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      getAuth,
      addAuthToOperation,
    }),
    fetchExchange,
  ]
});

export default client;
