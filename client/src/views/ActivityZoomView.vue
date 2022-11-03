<template>
  <div>
    <ZoomModal v-if="dataLoaded" :id="getId"/>
  </div>
</template>

<script>
import ZoomModal from '@/components/ZoomModal.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ActivityZoomView',
  components: {
    ZoomModal,
  },
  methods: {
    ...mapActions(['GET_ACTIVITIES']),
  },
  computed: {
    getId() {
      return this.$route.params.id;
    },
    ...mapState(['dataLoaded']),
  },
  created() {
    this.GET_ACTIVITIES();
  },
};
</script>

<style>

</style>
