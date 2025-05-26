<script lang="ts">
  import { subTitle, loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { onMount } from "svelte";
  import type { Venue } from "$lib/types/placemark-types";
  import VenueList from "$lib/ui/VenueList.svelte";
  import Card from "$lib/ui/Card.svelte";

  subTitle.text = "List of Venues in Placemark";
  let venues: Venue[] = [];
  onMount(async () => {
    try {
      venues = await placemarkService.getVenues(loggedInUser.token);
    } catch (error) {
      console.error("Failed to fetch venues:", error);
    }
  });
</script>
<Card title="Venues in Placemark">
<VenueList />
</Card>