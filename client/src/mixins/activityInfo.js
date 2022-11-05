import Const from '@/utils/const';

export default {
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
    itemDate() {
      return new Date(this.getItemData.d_created * 1000);
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
    isProductBp() {
      return this.itemInfo.product === 'bp';
    },
    showScore() {
      return Const.activityTypesSettings[this.itemInfo.resource_type].score;
    },
    showZoom() {
      return Const.activityTypesSettings[this.itemInfo.resource_type].zoom;
    },
  },
};
