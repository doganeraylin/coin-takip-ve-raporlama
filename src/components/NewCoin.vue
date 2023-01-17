<template>
    <div class="coin-container">
        <p>{{ coin.symbol }}</p>
        <p>{{ coin.lastPrice }}</p>
        <p>{{ coin.weightedAvgPrice }}</p>
        <button @click="addNewCoin(coin)" class="btn">add</button>
        <div class="quantity-container">
            <p class="count">{{ count }}</p>
            <div class="counter-container">
            <button @click="increment" class="count-btn">+</button>
            <button @click="decrement" class="count-btn">-</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

    props: ['coin'],
    methods: {
        addNewCoin(coin) {
            coin.added = true
            this.$store.commit("addingCoin", coin.symbol)
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
            return this.coin.count
        }
    }   
    
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
}
</style>