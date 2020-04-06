import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@fortawesome/fontawesome-free/css/all.css'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt',
  },
  icons: {
    iconfont: 'fa',
  },
  theme:{
    themes: {
      light: {
        primary: '#17262A',
      },
      dark: {
        primary: '#17262A',
      },
    },
  }
});
