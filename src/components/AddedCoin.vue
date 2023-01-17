<template>
    <div class="coin-container">
        <p>{{ coin.symbol }}</p>
        <p>{{ coin.lastPrice }}</p>
        <p>{{ coin. weightedAvgPrice }}</p>
        <div class="quantity-container">
            <p class="count">{{ count }}</p>
            <div class="counter-container">
                <button @click="increment" class="count-btn">+</button>
                <button @click="decrement" class="count-btn">-</button>
            </div>
        </div>
        <div class="btn-container">
            <button class="update-btn btn">update</button>
            <button @click="removeCoin(coin.symbol)" class="remove-btn btn">remove</button>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['coin'],
        methods: {
            removeCoin(symbol) {
            this.$store.dispatch("removeAddedCoin", symbol);
            },
            increment() {
                this.$store.commit("increment", this.coin.symbol);
            },
            decrement() {
                this.$store.commit("decrement", this.coin.symbol);
            }, 
        },
        computed: {
            count() {
             return this.coin.count;
            }
        },
}
    
</script>

<style>
.coin-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #EDE9D0;
    border: 2px solid white;
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
    background-color: whitesmoke;
    padding: 5px 10px;
    border-radius: 2px;
}

.count-btn {
    background-color: whitesmoke;
    border: none;
    border-radius: 2px;
    padding: 3px 7px;
    font-size: 15px;
}

.update-btn {
    background-color: #99DFCD;
}
.remove-btn {
    background-color: #E72525;
}
</style>
