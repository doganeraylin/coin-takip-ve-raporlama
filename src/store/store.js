
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
        addingCoin(state, {symbol, count}) {
            const singleCoin = state.coins.find(coin => {
                return coin.symbol == symbol
            })
            singleCoin.added = true

            const addedCoin = state.addedCoinsArr.find(coin => coin.symbol === symbol);
            if(addedCoin) {
                addedCoin.count += count
            } else {
                const newCoin = {
                    symbol: singleCoin.symbol,
                    lastPrice: singleCoin.lastPrice,
                    weightedAvgPrice: singleCoin.weightedAvgPrice,
                    added: true,
                    count: count
                }
                state.addedCoinsArr.push(newCoin)
            }
            singleCoin.count = count;
        },
        updateCoinCount(state, {symbol, count}) {
            const singleCoin = state.coins.find(coin => {
                return coin.symbol == symbol
            })
            singleCoin.count = count

            state.addedCoinsArr = state.addedCoinsArr.map(coin => {
                if (coin.symbol === symbol) {
                    return {...coin, count};
                }
                return coin;
            });
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
        loadAddedCoinsFromLocalStorage({commit}, addedCoins) {
           commit("setAddedCoins", addedCoins)
        },
        removeAddedCoin({commit}, symbol) {
            commit("removeCoin", symbol);
        },
        addCoin({commit}, {symbol, count}) {
            commit("addingCoin", {symbol, count})
        },
        updateCoinCount({ commit }, { symbol, count }) {
            commit("updateCoinCount", { symbol, count });
        },
        
    },
});
