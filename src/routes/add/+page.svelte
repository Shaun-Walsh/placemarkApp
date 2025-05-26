<script lang="ts">
  import { subTitle, loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { onMount } from "svelte";
  import type { VenueType, Venue } from "$lib/types/placemark-types";
  import AddVenueForm from "./AddVenueForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import VenueList from "$lib/ui/VenueList.svelte";

  subTitle.text = "Add a Venue to Placemark";

</script>
<div class="columns">
  <div class="column">
    <Card title="Venues added to Date">
      <VenueList />
    </Card>
  </div>
  <div class="column">
    <Card title="Please add a Venue">
      <AddVenueForm />
    </Card>
  </div>
</div>
