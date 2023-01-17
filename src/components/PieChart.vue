<template>
  <div>
  <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>

import { Chart} from 'chart.js'
import { mapState } from 'vuex'

export default {

  computed: {
    ...mapState([
      "addedCoinsArr"
    ]),
    chartData() {
      const colors = ['#f87979', '#f9a65a', '#fcc419', '#fcd917', '#f5e8c8', '#f3e5ab'];
      return {
        labels: this.addedCoinsArr.map(coin => coin.symbol),
        datasets: [
          {
            label: 'Data One',
            backgroundColor: this.addedCoinsArr.map((coin, index) => colors[index % colors.length]),
            data: this.addedCoinsArr.map(coin => coin.count),
          }
        ]
      }
    }
  },

  data() {
    return {
      options: {
      title: {
        display: true,
        text: 'My Chart'
      }
    }
    }
  },
  mounted() {
    console.log("pie chart mounted")
    const ctx = document.getElementById("myChart")
    this.myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      datasets: [{
        label: '# of coins',
        data: this.chartData,
        borderWidth: 1
      }]
    },
  });
  },
  watch: {
    chartData: {
      handler() {
        this.myChart.data = this.chartData;
        this.myChart.update();
      },
      deep: true
    }   
  },
  }
</script>


<style>

</style>