<template>
  <div>
    <b-table striped hover :fields="fields" :items="inputReports" :busy="isBusy">

      <!-- Spinner while loading input reports -->
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle" />
        <strong> Loading...</strong>
      </div>

      <template slot="similarity_score" slot-scope="data">
          <b-progress :value="Number(data.item.similarity_score)*100" show-progress class="mb-3" />
      </template>

    </b-table>

  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit)

export default {
  props: {
    fields: Array,
    inputReports: Array,
    isBusy: Boolean,
  }
}
</script>
