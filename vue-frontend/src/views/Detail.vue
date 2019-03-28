<template>
  <b-container>
    <b-card>
      <b-card-text>Sound recording detail:</b-card-text>
      <customTable :fields="inputReportFields" :inputReports="inputReport"></customTable>
      <b-card-text>Choose the right candidate from the list:</b-card-text>
      <customTable :fields="inputReportMatchFields" :inputReports="inputReportMatches"></customTable>
    </b-card>
  </b-container>
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
      inputReport: [],
      inputReportFields: [
        'title',
        'artist',
        'isrc',
        'duration'
      ],
      inputReportMatches: [],
      inputReportMatchFields: [
        'title',
        'artist',
        'isrc',
        'duration',
        'similarity_score',
        'selected',
        'match'
      ]
    }
  },

  mounted () {
    this.getInputReport()
    this.getInputReportMatches()
  },

  methods: {
    getInputReport () {
      axios
        .get('http://localhost:8000/api/input_reports/' + this.$route.params.id)
        .then(response => {
          this.inputReport = [response.data]
        })
    },
    getInputReportMatches () {
      axios
        .get('http://localhost:8000/api/input_reports/' + this.$route.params.id + '/matches')
        .then(response => {
          const inputReports = response.data
          this.inputReportMatches = inputReports
          // this.inputReportMatches = inputReports.filter(match => match.selected == false)
        })
    }
  }
}
</script>
