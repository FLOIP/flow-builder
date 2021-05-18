<template>
  <div class="form-group">
    <label>{{ 'trees.subscriber-property' | trans }}</label>

    <div v-if="mapCoordinateFields.length">
      <select
          class="form-control tree-subscriber-property sidebar-input"
          data-custom-data-field="subscriberPropertyFieldId"
          :data-custom-data-field-default="mapCoordinateFields[0].id">
        <option
            v-for="field in mapCoordinateFields"
            :key="field.id"
            :value="field.id">
          {{ field.display_label }}
        </option>
      </select>
    </div>

    <div v-else
        class="alert alert-danger"
        role="alert">
      {{ 'trees.no-subscriber-field-type-map-coordinates' | trans }}

      <a :href="route('subscribers.manage_sub')">
        {{ 'trees.add-map-coordinates-field' | trans }}
      </a>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import routes from 'lib/mixins/Routes'
  import lang from 'lib/filters/lang'

  export default {
    mixins: [
      lang,
      routes,
    ],

    computed: {
      ...mapGetters(['subscriberPropertyFields']),

      mapCoordinateFields() {
        return this.subscriberPropertyFields.filter(({ data_type }) => data_type === 'map_coordinates')
      },
    },
  }
</script>
