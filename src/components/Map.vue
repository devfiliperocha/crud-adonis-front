<template>
  <div>
    <Loading :loading="loading" />
    <div ref="map" :style="{width: width || '100%', height: height || '500px'}" v-show="!loading && !error"></div>
    <v-alert type="error" dense v-if="error">
      Erro ao carregar localização.
      <br />
      {{errorText}}
    </v-alert>
  </div>
</template>
<script>
import Loading from "./Loading";
export default {
  components: { Loading },
  props: {
    onGeocode: Function,
		onReverseGeocode: Function,
		height: String,
		width: String,
		position: Object
  },
  data() {
    return {
      loading: false,
      error: false,
      errorText: "",
      map: null,
      defaultLayers: null,
      platform: null,
      interval: null,
      Here: window.H
    };
  },
  mounted() {
    const config = require('../config/config.json')
    
    const H = this.Here;
    this.platform = new H.service.Platform({
      apikey: config.HERE_API_KEY
    });
    this.defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(this.$refs.map, this.defaultLayers.vector.normal.map, {
      zoom: 10,
      center: { lat: -15.797091, lng: -47.878331 },
      pixelRatio: window.devicePixelRatio || 1
    });

    window.addEventListener("resize", () => this.map.getViewPort().resize());
    this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers, "pt-BR");

    var mapEvents = new H.mapevents.MapEvents(this.map);
		new H.mapevents.Behavior(mapEvents);
		
		if(this.position.lat && this.position.lng){
			this.setMarker(this.position)
		}

    this.interval = setInterval(() => {
      this.map.getViewPort().resize();
    }, 1000);
  },
  methods: {
		setMarker({lat, lng}){
			const objs = this.map.getObjects()
			objs.forEach(o=>{
				this.map.removeObject(o)
			})
			
      const H = this.Here;
			this.map.addObject(new H.map.Marker({ lat, lng }));
			this.map.setCenter({ lat, lng });
			this.map.setZoom(18);

		},
    geocode(geocodeText) {
			this.loading = true;
			const objs = this.map.getObjects()
			objs.forEach(o=>{
				this.map.removeObject(o)
			})
      this.error = false;
      const H = this.Here;
      let service = this.platform.getSearchService();
      service.geocode(
        {
          q: geocodeText
        },
        result => {
					if(!result.items.length){
						this.loading = false;
						this.error = true;
						this.errorText = "Localização não encontrada!";
						return;

					}
          result.items.forEach(item => {
            this.map.addObject(new H.map.Marker(item.position));
            this.map.setCenter(item.position);
            this.map.setZoom(18);
            this.loading = false;
            this.error = false;
            this.onGeocode(item);
          });
        },
        err => {
          this.loading = false;
          this.error = true;
          this.errorText = err;
        }
      );
    },
    reversegeocode(text) {
      this.loading = true;
			const objs = this.map.getObjects()
			objs.forEach(o=>{
				this.map.removeObject(o)
			})
      this.error = false;
      const H = this.Here;
      let service = this.platform.getSearchService();
      service.reverseGeocode(
        {
          at: text
        },
        result => {
					if(!result.items.length){
						this.loading = false;
						this.error = true;
						this.errorText = "Localização não encontrada!";
						return;

					}
          result.items.forEach(item => {
            this.map.addObject(new H.map.Marker(item.position));

            this.map.setCenter(item.position);
            this.map.setZoom(18);
            this.loading = false;
            this.error = false;
            this.onReverseGeocode(item);
          });
        },
        err => {
          this.loading = false;
          this.error = true;
          this.errorText = err;
        }
      );
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>