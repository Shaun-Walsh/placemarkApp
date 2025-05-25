<script lang="ts">
  import { subTitle, loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { onMount } from "svelte";
  import type { VenueType } from "$lib/types/placemark-types";
  import AddVenueForm from "./AddVenueForm.svelte";
  import Card from "$lib/ui/Card.svelte";

  subTitle.text = "Add a Venue to Placemark";

  let venueTypesList: VenueType[] = [];
  onMount(async () => {
    try {
      venueTypesList = await placemarkService.getVenueTypes(loggedInUser.token);
    } catch (error) {
      console.error("Failed to fetch venue types:", error);
    }
  });
</script>
<Card title= "Add Venue"><AddVenueForm {venueTypesList} /></Card>
