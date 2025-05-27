<script lang="ts">
  import { subTitle, currentDataSets } from "$lib/runes.svelte";
  import AddVenueForm from "./AddVenueForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import VenueList from "$lib/ui/VenueList.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import type { Venue } from "$lib/types/placemark-types";
  import { refreshVenueMap } from "$lib/services/placemark-utils";
  import ImageUploadTest from "$lib/ui/ImageUploadTest.svelte";
  
  subTitle.text = "Add a Venue to Placemark";

  let map: LeafletMap;

function venueAdded(venue: Venue) {
    map.addMarker(venue.lat, venue.long, venue.title, venue.venuetypeid);
    map.moveTo(venue.lat, venue.long);
}

onMount(async () => {
    await refreshVenueMap(map);
  });

</script>
<div class="columns">
  <div class="column">
    <Card title="Venues to Date">
      <LeafletMap height={62.5} bind:this={map} />
    </Card>
  </div>
  <div class="column">
    <Card title="Please add a Venue">
      <AddVenueForm venueEvent={venueAdded}/>
    </Card>
  </div>
  
</div>
  <div class="columns">
  <div class="column">
    <Card title="Venues added to Date">
      <Chart data={currentDataSets.venuesByVenueType} type="pie" />
      <VenueList />
    </Card>
  </div>
  <div class="column">
    <Card title="Current Venues">
      <VenueList />
    </Card>
  </div>
 </div>  

<ImageUploadTest />