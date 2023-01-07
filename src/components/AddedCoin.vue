<template>
    <div class="added-coin-container">
        <div class="symbol-container">
            <p>symbol name</p>
            <div class="symbol-info">
                <p>last price</p>
                <p>weightedavgprice</p>
            </div>
        </div>
        <div class="quantity-container">
            <p>number</p>
            <div>
                <p>i</p>
                <p>d</p>
            </div>
        </div>
        <div class="update-remove-container">
            <p>update</p>
            <p>remove</p>
        </div>
        <!-- <li v-for="coin in coins">
            <p>{{coin.symbol}}</p>
        </li> -->
    </div>
</template>


<script>
    export default {
        computed: {
            products() {
               
            }
        }
    }
</script>