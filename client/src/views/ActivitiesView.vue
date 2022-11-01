<template>
  <div>
    <LoadingSpinner v-show="loading"/>
    <ItemList :items="activities"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex';
import ItemList from '@/components/ItemList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  name: 'HomeView',
  components: {
    ItemList,
    LoadingSpinner,
  },
  created() {
    this.GET_ACTIVITIES();
  },
  methods: {
    ...mapActions(['GET_ACTIVITIES']),
  },
  computed: {
    ...mapState(['activities', 'loading']),
  },
};
</script>
