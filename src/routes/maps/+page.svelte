<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import PaymentMap from "$lib/ui/PaymentMap.svelte";
  import { onMount } from "svelte";
  import { refreshVenueMap, refreshPaymentMap, refreshPlacemarkState } from "$lib/services/placemark-utils";
  import type { PageProps } from "./$types";
 
  subTitle.text = "Venue Locations on Map";
  
  let { data }: PageProps = $props();
  let map: LeafletMap;
  let map2: PaymentMap;
  
  onMount(async () => {
    await refreshPlacemarkState(data.venues ?? [], data.venueTypes ?? []);
    await refreshVenueMap(map);
    await refreshPaymentMap(map2);
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="All Venues">
      <LeafletMap height={60} bind:this={map} mapId="map" />
    </Card>
  </div>
  <div class="column">
    <Card title="Payment Methods">
      <PaymentMap height={60} bind:this={map2} mapId="map-2" />
    </Card>
  </div>
</div>