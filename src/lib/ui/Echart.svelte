<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';

  export let title = 'ECharts Example';
  export let categories: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  export let data: number[] = [120, 200, 150, 80, 70, 110, 130];
  export let seriesName = 'Sales';

  let chartContainer: HTMLDivElement;
  let chart: echarts.ECharts;

  function updateChart() {
    if (!chart) return;

    const option = {
      title: { text: title },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: categories
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: seriesName,
          type: 'bar',
          data: data
        }
      ]
    };

    chart.setOption(option);
  }

  onMount(() => {
    chart = echarts.init(chartContainer);
    updateChart();

    // Handle window resize
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  });

  // Update chart when props change
  $: if (chart && (title || categories || data || seriesName)) {
    updateChart();
  }
</script>

<style>
  .chart {
    width: 100%;
    height: 400px;
  }
</style>

<div bind:this={chartContainer} class="chart"></div>