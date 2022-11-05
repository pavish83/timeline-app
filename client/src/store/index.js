import { createStore } from 'vuex';
import axios from 'axios';
import helper from '@/utils/helper';
import Const from '@/utils/const';

export default createStore({
  state: {
    activities: [],
    showZoomViewModal: false,
    loading: false,
    dataLoaded: false,
    hiddenActivities: JSON.parse(sessionStorage.getItem('hiddenActivities')) || [],
  },
  getters: {
    getActivities: (state) => helper.groupByMonth(state.activities),
    getTopicNames: (state) => {
      const topics = new Set();
      state.activities.forEach((item) => {
        topics.add(item.topic_data.name);
      });
      return [...topics];
    },
    getActivityById: (state) => (id) => {
      return state.activities.filter((item) => item.id === id)[0];
    },
  },
  mutations: {
    UPDATE_ACTIVITIES(state, payload) {
      if (payload.version === 'v2') {
        state.activities = helper.normalizeApi(payload.data);
      } else {
        state.activities = payload.data;
      }
      state.dataLoaded = true;
    },
    TOGGLE_LOADER(state, payload) {
      state.loading = payload;
    },
    TOGGLE_ZOOM_VIEW_MODAL(state) {
      state.showZoomViewModal = !state.showZoomViewModal;
    },
    ADD_ACTIVITY_TO_HIDDEN(state, id) {
      if (sessionStorage.getItem('hiddenActivities') === null) {
        sessionStorage.setItem('hiddenActivities', JSON.stringify([id]));
      } else {
        const items = JSON.parse(sessionStorage.getItem('hiddenActivities'));
        items.push(id);
        sessionStorage.setItem('hiddenActivities', JSON.stringify(items));
      }
      state.hiddenActivities.push(id);
    },
  },
  actions: {
    async GET_ACTIVITIES({ commit }, apiVersion) {
      commit('TOGGLE_LOADER', true);
      await axios.get(Const.apiVersions[apiVersion])
        .then((response) => commit('UPDATE_ACTIVITIES', { data: response.data, version: apiVersion }))
        .catch((e) => console.warn(e))
        .finally(() => {
          commit('TOGGLE_LOADER', false);
        });
    },
  },
  modules: {
  },
});
