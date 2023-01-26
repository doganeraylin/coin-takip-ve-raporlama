<template>
    <div class="portfolio-container">
        <h1 class="title">My Portfolio</h1>
        <AddedCoin v-for="coin in addedCoins" :key="coin.symbol" :coin="coin"  :count="coin.count"></AddedCoin>
    </div>
</template>

<script>
    import AddedCoin from './AddedCoin.vue';
    import { mapState } from 'vuex';

    export default {
        components: {
            AddedCoin
        },
        computed: {
            ...mapState(['addedCoinsArr']),
            addedCoins() {
                return this.addedCoinsArr.filter(coin => coin.added);
            }
        }
    }
</script>

<style scoped>
.portfolio-container {
    border: 2px #181818 solid;
    border-radius: 5px;
    width: 600px;
    padding: 10px;
    margin: 30px
}

.title {
    color: #181818;
}
</style>