<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import { refreshVenueMap } from "$lib/services/placemark-utils";
 
  subTitle.text = "Venue Locations on Map";
  let map: LeafletMap;
  

onMount(async () => {
   await refreshVenueMap(map);
  });
</script>

<Card title="Donations Locations">
  <LeafletMap bind:this={map} />
</Card>

  