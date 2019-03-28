<template>
  <b-container>
    <b-card>
      <b-card-text>Sound recording detail:</b-card-text>
      <customTable :fields="inputReportFields" :inputReports="inputReport"></customTable>
      <div v-if="matchedRecordings.length > 0">
        <b-card-text>Current Match:</b-card-text>
        <customTable :fields="currentMatchFields" :inputReports="matchedRecordings" customClass="green"></customTable>
      </div>
      <b-card-text>Choose the right candidate from the list:</b-card-text>
      <customTable :fields="inputReportMatchFields" :inputReports="unmatchedRecordings" primary-key="pk"></customTable>
    </b-card>
  </b-container>
</template>

<script>
import axios from 'axios'
import { eventBus } from '@/event-bus'
import CustomTable from '@/components/CustomTable'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default {
  components: {
    CustomTable
  },

  data () {
    return {
      // Should be only ONE input report object, but we need to send a list to bootstrap table component
      inputReport: [],
      inputReportFields: [
        'title',
        'artist',
        'isrc',
        'duration'
      ],
      currentMatch: null,
      unmatchedRecordings: [],
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
    // Should be only ONE current match object, but we need to send a list to bootstrap table component
    matchedRecordings: function () {
      return this.currentMatch ? [ this.currentMatch ] : []
    }
  },

  created () {
    eventBus.$on('currentMatchSelected', this.selectMatch)
  },

  mounted () {
    this.getInputReport()
    this.getInputReportMatches()
  },

  destroyed () {
    eventBus.$off('currentMatchSelected', this.selectMatch)
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
          const inputReportMatches = response.data
          this.unmatchedRecordings = inputReportMatches.filter(match => match.selected == false)
          this.currentMatch = inputReportMatches.find(match => match.selected == true)
        })
    },

    selectMatch (newMatch) {
      if (this.currentMatch) {
        // If we already have an old match we should added as unmatched since we have a new one
        this.unmatchedRecordings = [ ...this.unmatchedRecordings, ...this.matchedRecordings ]
      }

      // We should remove the new current match from unmatched ones
      const index = this.unmatchedRecordings.findIndex(match => match.pk == newMatch.pk)
      this.$delete(this.unmatchedRecordings, index)

      // Now we should add the new match to our current match object
      this.currentMatch =  newMatch
    }
  }
}
</script>
