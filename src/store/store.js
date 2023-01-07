import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex, axios);

export const store = new Vuex.Store({
    state: {
       coins: []
    },
    actions: {
        loadCoins({commit}) {
            axios
                .get("https://api2.binance.com/api/v3/ticker/24hr")
                .then(data => {
                    console.log(data.data)
                    let coins = data.data
                    commit("SET_COINS", coins)
                })
                .catch(error => {
                    console.log("error")
                })
                
        }
    },
    mutations: {
        SET_COINS(state, coins) {
            state.coins = coins
        }
    }
});