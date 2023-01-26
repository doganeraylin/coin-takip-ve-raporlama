<template>
    <div class="coin-container">
        <p>{{ coin.symbol }}</p>
        <p>{{ coin.lastPrice }}</p>
        <p>{{ coin. weightedAvgPrice }}</p>
        <div class="quantity-container">
            <input type="number" v-model="coin.count" class="count"/>
        </div>
        <div class="btn-container">
            <button @click="removeCoin(coin.symbol)" class="remove-btn btn">remove</button>
            <button @click="updateCoinCount()" class="update-btn btn">update</button>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['coin'],
        data() {
            return {
                count: this.coin.count
            }
        },
        methods: {
            removeCoin(symbol) {
            this.$store.dispatch("removeAddedCoin", symbol);
            },
            updateCoinCount() {
                this.$store.dispatch("updateCoinCount", { symbol: this.coin.symbol, count: this.coin.count });
            }, 
         
        },
}
    
</script>

<style>
.coin-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #363636;
    border-radius: 5px;
    padding: 10px;
    margin: 5px auto
}
.quantity-container {
    display: flex;
}

.counter-container {
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    margin-left: 15px;
}

.count {
    max-width: 30px;
    background-color: #F1DFDE;
    padding: 5px 10px;
    border: none;
    margin-left: 20px;
}

.coin-info-bar {
    display: flex;
    justify-content: space-around;
    width: 400px;
    margin-left: 5px;
}

.coin-info-bar p {
    color:  #F1DFDE;
    border: 2px solid #F1DFDE;
    padding: 3px 7px;
    border-radius: 5px;
    opacity: 0.5;
    margin-right: 5px;
}


.update-btn {
    background-color: #A77FF9;

}
.remove-btn {
    background-color: #E86A34;
}
</style>
