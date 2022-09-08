import { gql } from '@urql/vue'
import client from '../../client';
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from "../actions/auth";
import { USER_REQUEST } from "../actions/user";

const SIGNIN = gql`
  mutation ($password: String!, $email: String!) { 
    tokenAuth(password: $password, email: $email) {
      success
      errors
      user {
        id
        email
      }
      token
    }
  }
`

const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  authToken: state => state.token
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = "success";
    state.token = token;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    state.token = "";
  }
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      client.mutation(SIGNIN,
        { 
          password: user.password, 
          email: user.email 
        })
        .toPromise()
        .then(result => {
          if (result.data.tokenAuth.success) {
            localStorage.setItem('user-token', result.data.tokenAuth.token)
            commit(AUTH_SUCCESS, result.data.tokenAuth.token);
            dispatch(USER_REQUEST, result.data.tokenAuth.user);
            resolve(result);
          }
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("user-token");
      resolve();
    });
  }
};

export default {
  actions,
  getters,
  mutations,
  state,
};
