import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex, axios);

export const store = new Vuex.Store({
    state: {
       coins: [], 
       addedCoinsArr: [],
    },
    mutations: {
        setCoins(state, coins) {
            state.coins = coins.map(coin => {
                return { ...coin, count: 1}
            });
        },
        addingCoin(state, symbol) {
            const singleCoin = state.coins.find(coin => {
                return coin.symbol == symbol
            })

            const newCoin = {
                symbol: singleCoin.symbol,
                lastPrice: singleCoin.lastPrice,
                weightedAvgPrice: singleCoin.weightedAvgPrice,
                added: true,
                count: singleCoin.count
            }
            state.addedCoinsArr.push(newCoin)
            
        },
        increment(state, symbol) {
            const coin = state.coins.find(coin => coin.symbol === symbol);
            coin.count += 1
            const addedCoin = state.addedCoinsArr.find(coin => coin.symbol === symbol);
            addedCoin.count += 1
        },
        decrement(state, symbol) {
            const coin = state.coins.find(coin => coin.symbol === symbol);
            if(coin.count > 0) {
                coin.count -= 1
            }
            const addedCoin = state.addedCoinsArr.find(coin => coin.symbol === symbol);
            if(addedCoin.count > 0) {
                addedCoin.count -= 1
            }
        },
        removeCoin(state, symbol) {
            state.addedCoinsArr = state.addedCoinsArr.filter(coin => coin.symbol !== symbol);
            localStorage.addedCoinsArr = JSON.stringify(state.addedCoinsArr);
            state.coins = state.coins.map(coin => {
            if (coin.symbol === symbol) {
                coin.added = false;
            }
            return coin;
            });
        },
        setAddedCoins(state, addedCoins) {
            state.addedCoinsArr = addedCoins
        },
    },
    actions: {
        loadCoins({commit}) {
            axios
                .get("https://api2.binance.com/api/v3/ticker/24hr")
                .then(data => {
                    let coins = data.data
                    commit("setCoins", coins)
                })
                .catch(error => {
                    console.log("error")
                })     
        },
        loadAddedCoinsFromLocalStorage(context, addedCoins) {
            context.commit("setAddedCoins", addedCoins)
        },
        removeAddedCoin({commit}, symbol) {
            commit("removeCoin", symbol);
        },
        
    },
});






