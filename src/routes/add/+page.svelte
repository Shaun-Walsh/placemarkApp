<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import AddVenueForm from "./AddVenueForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  subTitle.text = "Add a Venue to Placemark";
</script>
<Card title= "Add Venue"><AddVenueForm /></Card>
