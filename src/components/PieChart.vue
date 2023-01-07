<template>
  <div>
  <Bar :chart-data="chartData" />
  <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>

import { Bar } from 'vue-chartjs'
import { Chart} from 'chart.js'

export default {
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12]
          }
        ]
      },
      options: {
      title: {
        display: true,
        text: 'My Chart'
      }
    }
    }
  },
  mounted() {
    console.log("mounted")
    const ctx = document.getElementById("myChart")
    const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  myChart;
  }
}
</script>

