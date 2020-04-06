<template>    
  <v-container>
    <v-row dense align="center"  class="pl-4 pr-4">
      <v-col cols="12" sm="6">
        <h1 class="white--text">Propriedades</h1>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field 
          dark
          dense
          class="ma-2"
          outlined
          filled
          color="info"
          hide-details
          append-icon="mdi-magnify"
          v-model="search"
          label="Buscar"/>  
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn color="success" min-width="100%" @click="openCreateForm()">
          <v-icon small class="mr-1">fa-plus</v-icon>Cadastrar
        </v-btn> 
        <FormProperty :saving="saving" :key="formKey" :errors="errors" :dialog="openForm" :id="idSelected" :data="rowSelected" :onClose="() => closeForm()" :onSave="onSaveProperty" />
      </v-col>
    </v-row>
    <v-card class="elevation-12 pt-3 mt-2" style="height:600px"> 
      <v-data-table
        :loading="gettingData"
        :headers="headers"
        :items="properties"
        :search="search"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        @page-count="pageCount = $event"
        hide-default-footer
      >
        <template #item.actions="{ item }">
          <v-btn small icon @click="selectRow(item)">
            <v-icon small>fa-edit</v-icon>
          </v-btn>
          <v-btn small icon @click="deletRowConfirm(item.id)">
            <v-icon small>fa-trash</v-icon>
          </v-btn>
        </template>
        
        <template #item.photo="{ item }">
          <v-avatar 
            class="ma-2"
            style="cursor:pointer"
            size="50"
            @click="openImage(item.image_url)"
          >
            <v-img :src="item.image_url"></v-img>
          </v-avatar>
        </template>

        <template #item.address="{ item }">
          <h4>{{item.city}} / {{item.state}}</h4>
          <small>{{`${item.street}, ${item.house_number}, ${item.district}`}}</small>
        </template>

      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination light v-model="page" :length="pageCount" circle></v-pagination>
      </div>

      <v-dialog
        v-model="showImage"
        width="800"
        style="height:400px"
      >
        <v-card class="fill-height">
          <v-img :src="imageClicked"/>
        </v-card>
      </v-dialog>
      
      <v-dialog
        v-model="deleteRowDialog"
        width="300"
      >
        <v-card>
        <DialogHeader title="Confirmar exclusão" :onClose="()=> deleteRowDialog = false" />
          <v-card-text class="pt-3">
            <h3>Tem certeza que deseja excluir este registro?</h3>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small text color="error" @click="deleteRowDialog = false"> Cancelar </v-btn>
            <v-btn small color="primary" :loading="deleting" @click="deletRow()" > Excluir </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-card>
  </v-container>
</template>
<script>
import { list, create, update, remove } from '../lib/properties'
import FormProperty from '../components/FormProperty'
import DialogHeader from '../components/DialogHeader'
  export default {
    components: { FormProperty, DialogHeader },
    async mounted(){
      await this.getData()
    },
    methods:{
      openImage(url){
        this.showImage = true
        this.imageClicked = url
      },
      async getData(){
        this.gettingData = true
        try{
          const properties = await list()
          if(properties.success){
            this.properties = properties.data
          }
        }catch(err){
          this.$store.commit('showMsg', {color:"error", msg: "Erro ao recuperar propriedads. "+err.message})
        }finally{
          this.gettingData = false
        }
      },
      selectRow(data){
        this.idSelected = data.id; 
        this.rowSelected = data
        this.openForm = true
        this.errors = {}
      },
      openCreateForm(){
        this.openForm = true; 
        this.idSelected = 0; 
        this.rowSelected = {}
        this.errors = {}
      },
      closeForm(){
        this.openForm = false; 
        this.idSelected = 0; 
        this.rowSelected = {};
        this.formKey = this.formKey + 1;
        this.errors = {}
        this.getData()
      },
      async deletRow(){
        this.deleting = true
        const destroy = await remove(this.rowToDelete)
        if(destroy.success){
          this.$store.commit('showMsg', {color:'success', text: "Registro removido com sucesso!"})
          this.deleteRowDialog = false
          this.getData()
        }else{       
          this.$store.commit('showMsg', {color:'error', text: "Erro ao remover registro! "+destroy.data})
        }
        this.deleting = false

      },
      deletRowConfirm(id){
        this.deleteRowDialog = open
        this.rowToDelete = id
      },
      async onSaveProperty(data, id){
        this.saving = true
        if(id){
          const save = await update(id, data)
          if(save.success){
            this.$store.commit('showMsg', {color:'success', text: "Registro atualizado com sucesso!"})
            this.closeForm()
          }else{       
            if(Array.isArray(save.data)){
              this.errors = save.data.reduce((p,n)=>{
                p[n.field] = n.message
                return p
              },{})
              this.$store.commit('showMsg', {color:'error', text: "Erro ao cadastrar, favor verificar se todos os campos estão preenchidos."})
              setTimeout(()=>{ this.errors = {} },5000)
              
            }else{
              this.$store.commit('showMsg', {color:'error', text: "Erro ao atualizar registro! "+save.data})
            }
          }
          this.saving = false
        }else{
          const newreg = await create(data)
          if(newreg.success){
            this.$store.commit('showMsg', {color:'success', text: "Registro criado com sucesso!"})
            this.getData()
            this.closeForm()
          }else{
            if(Array.isArray(newreg.data)){
              this.errors = newreg.data.reduce((p,n)=>{
                p[n.field] = n.message
                return p
              },{})   
              this.$store.commit('showMsg', {color:'error', text: "Erro ao atualizar, favor verificar se todos os campos estão preenchidos."})
              setTimeout(()=>{ this.errors = {} },5000)
            }else{
              this.$store.commit('showMsg', {color:'error', text: "Erro ao criar registro! "+newreg.data})
            }
          }
          this.saving = false
        }
      }
    },
    data () {
      return {
        deleting:false,
        deleteRowDialog:false,
        rowToDelete: 0,
        imageClicked: '',
        showImage: false,
        gettingData: false,
        errors: {},
        saving: false,
        formKey:0,
        idSelected: 0,
        rowSelected: {},
        openForm: false,
        page: 1,
        pageCount: 0,
        itemsPerPage: 7,
        search: '',
        headers: [
          {
            text: 'Foto da Sede',
            align: 'start',
            value: 'photo',
            width: '100px'
          },
          {
            text: 'Nome da Propriedade',
            align: 'start',
            value: 'name',
          },
          {
            text: 'Propietário',
            align: 'start',
            value: 'propietary',
          },
          {
            text: 'Localização',
            value: 'address',
          },
          {
            text: '',
            value: 'actions',
          },
        ],
        properties: [] ,
      }
    },
  }
</script>