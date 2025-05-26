<script lang="ts">
  import { currentDataSets, subTitle } from "$lib/runes.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import Card from "$lib/ui/Card.svelte";

  subTitle.text = "Placemark Data";

</script>

<div class="columns">
  <div class="column">
    <Card title="Total Venues By Payment Method">
      <Chart data={currentDataSets.totalByMethod} type="bar" />
    </Card>
  </div>
  <div class="column has-text-centered">
    <img alt="Bart Playing" src="/bart4.png" width="300" />
  </div>
  <div class="column has-text-centered">
    <Card title="Venues By Venue Type">
      <Chart data={currentDataSets.venuesByVenueType} type="pie" />
    </Card>
  </div>  
</div>
