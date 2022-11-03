<template>
  <div>
    <div v-for="(groupBy, index) in itemsData" :key="groupBy.group" class="group-title-generator">
      <div class="seperator" :class="{'hide-seperator': index == 0}">|</div>
      <div class="title-wrap">
        <div class="group-title">{{groupBy.group}}</div>
      </div>
      <div v-for="(item) in groupBy.data" :key="item.id" class="group-list-item">
        <SingleItem :item-data="item" @zoom-view="zoomView"/>
      </div>
    </div>
  </div>
</template>

<script>
import SingleItem from '@/components/SingleItem.vue';

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
  methods: {
    zoomView(id) {
      this.$emit('open-modal', id);
    },
  },
  watch: {
    items: {
      handler(newVal) {
        this.itemsData = newVal;
      },
      deep: true,
    },
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
