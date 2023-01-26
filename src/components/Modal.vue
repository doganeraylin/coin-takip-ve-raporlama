<template>
    <div class="modal-container">
      <button class="close-btn" @click="closeModal">x</button>
        <input type="text" v-model="search" placeholder="Search" class="search-bar">
        <div class="coin-info-bar">
            <p>Symbol</p>
            <p>Last Price</p>
            <p>Weighted Avg Price</p>
        </div>
        <div v-for="coin in allCoins" :key="coin.symbol">
          <div v-if="coin.added">
            <AddedCoin :coin="coin"></AddedCoin>
          </div>
          <div v-else>
            <NewCoin :coin="coin"></NewCoin>
          </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import NewCoin from './NewCoin.vue';
    import AddedCoin from './AddedCoin.vue';

    export default {
      mounted() {
        if(localStorage.addedCoinsArr) {
        this.$store.dispatch("loadAddedCoinsFromLocalStorage", JSON.parse(localStorage.addedCoinsArr))
       }
      },
      watch: {
        addedCoinsArr: {
          handler(addedCoinsList) {
            localStorage.addedCoinsArr = JSON.stringify(addedCoinsList)
          },
          deep: true
        },
  },
    data() {
        return {
        search: "",
        }
    },
    methods: {
      closeModal() {
      this.$emit("closeModal");
    },
    },
    components: {
        NewCoin,
        AddedCoin
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
    },
  },   
    
}

</script>


<style scoped>
    .modal-container {
        max-width: 500px;
        max-height: 600px;
        margin: 0 auto;
        background-color: #181818;
        padding: 20px;
        overflow: scroll;
        border-radius: 5px;
    }
    .search-bar {
        display: block;
        padding: 10px;
        border-radius: 5px;
    }
    .close-btn {
      position:absolute;
      top: 15px;
      right: 30px;
    }

    .close-btn:hover {
      cursor: pointer;
      background-color: rgb(173, 4, 4);
    }
</style>