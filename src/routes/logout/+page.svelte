<script lang="ts">
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";

  placemarkService.clearSession();
  goto("/");
</script>
