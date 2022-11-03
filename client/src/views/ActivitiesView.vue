<template>
  <div>
    <h2 class="view-title">Timeline</h2>
    <div class="search-wrap">
      <input class="search-input" v-model="searchQuery" placeholder="Search Timeline" aria-label="Search Timeline">
      <span class="search-glass">
        <svg fill="#FFF" xmlns="http://www.w3.org/2000/svg" width="15" height="15"  viewBox="0 0 30 30"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/></svg>
      </span>
    </div>
    <div class="filter-label">Filter by:</div>
    <div class="filter-buttons">
      <button v-for="(type, index) in getFilters" :key="index" @click="filterType = index; selectedFilter = index" class="filter-button" :class="{'selected': selectedFilter == index}"><span v-if="selectedFilter == index"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="12px" height="12px"><path fill="#008081" d="M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z"/><path fill="#5e9c76" d="M20,2c9.9,0,18,8.1,18,18s-8.1,18-18,18S2,29.9,2,20S10.1,2,20,2 M20,1C9.5,1,1,9.5,1,20s8.5,19,19,19 s19-8.5,19-19S30.5,1,20,1L20,1z"/><path fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="3" d="M11.2,20.1l5.8,5.8l13.2-13.2"/></svg></span>{{type}}</button>
    </div>
    <LoadingSpinner v-show="loading"/>
    <ItemList :items="filterActivitiesByType" @open-modal="openModal"/>
    <ZoomModal v-if="showZoomViewModal" :id="zoomActivityId"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Const from '@/utils/const';
import Helper from '@/utils/helper';
import { mapState, mapActions, mapMutations } from 'vuex';
import ItemList from '@/components/ItemList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ZoomModal from '@/components/ZoomModal.vue';

export default {
  name: 'HomeView',
  components: {
    ItemList,
    LoadingSpinner,
    ZoomModal,
  },
  data() {
    return {
      filterType: 'all',
      selectedFilter: 'all',
      searchQuery: null,
      activitiesData: [],
      zoomActivityId: null,
    };
  },
  created() {
    this.GET_ACTIVITIES();
  },
  methods: {
    ...mapActions(['GET_ACTIVITIES']),
    ...mapMutations(['TOGGLE_ZOOM_VIEW_MODAL']),
    openModal(id) {
      this.zoomActivityId = id;
      this.TOGGLE_ZOOM_VIEW_MODAL();
    },
  },
  computed: {
    ...mapState(['activities', 'loading', 'showZoomViewModal']),
    getFilters() {
      return Const.activityTypes;
    },
    filterActivitiesByType() {
      let data = [];
      if (this.searchQuery) {
        data = this.activities.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every((v) => item.topic_data.name.toLowerCase().includes(v));
        });
      } else {
        data = this.activities;
      }
      if (this.filterType === 'all') return Helper.groupByMonth(data);
      const filtered = data.filter((item) => item.resource_type === this.filterType);
      return Helper.groupByMonth(filtered);
    },
  },
};
</script>
<style scoped lang="scss">
  .view-title, .search-input{
    display: flex;
    margin-left: 10px;
  }
  .search-input {
    margin-bottom: 20px;
    outline: none;
    padding: 5px;
    width: 300px;
  }
  .search-glass {
    margin-left: -30px;
    height: 29px;
    width: 29px;
    background-color: var(--main-color);
    svg {
      margin-top: 7px;
    }
  }
  .search-wrap {
    display: flex;
  }
  .filter-label {
    margin-bottom: 10px;
    display: flex;
    margin-left: 10px;
  }
  .filter-buttons {
    display: flex;
    justify-content: space-between;
    margin: 0 10px 20px 10px;
  }
  .filter-button {
    background-color: #fff;
    color: var(--main-color);
    font-size: 11px;
    font-weight: 700;
    border: 1px solid var(--main-color);
    padding: 8px 5px;
    margin-right: 5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    &:last-child {
      margin-right: 0;
    }
    svg {
      margin-right: 3px;
    }
    &.selected {
      background-color: #e0ffff;
    }
    cursor: pointer;
  }
</style>
