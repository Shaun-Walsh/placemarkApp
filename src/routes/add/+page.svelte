<script lang="ts">
  import { subTitle, loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { onMount } from "svelte";
  import type { VenueType, Venue } from "$lib/types/placemark-types";
  import AddVenueForm from "./AddVenueForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import VenueList from "$lib/ui/VenueList.svelte";

  subTitle.text = "Add a Venue to Placemark";

  let venueTypesList: VenueType[] = [];
  let venues: Venue[] = [];
  onMount(async () => {
    try {
      venueTypesList = await placemarkService.getVenueTypes(loggedInUser.token);
      venues = await placemarkService.getVenues(loggedInUser.token);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  });
</script>
<div class="columns">
  <div class="column">
    <Card title="Venues added to Date">
      <VenueList {venues} />
    </Card>
  </div>
  <div class="column">
    <Card title="Please add a Venue">
      <AddVenueForm {venueTypesList} />
    </Card>
  </div>
</div>
