<template>
  <div class="item-container">
    <div class="info-container">
      <div>
        <img :src="getIconPath" :alt="getIconName" class="resource-icon" :class="{'bp': isProductBp, 'bpjr': !isProductBp}">
        <span v-if="!isProductBp" class="product-bpjr">Jr.</span>
      </div>
      <div class="info-data">
        <div class="item-title">{{getItemTitle}}</div>
        <div class="date-time">
          <div>{{getDateFormat}}</div>
          <div class="date-seperator">.</div>
          <div>{{getItemTime}}</div>
        </div>
      </div>
    </div>
    <div class="view-work-section">
      <div v-if="showScore">
        <span class="score-text">Score </span>
        <span class="score">{{itemData.score}}/{{itemData.possible_score}}</span>
      </div>
      <div class="view-work-button">
        <div class="view-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20" height="20">
            <path fill="#008081" d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"/>
          </svg>
        </div>
        <div class="btn">
          View work
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleItem',
  props: [
    'itemData',
  ],
  data() {
    return {
      itemInfo: this.itemData,
      imageName: '',
      itemDate: new Date(this.itemData.d_created * 1000),
    };
  },
  computed: {
    getIconName() {
      const mapObj = {
        '/assets/topics/': '',
        '.png': '',
      };
      return this.itemInfo.topic_data.icon_path.replace(/\/assets\/topics\/|.png/gi, (matched) => mapObj[matched]);
    },
    getIconPath() {
      return require(`@/assets/topics/${this.getIconName}.png`);
    },
    getItemTitle() {
      return `${this.itemInfo.topic_data.name} ${this.itemInfo.resource_type.replace(/_/g, ' ')}`;
    },
    getItemTime() {
      return this.itemDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    },
    getItemFullMonth() {
      return this.itemDate.toLocaleString('default', { month: 'long' });
    },
    getDateFormat() {
      return `${this.itemDate.toLocaleString('default', { month: 'short' })} ${this.itemDate.getUTCDate()}, ${this.itemDate.getFullYear()}`;
    },
    showScore() {
      return this.itemInfo.score !== '';
    },
    isProductBp() {
      return this.itemInfo.product === 'bp';
    },
  },
  watch: {
    itemData: {
      handler(val) {
        this.itemInfo = val;
      },
    },
  },
};
</script>

<style lang="scss">
  .item-container {
    display: flex;
    justify-content: space-between;
    border: 1px solid var(--light-gray-color);
    border-radius: 2%;
    margin: 0 10px;
    padding: 20px;;
  }
  .info-container {
    display: flex;
  }
  .info-data {
    margin-left: 10px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
  }
  .resource-icon {
    width: 30px;
    height: 30px;
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
    font-weight: 600;
  }
  .view-work-section {
    color: var(--main-color);
    display: flex;
    align-items: center;
  }
  .view-work-button {
    display: flex;
    align-content: center;
    align-items: center;
    cursor: pointer;
  }
  .view-work-button, .score {
    font-size: 12px;
    font-weight: 600;
  }
  .score-text {
    font-size: 12px;
  }
  .score {
    margin-right: 10px;
  }
  .view-icon {
    margin-right: 5px;
    margin-top: 3px;
  }
  .date-seperator {
    font-size: 18px;
    font-weight: bold;
    margin: 0 3px;
    position: relative;
    top: -5px;
  }
  .date-time {
    display: flex;
    align-items: center;
  }
</style>