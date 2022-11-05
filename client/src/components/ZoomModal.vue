<template>
  <div class="modal-wrap" v-if="dataLoaded">
    <div class="zoom-container">
      <div class="close-icon" @click="closeModal" @keydown="closeModal">X</div>
      <div>
        <img :src="getIconPath" :alt="getIconName" class="item-icon" :class="{'bp': isProductBp, 'bpjr': !isProductBp}">
        <span v-if="!isProductBp" class="product-bpjr">Jr.</span>
      </div>
      <div class="info-data">
        <h1 class="item-title">{{getItemTitle}}</h1>
        <div class="date-time">
          <div>{{getDateFormat}}</div>
          <div class="date-seperator">.</div>
          <div>{{getItemTime}}</div>
        </div>
      </div>
    </div>
    <div class="view-work-section">
      <h3 class="comment">{{getItemData.comment}}</h3>
      <div v-if="showScore" class="score-wrap">
        <span class="score-text">Score </span>
        <span class="score">{{getItemData.score}}/{{getItemData.possible_score}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex';
import activityInfo from '@/mixins/activityInfo';

export default {
  name: 'ZoomModal',
  mixins: [activityInfo],
  props: [
    'id',
  ],
  data() {
    return {
      itemInfo: null,
    };
  },
  methods: {
    ...mapMutations(['TOGGLE_ZOOM_VIEW_MODAL']),
    ...mapActions(['GET_ACTIVITIES']),
    closeModal() {
      this.TOGGLE_ZOOM_VIEW_MODAL();
    },
  },
  beforeMount() {
    if (!this.dataLoaded) {
      this.GET_ACTIVITIES('v1');
    }
  },
  created() {
    this.itemInfo = this.getItemData;
  },
  computed: {
    ...mapGetters([
      'getActivityById',
    ]),
    ...mapState(['dataLoaded']),
    getItemData() {
      return this.getActivityById(this.getId);
    },
    getId() {
      return this.id || this.$route.params.id;
    },
  },
  watch: {
    getItemData: {
      handler(val) {
        this.itemInfo = val;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  .modal-wrap {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 33%;
    width: 500px;
    overflow: auto;
    background: #FFFFFF;
    color: var(--gray-color);
    border: 5px solid #B8B8B8;
    border-radius: 3%;
    padding: 20px;
  }
  .zoom-container {
    display: flex;
    flex-direction: column;
  }
  .close-icon {
    cursor: pointer;
    align-self: flex-end;
    font-weight: 700;
    font-size: 20px;
    color: #B8B8B8;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    padding: 3px;
    background: #fff;
    border: 3px solid #B8B8B8;
  }
  .item-icon {
    height: 40px;
    width: 40px;
    border-radius: 40px;
    box-shadow: 0 0 2px #888;
    padding: 0.3em 0.3em;
    &.bp {
      background-color: var(--cyan-color);
    }
    &.bpjr {
      background-color: var(--orange-color);
    }
  }
  .product-bpjr {
    width: 5px;
    height: 5px;
    font-size: 10px;
    font-weight: 800;
    border-radius: 50px;
    box-shadow: 0 0 2px #888;
    padding: 0.2em 0.2em;
    background-color: #FFD580;
    position: relative;
    top: -5px;
    left: 5px;
    margin-left: -17px;
  }
  .item-title {
    text-transform: capitalize;
  }
  .date-seperator {
    font-size: 18px;
    font-weight: bold;
    margin: 0 3px;
    position: relative;
    top: -4px;
  }
  .date-time {
    display: flex;
    align-items: center;
    font-size: 12px;
    justify-content: center;
    font-weight: 600;
    color: #808080;
  }
  .view-work-section {
    text-align: start;
  }
  .comment {
    margin-top: 20px;
  }
  .score-wrap {
    position: fixed;
    bottom: 10%;
    color: var(--main-color);
  }
  .score {
    font-weight: 700;
  }
</style>
