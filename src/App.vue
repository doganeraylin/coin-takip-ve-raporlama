
<template>
  <div class="main-container" >
    <header class="header-container">
      <button class="btn" @click="toggleModal">Add Stock</button>
      <button class="btn" @click="refresh">Refresh</button>
    </header>
    <div class="container">
      <Portfolio v-if="hasAddedCoins"></Portfolio>
      <PieChart></PieChart>
    </div>
    <div v-if="showModal" class="modal-container">
      <Modal @closeModal="closeModal"></Modal>
    </div>
  </div>

</template>

<script>

import PieChart from './components/PieChart.vue'
import Portfolio from "./components/Portfolio.vue"
import Modal from  "./components/Modal.vue"

export default {
  name: 'App',
  mounted() {
    this.$store.dispatch("loadCoins")
    if(localStorage.addedCoinsArr) {
      this.$store.dispatch("loadAddedCoinsFromLocalStorage", JSON.parse(localStorage.addedCoinsArr))
    }
 
    setInterval(() => {
      this.$store.dispatch("loadCoins")
    }, 1200000);
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
      showModal: false,
    }
  },
  components: {
    PieChart,
    Portfolio,
    Modal
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
    refresh() {
      this.$store.dispatch("loadCoins")
    },
    closeModal() {
      this.showModal = false;
    },
  },  

  computed: {
    hasAddedCoins() {
    return this.$store.state.addedCoinsArr.length > 0;
  }
  }
}
</script>

<style>
  .main-container {
    height: 100vh;
    background-color: #363636;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .header-container {
    background-color: #222222;
    padding: 20px;
  }

  .modal-container {
    position: fixed;
    top: 100px;
    left: 500px;
  }

  .container {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
  }
  
  .btn {
    background-color: #2BC69D;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin: 5px;
    font-weight: bold;
  }

  .btn:hover {
    cursor: pointer;
  }
</style>
