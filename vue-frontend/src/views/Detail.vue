<template>
  <b-container>
    <b-card>
      <b-card-text>Sound recording detail:</b-card-text>
      <b-table striped hover :fields="inputReportFields" :items="inputReport" />
    </b-card>
  </b-container>
</template>

<script>
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default {
  data () {
    return {
      inputReport: [],
      inputReportFields: [
        'title',
        'artist',
        'isrc',
        'duration'
      ]
    }
  },

  mounted () {
    this.getInputReport()
  },
  
  methods: {
    getInputReport () {
      axios
        .get('http://localhost:8000/api/input_reports/' + this.$route.params.id)
        .then(response => {
          this.inputReport = [response.data]
        })
    }
  }
}
</script>
