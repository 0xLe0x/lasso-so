import _ from 'lodash';
import { gql } from '@urql/vue'
import client from '../../client';
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from "../actions/auth";
import { USER_REQUEST, USER_LOGOUT } from "../actions/user";

export const USER_AUTH_TOKEN = "USER_AUTH_TOKEN"
export const USER_AUTH_REFRESH_TOKEN = "USER_AUTH_REFRESH_TOKEN"

const TOKEN_AUTH_REQUEST = gql`
  mutation ($username: String!, $password: String!) {
    tokenAuth (username: $username, password: $password) {
      token
      refreshToken
      payload
    }
  }
`

const state = {
  token: localStorage.getItem(USER_AUTH_TOKEN) || "",
  refreshToken: localStorage.getItem(USER_AUTH_REFRESH_TOKEN) || "",
  status: "",
  hasLoadedOnce: false,
  error: null
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  authToken: state => state.token,
  refreshToken: state => state.refreshToken,
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, auth) => {
    state.status = "success";
    state.token = auth.token;
    state.refreshToken = auth.refreshToken;
    state.hasLoadedOnce = true;
    state.error = null;
  },
  [AUTH_ERROR]: (state, error) => {
    state.status = "error";
    state.hasLoadedOnce = true;
    state.error = error;
  },
  [AUTH_LOGOUT]: state => {
    state.status = "";
    state.token = "";
    state.refreshToken = "";
    state.hasLoadedOnce = false;
  }
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
      commit(AUTH_REQUEST);
      return client.mutation(TOKEN_AUTH_REQUEST,
        { 
          password: user.password, 
          username: user.username
        })
        .toPromise()
        .then(resp => {
          if (resp.data.tokenAuth) {
            localStorage.setItem(USER_AUTH_TOKEN, resp.data.tokenAuth.token)
            localStorage.setItem(USER_AUTH_REFRESH_TOKEN, resp.data.tokenAuth.refreshToken)
            commit(AUTH_SUCCESS, resp.data.tokenAuth);
            dispatch(USER_REQUEST, user);
          } else {
            commit(AUTH_ERROR, resp.error.graphQLErrors[0].message);
            localStorage.removeItem(USER_AUTH_TOKEN);
          }
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem(USER_AUTH_TOKEN);
        });
  },
  [AUTH_LOGOUT]: ({ commit, dispatch }) => {
    commit(AUTH_LOGOUT);
    return new Promise(resolve => {
      localStorage.removeItem(USER_AUTH_TOKEN);
      dispatch(USER_LOGOUT);
      resolve();
    })
  }
};

export default {
  actions,
  getters,
  mutations,
  state,
};
