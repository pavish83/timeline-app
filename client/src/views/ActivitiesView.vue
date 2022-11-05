<template>
  <div>
    <h2 class="view-title">Timeline</h2>
      <Autocomplete @selected="searchQuery = $event" :items="getTopicNames"/>
    <div class="filter-label">Filter by:</div>
    <div class="filter-buttons">
      <button v-for="(type, index) in getFilters" :key="index" @click="filterType = index; selectedFilter = index" class="filter-button" :class="{'selected': selectedFilter == index}"><span v-if="selectedFilter == index"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="12px" height="12px"><path fill="#008081" d="M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z"/><path fill="#5e9c76" d="M20,2c9.9,0,18,8.1,18,18s-8.1,18-18,18S2,29.9,2,20S10.1,2,20,2 M20,1C9.5,1,1,9.5,1,20s8.5,19,19,19 s19-8.5,19-19S30.5,1,20,1L20,1z"/><path fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="3" d="M11.2,20.1l5.8,5.8l13.2-13.2"/></svg></span>{{type}}</button>
    </div>
    <LoadingSpinner v-show="loading"/>
    <ItemList :items="filterActivitiesByType" @open-modal="openModal"/>
    <ZoomModal v-if="showZoomViewModal" :id="zoomActivityId"/>
    <div @click="loadMore" @keydown="loadMore" class="load-more"><span class="load-icon"><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="10" height="10" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill="#008081" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 298.04"><path fill-rule="nonzero" d="M12.08 70.78c-16.17-16.24-16.09-42.54.15-58.7 16.25-16.17 42.54-16.09 58.71.15L256 197.76 441.06 12.23c16.17-16.24 42.46-16.32 58.71-.15 16.24 16.16 16.32 42.46.15 58.7L285.27 285.96c-16.24 16.17-42.54 16.09-58.7-.15L12.08 70.78z"/></svg></span> Load More</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Const from '@/utils/const';
import Helper from '@/utils/helper';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import ItemList from '@/components/ItemList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ZoomModal from '@/components/ZoomModal.vue';
import Autocomplete from '@/components/Autocomplete.vue';

export default {
  name: 'HomeView',
  components: {
    ItemList,
    LoadingSpinner,
    ZoomModal,
    Autocomplete,
  },
  data() {
    return {
      filterType: 'all',
      selectedFilter: 'all',
      searchQuery: null,
      activitiesData: [],
      zoomActivityId: null,
      itemsLength: 10,
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
    loadMore() {
      if (this.paginatedItems > this.activities.length) return;
      this.itemsLength += 10;
    },
  },
  computed: {
    ...mapState(['activities', 'loading', 'showZoomViewModal']),
    ...mapGetters(['getTopicNames']),
    getFilters() {
      return Const.activityTypes;
    },
    paginatedItems() {
      return this.activities.slice(0, this.itemsLength);
    },
    filterActivitiesByType() {
      let data = [];
      if (this.searchQuery) {
        data = this.paginatedItems.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(' ')
            .every((v) => item.topic_data.name.toLowerCase().includes(v));
        });
      } else {
        data = this.paginatedItems;
      }
      if (this.filterType === 'all') return Helper.groupByMonth(data);
      const filtered = data.filter((item) => item.resource_type === this.filterType);
      return Helper.groupByMonth(filtered);
    },
  },
};
</script>
<style scoped lang="scss">
  .view-title {
    display: flex;
    margin-left: 10px;
  }
  .filter-label {
    display: flex;
    margin: 20px 0 10px 10px;
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
  .load-more {
    margin-top: 20px;
    color: var(--main-color);
    font-weight: 700;
    cursor: pointer;
  }
</style>
