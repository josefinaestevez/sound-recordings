<template>
  <div>
    <b-table striped hover :fields="fields" :items="inputReports" :busy="isBusy" :class="{ green: customClass == 'green' }">

      <!-- Spinner while loading input reports -->
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle" />
        <strong> Loading...</strong>
      </div>

      <template slot="similarity_score" slot-scope="data">
          <b-progress :value="Number(data.item.similarity_score)*100" show-progress class="mb-3" />
      </template>

      <!-- Input Report Detail -->
      <template slot="edit" slot-scope="data">
        <router-link :to="{ name: 'detail', params: { id: data.item.pk }}"><font-awesome-icon icon="edit" /></router-link>
      </template>

      <!-- Select match -->
      <template slot="match" slot-scope="data">
        <font-awesome-icon
          style="cursor: pointer"
          icon="check-circle"
          title="Choose as a candidate"
          @click="clickMatch(data.item)"
        />
      </template>

    </b-table>

    <!-- Confirm match modal -->
    <b-modal v-model="confirmMatchModal" @hide="confirmMatchModalHide()">
      <p>Are you sure do you want to choose this as right candidate?</p>
      <b-table striped hover :items="selectedMatch" style="font-size: 10px">
      </b-table>
      <div slot="modal-footer" class="w-100">
        <b-button class="float-right" variant="success" @click="confirmMatch()">Match</b-button>
      </div>
    </b-modal>

  </div>
</template>

<script>
import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

library.add(faEdit, faCheckCircle)

export default {
  props: {
    fields: Array,
    inputReports: Array,
    isBusy: Boolean,
    customClass: String
  },

  data () {
    return {
      confirmMatchModal: false,
      selectedMatch: [],
    }
  },

  methods: {
    clickMatch (match) {
      this.confirmMatchModal = true
      this.selectedMatch = [ match ]
    },

    confirmMatchModalHide () {
      this.selectedMatch = []
    },

    confirmMatch () {
      let match = this.selectedMatch[0]
      match.selected = true
      const url = 'http://localhost:8000/api/input_reports/' + this.$route.params.id + '/matches/' + match.pk
      axios
        .put(url, match)
        .then(response => {
          const selectedMatch = response.data
          this.confirmMatchModal = false
        })
    }
  }
}
</script>
<style>
  .green {
    background-color: #a7f7a79e;
  }
</style>