<template>
  <v-dialog v-model="dialog" persistent max-width="1000" overlay-opacity="0.8">
    <v-card>
      <DialogHeader
        :title="id? 'Editar Propriedade' : 'Cadastrar Propriedade'"
        :onClose="()=> onClose()"
      />
      <v-container fluid style="overflow:auto;height:75vh" class="pa-6">
        <v-row>
					<v-col cols="12">
						<v-row no-gutters class="pb-6">
							<v-col :cols="item.col" :sm="item.sm" :key="i" v-for="(item,i) in formSuperior">
								<Input
									v-bind="item"
									v-model="form[item.name]"
									:errorMsg="errors[item.name]"
									:hasError="errors[item.name]"
									:imageUrl="typeof form.image === 'string' ? form.image_url : null"
								/>
							</v-col>
						</v-row>
					</v-col>
					<v-col cols="12" sm="6" >
						<v-row dense class="pb-6">
              <v-col cols="12">
								<v-divider />
								<v-subheader class="ma-0 pa-0">
									<v-icon class="mr-2">fa-map-pin</v-icon>Localização
								</v-subheader>
								<small>
                  Use os <v-icon small>fa-search</v-icon> para carregar a localização a partir do mapa. É possível carregar através do endereço completo, ou das coordenadas
                  (Latitude, Longitude)
								</small>
                <br/>
                <br/>
							</v-col>
							<v-col :cols="item.col" :sm="item.sm" :key="i" v-for="(item,i) in formInferior">
								<Input
									v-bind="item"
									v-model="form[item.name]"
									:errorMsg="errors[item.name]"
									:hasError="errors[item.name]"
								/>
							</v-col>
							<v-col cols="12"></v-col>
							
						</v-row>
					</v-col>
					<v-col cols="12" sm="6">
						<Map
							ref="map"
							:position="{lat: form.latitude, lng: form.longitude}"
							:onGeocode="onGeocode"
							:onReverseGeocode="onReverseGeocode"
							height="500px"
						/>
					</v-col>
        </v-row>
        
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="onClose()">Fechar</v-btn>
        <v-btn color="primary" @click="onSave(form, form.id)" :loading="saving">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Map from "./Map";
import DialogHeader from "./DialogHeader";
import Input from "./Input";
export default {
  components: { Map, DialogHeader, Input },
  props: {
    dialog: Boolean,
    saving: Boolean,
    id: Number,
    onSave: Function,
    onClose: Function,
    data: Object,
    errors: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      addressType: "address",
      address: "",
      coordinates: "",
      form: {
        name: "",
        propietary: "",
        street: "",
        district: "",
        city: "",
        state: "",
        country: "Brasil",
        house_number: "",
        postal_code: "",
        complement: "",
        latitude: "",
        longitude: "",
        image: undefined
			},
			formSuperior:{
				name: {
          label: "Nome da propriedade",
          type: "text",
          col: 12,
          sm: 12,
          name: "name",
          icon: "fa-warehouse"
        },
        propietary: {
          label: "Proprietário",
          type: "text",
          col: 12,
          sm: 12,
          name: "propietary",
          icon: "fa-user-tie"
        },
        image: {
          label: "Foto da Sede (Opcional)",
          type: "file-image",
          col: 12,
          sm: 12,
          name: "image",
					icon: "fa-image"
        },
			},
      formInferior: {
        street: {
          label: "Logradouro",
          type: "text",
          col: 12,
          sm: 7,
          name: "street"
        },
        house_number: {
          label: "Número (Opcional)",
          type: "text",
          col: 12,
          sm: 3,
          name: "house_number"
        },
        search_position: {
					type: "btn",
					icon: "fa-search",
					color:"info",
					onBtnClick: this.geocode,
          col: 12,
          sm: 1,
        },
        complement: {
          label: "Complemento (Opcional)",
          type: "text",
          col: 12,
          sm: 6,
          name: "complement"
        },
        district: {
          label: "Bairro",
          type: "text",
          col: 12,
          sm: 6,
          name: "district"
        },
        postal_code: {
          label: "CEP (Opcional)",
          type: "text",
          col: 12,
          sm: 6,
          name: "postal_code"
        },
        city: {
          label: "Cidade",
          type: "text",
          col: 12,
          sm: 6,
          name: "city"
        },
        state: {
          label: "Estado",
          type: "text",
          col: 12,
          sm: 6,
          name: "state"
        },
        country: {
          label: "País",
          type: "text",
          col: 12,
          sm: 6,
          name: "country"
        },
        sep: {
          type: "separator",
          col: 12,
          sm: 12,
        },
        latitude: {
          label: "Latitude",
          type: "number",
          col: 12,
          sm: 5,
          name: "latitude"
        },
        longitude: {
          label: "Longitude",
          type: "number",
          col: 12,
          sm: 5,
          name: "longitude"
        },
        search_address: {
					type: "btn",
					icon: "fa-search",
					color:"info",
					onBtnClick: this.reversegeocode,
          col: 12,
          sm: 1,
        },
      }
    };
  },
  watch: {
    id(value) {
      if (value) {
        this.form = this.data;
      } else {
        this.form = {
          name: "",
          propietary: "",
          street: "",
          district: "",
          city: "",
          state: "",
          country: "Brasil",
          house_number: "",
          postal_code: "",
          complement: "",
          latitude: "",
          longitude: "",
          image: undefined
        };
      }
    }
  },
  methods: {
    onGeocode(item) {
      this.form = {
        ...this.form,
        street: item.address.street,
        district: item.address.district,
        city: item.address.city,
        state: item.address.state,
        country: item.address.countryName,
        house_number: item.address.houseNumber,
        postal_code: item.address.postalCode,
        latitude: item.position.lat,
        longitude: item.position.lng
      };
    },
    onReverseGeocode(item) {
      this.form = {
        ...this.form,
        street: item.address.street,
        district: item.address.district,
        city: item.address.city,
        state: item.address.state,
        country: item.address.countryName,
        house_number: item.address.houseNumber,
        postal_code: item.address.postalCode,
        latitude: item.position.lat,
        longitude: item.position.lng
      };
    },
    geocode() {
      const address = [
        this.form.street,
        this.form.house_number,
        this.form.district,
        this.form.city + " - " + this.form.state,
        this.form.postal_code,
        this.form.country
      ];

      this.$refs.map.geocode(address.filter(v => v).join(","));
    },
    reversegeocode() {
      let coordinates = `${this.form.latitude},${this.form.longitude}`.replace(
        /[^0-9,.-]/g,
        ""
      );
      this.$refs.map.reversegeocode(coordinates);
    }
  }
};
</script>