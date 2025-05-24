<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import VenueList from "$lib/ui/VenueList.svelte";
  import Card from "$lib/ui/Card.svelte";

  subTitle.text = "List of Venues in Placemark";
</script>
<Card title="Venues in Placemark">
<VenueList />
</Card>