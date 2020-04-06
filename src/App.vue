<template>
  <v-app id="inspire">
    <v-content class="primary">
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
          >
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-snackbar
      v-model="$store.state.msg.msgShow"
      right
      bottom
      :color="$store.state.msg.msgColor"
      :timeout="$store.state.msg.msgTimeout"
    >
      {{ $store.state.msg.msgText }}
      <v-btn small dark text @click="$store.state.msg.msgShow = false">Fechar</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
