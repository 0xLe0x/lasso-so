import { gql } from '@urql/vue'
import client from '../../client';
import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user';
import { AUTH_LOGOUT } from "../actions/auth";

const WHOAMI = gql`
  query ($user_id: ID!) {
    user (id: $user_id){
      username,
      verified
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
        console.log("whoami: ", resp);
        commit(USER_SUCCESS, resp.data.user);
      })
      .catch(() => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
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
