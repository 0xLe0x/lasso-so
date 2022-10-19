import { createClient, dedupExchange, cacheExchange, fetchExchange, gql } from '@urql/vue';
import { makeOperation } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';
import store from './store/index';
import router from './router';
import { AUTH_LOGOUT } from './store/actions/auth';
import { USER_AUTH_TOKEN, USER_AUTH_REFRESH_TOKEN } from './store/modules/auth';


const REFRESH_USER_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      payload
      refreshToken
      refreshExpiresIn
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
    const token = localStorage.getItem(USER_AUTH_TOKEN);
    const refreshToken = localStorage.getItem(USER_AUTH_REFRESH_TOKEN);
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
    localStorage.setItem(USER_AUTH_TOKEN, result.data.refreshToken.token);
    localStorage.setItem(USER_AUTH_REFRESH_TOKEN, result.data.refreshToken.refreshToken);

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

const willAuthError = ({ authState }) => {
  if (!authState) return true;
  // e.g. check for expiration, existence of auth etc
  return false;
}

const didAuthError = ({ error }) => {
  // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
  return error.graphQLErrors.some(
    e => e.extensions?.code === 'FORBIDDEN',
  );
}

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

  return makeOperation(
    operation.kind,
    operation,
    {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          "Authorization": `JWT ${authState.token}`,
        },
        credentials: 'include',
      },
    },
  );
}

const client = createClient({
  url: import.meta.env.VITE_API_BACKEND_URL,
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      addAuthToOperation,
      didAuthError,
      getAuth,
      willAuthError,
    }),
    fetchExchange,
  ]
});

export default client;
