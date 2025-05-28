<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import VenueList from "$lib/ui/VenueList.svelte";
  import VenueCards from "$lib/ui/VenueCards.svelte";
  import { subTitle } from "$lib/runes.svelte";
  import { refreshPlacemarkState } from "$lib/services/placemark-utils";
  import type { PageProps } from "./$types";

  subTitle.text = "Venues to Date";
  let { data }: PageProps = $props();
  if (data.venues && data.venueTypes) {
    refreshPlacemarkState(data.venues, data.venueTypes);
  } else {
    refreshPlacemarkState([], []);
  }
</script>
<Card title="Venues in Placemark">
  <VenueCards />
</Card>
