
<template>
    <div class="portfolio-container">
        <h1 class="title">My Portfolio</h1>
        <div class="coin-info-bar">
            <p>Symbol</p>
            <p>Last Price</p>
            <p>Weighted Avg Price</p>
        </div>
        <AddedCoin v-for="coin in addedCoins" :key="coin.symbol" :coin="coin"></AddedCoin>
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
    background-color: #222222;
    border-radius: 5px;
    width: 600px;
    padding: 10px;
    margin: 30px;
}

.title {
    margin-left: 20px;
}

.title,
.coin-info-bar {
    color: #F1DFDE;
}

.coin-info-bar {
    display: flex;
    justify-content: space-around;
    width: 400px;
    margin-left: 5px;
}

.coin-info-bar p {
    border: 2px solid #F1DFDE;
    padding: 3px 7px;
    border-radius: 5px;
    opacity: 0.5;
    margin-right: 5px;
}
</style>