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
      const colors = ['#C0DEDD', '#A9F2CB', '#B5F8B1', '#D2FA91', '#F9F871', '#DDAED2'];
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

