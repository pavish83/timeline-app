export default {
  groupByMonth(itemsData) {
    const sorted = itemsData.sort((a, b) => b.d_created - a.d_created);
    const groups = sorted.reduce((r, o) => {
      const m = new Date(o.d_created * 1000).toLocaleString('default', { month: 'long' });
      (r[m]) ? r[m].data.push(o) : r[m] = { group: m, data: [o] }; /* eslint-disable-line no-param-reassign, no-unused-expressions */
      return r;
    }, {});
    return Object.keys(groups).map((k) => groups[k]);
  },
};
