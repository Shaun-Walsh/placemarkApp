<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { clearPlacemarkState } from "$lib/services/placemark-utils";

  clearPlacemarkState();
  if (browser) goto("/");
</script>