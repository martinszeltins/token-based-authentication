import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state:
    {
        user: null,
    },

    mutations:
    {
        setUserData(state, userData)
        {
            state.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
            axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
        },

        clearUserData()
        {
            localStorage.removeItem('user')
            location.reload()
        },
    },

    actions:
    {
        async register({ commit }, credentials)
        {
            const result = await axios.post('//localhost:3000/register', credentials)

            commit('setUserData', result.data)
        },

        async login({ commit }, credentials)
        {
            const result = await axios.post('//localhost:3000/login', credentials)

            commit('setUserData', result.data)
        },

        async logout({ commit })
        {
            commit('clearUserData')
        },
    },

    getters:
    {
        loggedIn(state)
        {
            return !!state.user
        },
    },
})
