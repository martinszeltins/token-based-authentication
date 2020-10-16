import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store.js'

Vue.config.productionTip = false

new Vue({
    router,

    store,

    created()
    {
        let user = localStorage.getItem('user')

        if (user) {
            user = JSON.parse(user)
            this.$store.commit('setUserData', user)
        }
    },

    render: h => h(App)
}).$mount('#app')
