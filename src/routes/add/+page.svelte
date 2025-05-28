 <script lang="ts">
  import { currentDataSets, currentVenueTypes, currentVenues, loggedInUser, subTitle } from "$lib/runes.svelte";
  import type { ActionResult } from "@sveltejs/kit";
  import Card from "$lib/ui/Card.svelte";
  import AddVenueForm from "./AddVenueForm.svelte";
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import VenueList from "$lib/ui/VenueList.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import { refreshVenueMap, refreshPlacemarkState } from "$lib/services/placemark-utils";
  import type { PageProps } from "./$types";
  import { placemarkService } from "$lib/services/placemark-service";

  subTitle.text = "Add a Venue to Placemark";

  let { data }: PageProps = $props();
  let message = $state("Please add a venue");

  //function that refreshes venue data from the server after successful submission, updates the global state, and automatically adds a marker + moves the map to the newly created venue's location.
const handleVenueSuccess = () => {
    return async ({ result }: { result: ActionResult }) => {
      if (result.type === "success") {
        const updatedVenues = await placemarkService.getVenues(loggedInUser.token);
        const venueTypes = await placemarkService.getVenueTypes(loggedInUser.token);
        await refreshPlacemarkState(updatedVenues, venueTypes);
        const newestVenue = updatedVenues[updatedVenues.length - 1];
        
        if (newestVenue && map) {
          try {
            await map.addMarker(newestVenue.lat, newestVenue.long, newestVenue.title, newestVenue.type);
            await map.moveTo(newestVenue.lat, newestVenue.long);
          } catch (error) {
          }
        } else {
        }
        
        message = `Thanks! You added a new venue!`;
      } else {
        message = "Failed to add venue";
      }
    };
  };

  let map: LeafletMap;

  onMount(async () => {
    await refreshPlacemarkState(data.venues ?? [], data.venueTypes ?? []);
    if (map) {
      await refreshVenueMap(map);
    } else {
      console.warn("Map not available in onMount");
    }
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
      <AddVenueForm venueTypeList={currentVenueTypes.venueTypes} enhanceFn={handleVenueSuccess} bind:message />
    </Card>
  </div>
</div>

<div class="columns">
  <div class="column">
    <Card title="Venues added to Date">
      <Chart data={currentDataSets.venuesByVenueType} type="pie" />
    </Card>
  </div>
  <div class="column">
    <Card title="Current Venues">
      <VenueList />
    </Card>
  </div>
</div>