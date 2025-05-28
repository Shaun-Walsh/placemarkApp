  <script lang="ts">
  import { currentDataSets, subTitle } from "$lib/runes.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Card from "$lib/ui/Card.svelte";
  import Echart from "$lib/ui/Echart.svelte";
  import type { PageProps } from "./$types";
  import { refreshPlacemarkState } from "$lib/services/placemark-utils";

  subTitle.text = "Placemark Data";

  let { data }: PageProps = $props();
  refreshPlacemarkState(data.venues ?? [], data.venueTypes ?? []);
</script>

<div class="columns">
  <div class="column">
    <Card title="Total Venues By Payment Method">
      <Chart data={currentDataSets.totalByMethod} type="bar" />
    </Card>
  </div>
 
  <div class="column has-text-centered">
    <Card title="Venues By Venue Type">
      <Chart data={currentDataSets.venuesByVenueType} type="pie" />
    </Card>
  </div>
  
  <div class="column has-text-centered">
    <Card title="Echart">
      <Echart
        title="Venues By Payment Method"
        categories={currentDataSets.totalByMethod.labels}
        data={currentDataSets.totalByMethod.datasets[0].values}
        seriesName="Venues"
      />
    </Card>
  </div>
</div>

<div class="columns">
  <div class="column has-text-centered">
    <img alt="Bart Playing" src="/bart4.png" width="" />
  </div>
</div>
