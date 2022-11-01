import { createStore } from 'vuex';
import axios from 'axios';
import helper from '@/utils/helper';

export default createStore({
  state: {
    activities: [],
    loading: false,
  },
  getters: {
    getActivities: (state) => helper.groupByMonth(state.activities),
  },
  mutations: {
    UPDATE_ACTIVITIES(state, payload) {
      state.activities = payload;
    },
    TOGGLE_LOADER(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async GET_ACTIVITIES({ commit }) {
      commit('TOGGLE_LOADER', true);
      await axios.get('http://localhost:3000/activities/v1')
        .then((response) => commit('UPDATE_ACTIVITIES', response.data))
        .catch((e) => console.warn(e))
        .finally(() => {
          commit('TOGGLE_LOADER', false);
        });
    },
  },
  modules: {
  },
});
