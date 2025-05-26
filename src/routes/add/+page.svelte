<script lang="ts">
  import { subTitle, currentDataSets } from "$lib/runes.svelte";
  import AddVenueForm from "./AddVenueForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import VenueList from "$lib/ui/VenueList.svelte";
  import Chart from "svelte-frappe-charts";

  subTitle.text = "Add a Venue to Placemark";

</script>
<div class="columns">
  <div class="column">
    <Card title="Venues added to Date">
      <Chart data={currentDataSets.venuesByVenueType} type="pie" />
      <VenueList />
    </Card>
  </div>
  <div class="column">
    <Card title="Please add a Venue">
      <AddVenueForm />
    </Card>
  </div>
</div>
