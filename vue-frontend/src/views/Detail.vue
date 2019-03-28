<template>
  <b-container>
    <b-card>
      <b-card-text>Sound recording detail:</b-card-text>
      <customTable :fields="inputReportFields" :inputReports="inputReport"></customTable>
      <div v-if="currentMatch.length > 0">
        <b-card-text>Current Match:</b-card-text>
        <customTable :fields="currentMatchFields" :inputReports="currentMatch" customClass="green"></customTable>
      </div>
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
      inputReportMatch: null,
      inputReportMatches: [],
      inputReportMatchFields: [
        'title',
        'artist',
        'isrc',
        'duration',
        'similarity_score',
        'match'
      ],
      currentMatchFields: [
        'title',
        'artist',
        'isrc',
        'duration',
        'similarity_score',
      ],
    }
  },

  computed: {
    currentMatch: function () {
      return this.inputReportMatch ? [ this.inputReportMatch ] : []
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
          this.inputReportMatches = inputReports.filter(match => match.selected == false)
          const selectedReports = inputReports.filter(match => match.selected == true)
          if(selectedReports.length > 0) {
            this.inputReportMatch = selectedReports[0]
          }
        })
    }
  }
}
</script>
