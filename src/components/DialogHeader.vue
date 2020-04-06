
<template>
  <v-toolbar
    color="primary"
    dark
    dense
    :window="false"
    
  >
    <b style="font-size:17px" class="pl-1">{{title}}</b>
    <v-spacer></v-spacer>
    <v-btn v-if="!dontClose" rounded icon dark @click="onClose" >
      <v-icon small class="white--text">fas fa-times</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
export default {
    props:{
      title: {
        type: String,
        default: 'Title'
      },
      onClose: {
        type: Function,
        default: ()=>{}
      },
      dontClose: {
        type: Boolean,
        default: false
      }
    }
  
}
</script>
