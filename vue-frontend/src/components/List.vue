<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="Unmatched" @click="setUnmatchedInputRecords()" active>
        <customTable :fields="fields" :inputReports="unmatchedInputReports" :isBusy="isBusy"></customTable>
      </b-tab>
      <b-tab title="Matched" @click="setMatchedInputRecords()">
        <customTable :fields="fields" :inputReports="matchedInputReports" :isBusy="isBusy"></customTable>
      </b-tab>
      <b-tab title="All" @click="setAllInputRecords()">
        <customTable :fields="fields" :inputReports="allInputReports" :isBusy="isBusy"></customTable>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from 'axios'

import CustomTable from '@/components/CustomTable'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default {
  components: {
    CustomTable
  },

  data () {
    return {
      isBusy: true,
      unmatchedInputReports: [],
      matchedInputReports: [],
      allInputReports: [],
      fields: [
        'title',
        'artist',
        'isrc',
        'duration',
        'matched',
        'edit'
      ]
    }
  },

  mounted () {
    this.setUnmatchedInputRecords()
  },
  
  methods: {
    setUnmatchedInputRecords: function () {
      this.isBusy = true
      axios
        .get('http://localhost:8000/api/input_reports/?matched=False')
        .then(response => {
          this.unmatchedInputReports = response.data
          this.isBusy = false
        })
    },
    setMatchedInputRecords: function () {
      this.isBusy = true
      axios
        .get('http://localhost:8000/api/input_reports/?matched=True')
        .then(response => {
          this.matchedInputReports = response.data
          this.isBusy = false
        })
    },
    setAllInputRecords: function () {
      this.isBusy = true
      axios
        .get('http://localhost:8000/api/input_reports/')
        .then(response => {
          this.allInputReports = response.data
          this.isBusy = false
        })
    }
  }
}
</script>
