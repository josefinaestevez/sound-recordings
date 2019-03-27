<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="Unmatched" @click="setUnmatchedInputRecords()" active>
        <b-table striped hover :fields="fields" :items="unmatchedInputReports" :busy="isBusy">
          <div slot="table-busy" class="text-center text-danger my-2">
            <b-spinner class="align-middle" />
            <strong> Loading...</strong>
          </div>
          <!-- Input Report Detail -->
          <template slot="edit" slot-scope="data">
            <router-link :to="{ name: 'detail', params: { id: data.item.pk }}"><font-awesome-icon icon="edit" /></router-link>
          </template>
        </b-table>
      </b-tab>
      <b-tab title="Matched" @click="setMatchedInputRecords()">
        <b-table striped hover :fields="fields" :items="matchedInputReports" :busy="isBusy">
          <div slot="table-busy" class="text-center text-danger my-2">
            <b-spinner class="align-middle" />
            <strong> Loading...</strong>
          </div>
          <!-- Input Report Detail -->
          <template slot="edit" slot-scope="data">
            <router-link :to="{ name: 'detail', params: { id: data.item.pk }}"><font-awesome-icon icon="edit" /></router-link>
          </template>
        </b-table>
      </b-tab>
      <b-tab title="All" @click="setAllInputRecords()">
        <b-table striped hover :fields="fields" :items="allInputReports" :busy="isBusy">
          <div slot="table-busy" class="text-center text-danger my-2">
            <b-spinner class="align-middle" />
            <strong> Loading...</strong>
          </div>
          <!-- Input Report Detail -->
          <template slot="edit" slot-scope="data">
            <router-link :to="{ name: 'detail', params: { id: data.item.pk }}"><font-awesome-icon icon="edit" /></router-link>
          </template>
        </b-table>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

library.add(faEdit)

export default {
  data () {
    return {
      file: '',
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
