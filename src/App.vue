<template>
  <div id="app">
    <header>
      <button class="btn" @click="toggleModal">Add Stock</button>
      <button class="btn">Refresh</button>
    </header>
    <Portfolio></Portfolio>
    <div class="wrapper">
      <div v-if="showModal" class="modal-container">
      <input type="text" v-model="search">
      <div v-for="coin in allCoins" :key="coin.symbol">
        <div v-if="coin.added">
          <AddedCoin :coin="coin"></AddedCoin>
        </div>
        <div v-else>
          <NewCoin :coin="coin"></NewCoin>
        </div>
      </div>
    </div>
    <div class="pie-chart-container">
      <!-- <PieChart></PieChart> -->
    </div>
    </div>
    
  </div>

</template>

<script>

import PieChart from './components/PieChart.vue'
import AddedCoin from './components/AddedCoin.vue';
import NewCoin from './components/NewCoin.vue';
import Portfolio from "./components/Portfolio.vue"
import { mapState } from 'vuex';

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch("loadCoins")
  },

  data() {
    return {
      showModal: false,
      search: "",
      addedCoins: new Set()
    }
  },

  components: {
    PieChart,
    AddedCoin,
    NewCoin,
    Portfolio,
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
 
  },
  computed: {
  ...mapState([
    "coins",
    "addedCoinsArr"
  ]),
  allCoins() {
    return this.coins
      .concat(this.addedCoinsArr)
      .filter(coin => coin.symbol.toLowerCase().includes(this.search.toLowerCase()))
      .reduce((unique, item) => unique.find(coin => coin.symbol === item.symbol) ? unique : [...unique, item], []);
  }



// when added the coin in the search list has still add button  
//   filteredCoins() {
//     return this.coins.filter(coin => {
//         return !this.addedCoins.has(coin.symbol) && coin.symbol.toLowerCase().includes(this.search.toLowerCase());
//     });
// }


// when added it disappears from searchlist
  // filteredCoins() {
  //   return this.coins.filter(coin => {
  //       const addedCoin = this.addedCoinsArr.find(addedCoin => addedCoin.symbol === coin.symbol);
  //       return !addedCoin && coin.symbol.toLowerCase().includes(this.search.toLowerCase());
  //   });
  // }  
  }
}
</script>

<style scoped>
.modal-container {
  max-width: 500px;
}
.wrapper {
  display: flex;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto;
}

.pie-chart-container {
  width: 500px;
  margin: 25px auto;
}
</style>

