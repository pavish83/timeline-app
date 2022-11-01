<template>
  <div>
    <div v-for="(groupBy,index) in getActivities" :key="index" class="group-title-generator">
      <div class="seperator" :class="{'hide-seperator': index == 0}">|</div>
      <div class="title-wrap">
        <div class="group-title">{{groupBy.group}}</div>
      </div>
      <div v-for="(item,index) in groupBy.data" :key="index" class="group-list-item">
        <div class="seperator">|</div>
        <SingleItem :item-data="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import SingleItem from '@/components/SingleItem.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ItemList',
  components: {
    SingleItem,
  },
  props: [
    'items',
  ],
  data() {
    return {
      itemsData: this.items,
    };
  },
  computed: {
    ...mapGetters(['getActivities']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .title-wrap {
    display: flex;
    justify-content: flex-start;
    margin-left: 10px;
  }
  .group-title {
    padding: 3px 20px;
    border: 1px solid #FFFFE0;
    border-radius: 40px;
    background-color: #FFFFE0;
  }
  .seperator {
    display: flex;
    margin: -2px 0 -1px 55px;
    color: var(--light-gray-color);;
    &.hide-seperator {
      display: none;
    }
  }
</style>
