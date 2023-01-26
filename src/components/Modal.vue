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
      width: 600px;
      max-height: 600px;
      margin: 0 auto;
      background-color: #181818;
      padding: 20px;
      overflow: scroll;
      border-radius: 5px;
      scrollbar-color: green;
  }

  .modal-container::-webkit-scrollbar {
    display: none;
  }
  .search-bar {
      display: block;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 15px;
      margin: 10px 0 10px 15px;
  }
  .close-btn {
    position:absolute;
    top: 30px;
    right: 25px;
    padding: 5px 10px;
    border-radius: 3px;
    background-color: white;
  }

  .close-btn:hover {
    cursor: pointer;
    background-color: #E86A34;
  }

  .coin-info-bar {
  display: flex;
  justify-content: space-around;
  width: 400px;
  margin-left: 5px;
  }

  .coin-info-bar p {
    color: #F1DFDE;
    border: 2px solid #F1DFDE;
    padding: 3px 7px;
    border-radius: 5px;
    opacity: 0.5;
    margin-right: 5px;
  }
</style>