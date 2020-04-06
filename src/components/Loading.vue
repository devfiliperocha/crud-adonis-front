<template>
  <v-container fluid v-if="loading">
      <v-layout column align-center justify-center row fill-height>
        <v-flex xs12>
          <div class="fill-height text-xs-center">
            <v-progress-circular :size="50" :width="7" indeterminate color="primary"></v-progress-circular><br/>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>

export default {
  props: {
    loading: {
      type: Boolean,
      default: function(){
        return false
      }
    }
  }
}
</script>