<template>
    <div class="coin-container">
        <p>{{ coin.symbol }}</p>
        <p>{{ coin.lastPrice }}</p>
        <p>{{ coin.weightedAvgPrice }}</p>
        <button @click="addCoin({symbol:coin.symbol, count:count})" class="btn">add</button>
        <div class="quantity-container">
            <input type="number" v-model="count" class="count"/>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

    export default {

    props: ['coin'],
    data() {
        return {
            count: 1
        }
    },
    methods: {
        ...mapActions(["addCoin"]),
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
}
</style>