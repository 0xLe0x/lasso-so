import _ from 'lodash';
import { gql } from '@urql/vue'
import client from '../../client';
import { TASK_SUCCESS, TASK_ERROR, TASK_REQUEST } from "../actions/creator-finder";

const FIND_CREATORS = gql`
  mutation ($urls: [String]!) {
    createCreatorFinderTasks (urls: $urls) {
      taskIds,
      success,
      errors
    }
  }
`

const state = {
  status: "",
  error: null
};

const getters = {
  taskStatus: state => state.status,
  taskError: state => state.error,
};

const mutations = {
  [TASK_REQUEST]: state => {
    state.status = "loading";
  },
  [TASK_SUCCESS]: state => {
    state.status = "success";
    state.error = null;
  },
  [TASK_ERROR]: (state, error) => {
    state.status = "error";
    state.error = error;
  },
};

const actions = {
  [TASK_REQUEST]: ({ commit, dispatch }, urls) => {
      commit(TASK_REQUEST);
      return client.mutation(FIND_CREATORS,
        { 
          urls: urls
        })
        .toPromise()
        .then(resp => {
          console.log(resp);
          if (resp.data.createCreatorFinderTasks) {
            commit(TASK_SUCCESS);           
          } else {
            commit(TASK_ERROR, resp.error.graphQLErrors[0].message);
          }
        })
        .catch(err => {
          commit(TASK_ERROR, err);
        });
  }
};

export default {
  actions,
  getters,
  mutations,
  state,
};
