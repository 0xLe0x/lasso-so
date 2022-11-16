import _ from 'lodash';
import { gql } from '@urql/vue'
import client from '../../client';
import { 
  EMAIL_SUCCESS, EMAIL_ERROR, EMAIL_CONNECT_REQUEST,
  UPDATE_EMAIL_COPY_REQUEST, GET_EMAIL_CONNECT_STATUS_REQUEST
} from "../actions/email";

const EMAIL_AUTH_REQUEST = gql`
  mutation ($auth_code: String!) {
    createEmailConnection(authCode: $auth_code) {
      success
      errors
    }
  }
`

const EMAIL_COPY_UPDATE_REQUEST = gql`
  mutation ($subject: String!, $message: String!) {
    updateEmailCopy(subject: $subject, message: $message) {
      success
      errors
    }
  }
`

const EMAIL_STATUS_REQUEST = gql`
  query {
    isEmailConnected
  }
`

const state = {
  status: "",
  connected: false,
  error: null
};

const getters = {
  isEmailConnected: state => state.connected,
  emailTaskComplete: state => state.status == "success" ? true : false,
};

const mutations = {
  [EMAIL_SUCCESS]: state => {
    state.status = "success";
    state.connected = true;
    state.error = null;
  },
  [EMAIL_ERROR]: (state, error) => {
    state.status = "error";
    state.connected = false;
    state.error = error;
  },
  [EMAIL_CONNECT_REQUEST]: state => {
    state.status = "loading";
  },
  [GET_EMAIL_CONNECT_STATUS_REQUEST]: state => {
    state.status = "loading";
  },
  [UPDATE_EMAIL_COPY_REQUEST]: state => {
    state.status = "loading";
  },
};

const actions = {
  [EMAIL_CONNECT_REQUEST]: ({ commit, dispatch }, auth_code) => {
      commit(EMAIL_CONNECT_REQUEST);
      return client.mutation(EMAIL_AUTH_REQUEST,
        { 
          auth_code: auth_code,
        })
        .toPromise()
        .then(resp => {
          var data = resp.data.createEmailConnection;
          if (data && data.success) {
            commit(EMAIL_SUCCESS);
          } else {
            var err;
            if (data) {
              err = data.errors ? data.errors[0] : resp.error;
            } else {
              err = resp.error;
            }
            commit(EMAIL_ERROR, err);
          }
        })
        .catch(err => {
          commit(EMAIL_ERROR, err);
        });
  },
  [GET_EMAIL_CONNECT_STATUS_REQUEST]: ({ commit, dispatch }) => {
    commit(GET_EMAIL_CONNECT_STATUS_REQUEST);
    return client.query(EMAIL_STATUS_REQUEST).toPromise()
      .then(resp => {
        if (resp.data.isEmailConnected) {
          commit(EMAIL_SUCCESS, resp.data.isEmailConnected);
        } else {
          var err;
          if (data) {
            err = data.errors ? data.errors[0] : resp.error;
          } else {
            err = resp.error;
          }
          commit(EMAIL_ERROR, err);
        }
      })
      .catch(err => {
        commit(EMAIL_ERROR, err);
      });
  },
  [UPDATE_EMAIL_COPY_REQUEST]: ({ commit, dispatch }, copy) => {
    commit(UPDATE_EMAIL_COPY_REQUEST);
    return client.mutation(EMAIL_COPY_UPDATE_REQUEST, { 
        subject: copy.subject,
        message: copy.message 
      }).toPromise().then(resp => {
        var data = resp.data.updateEmailCopy;
        if (data && data.success) {
          commit(EMAIL_SUCCESS, data.success);
        } else {
          var err = resp.error;
          commit(EMAIL_ERROR, err);
        }
      })
      .catch(err => {
        commit(EMAIL_ERROR, err);
      });
  },

};

export default {
  actions,
  getters,
  mutations,
  state,
};
