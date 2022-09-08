import { gql } from '@urql/vue'
import client from '../../client';
import { USER_CREATE, USER_VERIFY, USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user';
import { AUTH_LOGOUT } from "../actions/auth";

const WHOAMI = gql`
  query ($user_id: ID!) {
    user (id: $user_id){
      username,
      verified
    }
  }
`

const CREATE_USER = gql` 
  mutation ($email: String!, $username: String!, $password: String!) {
    register(
      email: $email,
      username: $username,
      password1: $password,
      password2: $password
    ) {
      success,
      errors,
      token,
      refreshToken
    }
  }
`

const VERIFY_USER = gql` 
  mutation ($verification_token: String!) {
    verifyAccount(
      token: $verification_token,
    ) {
      success, 
      errors
    }
  }
`

const state = { status: "", profile: {} };

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }, user) => {
    commit(USER_REQUEST);
    client.query(WHOAMI, { user_id: user.id })
      .toPromise()
      .then(resp => {
        commit(USER_SUCCESS, resp.data.user);
      })
      .catch(() => {
        commit(USER_ERROR);
        dispatch(AUTH_LOGOUT);
      });
  },
  [USER_CREATE]: ({ commit, dispatch }, user) => {
    commit(USER_REQUEST);
    console.log(user);
    client.mutation(CREATE_USER, { 
        email: user.email, 
        username: user.username,
        password: user.password,
      })
      .toPromise()
      .then(resp => {
        commit(USER_SUCCESS, user);
        dispatch(AUTH_LOGIN, user);
    })      
    .catch(() => {
      commit(USER_ERROR);
      dispatch(AUTH_LOGOUT);
    });
  },
  [USER_VERIFY]: ({ commit, dispatch }, verification_token) => {
    client.mutation(VERIFY_USER, { verification_token })
      .toPromise().then(resp => {console.log(resp)}).catch(() => {});
  }
};

const mutations = {
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, user) => {
    state.status = "success";
    state.profile = user;
  },
  [USER_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
