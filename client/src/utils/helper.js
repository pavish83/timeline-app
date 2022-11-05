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
  flattenObject(obj) {
    let res = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object') {
        res = { ...res, ...this.flattenObject(value) };
      } else {
        res[key] = value;
      }
    }
    return res;
  },
  // normalizeApi(data) {
  //   const res = [];
  //   data.map((item) => {
  //     item.activities.forEach((subItem) => {
  //       const obj1 = { resource_type: item.resource_type };
  //       const obj2 = { ...subItem };
  //       const newObj = { ...obj1, ...obj2 };
  //       res.push(newObj);
  //     });
  //   });
  // },
};
