<template>
  <div class="autocomplete">
    <div class="search-wrap">
      <input v-model="search" class="search-input" placeholder="Search Timeline" @input="onChange" @keydown.down="onArrowDown"
        @keydown.up="onArrowUp" @keydown.esc="onEscape"
        @keydown.enter="onEnter" type="text" aria-label="Search Timeline"/>
      <span class="search-glass">
        <svg fill="#FFF" xmlns="http://www.w3.org/2000/svg" width="15" height="15"  viewBox="0 0 30 30"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/></svg>
      </span>
    </div>
    <ul v-show="isOpen" class="autocomplete-results">
      <li v-for="(result, i) in results" :key="i" @click="setResult(result)" :class="{ 'is-active': i === arrowCounter }" class="autocomplete-result">
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchAutocomplete',
  props: [
    'items',
  ],
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
      arrowCounter: -1,
    };
  },
  methods: {
    filterResults() {
      this.results = this.items.filter((item) => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    },
    onChange() {
      this.filterResults();
      this.isOpen = true;
      if (this.search === '') {
        this.setResult(this.search);
        this.isOpen = true;
      }
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.$emit('selected', result);
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.arrowCounter = -1;
        this.isOpen = false;
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter += 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter -= 1;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.setResult(this.search);
      this.arrowCounter = -1;
      this.isOpen = false;
    },
    onEscape() {
      this.isOpen = false;
      this.search = '';
      this.setResult(this.search);
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style lang="scss">
  .search-input {
    display: flex;
    margin-left: 10px;
  }
  .search-input {
    outline: none;
    padding: 5px;
    width: 300px;
  }
  .search-glass {
    margin-left: -29px;
    height: 29px;
    width: 29px;
    background-color: var(--main-color);
    svg {
      margin-top: 7px;
    }
  }
  .search-wrap {
    display: flex;
  }
  .autocomplete {
    position: relative;
  }
  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    min-height: 1em;
    max-height: 6em;
    overflow: auto;
    width: 312px;
    margin-left: 10px;
    scrollbar-width: thin;
    scrollbar-color: #6969dd #e0e0e0;
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: #e0e0e0;
    }
    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
</style>
