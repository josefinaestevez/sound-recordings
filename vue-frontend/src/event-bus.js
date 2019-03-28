import Vue from 'vue'

export const eventBus = new Vue({
  methods: {
    setCurrentMatch (match) {
      this.$emit('currentMatchSelected', match)
    }
  }
})