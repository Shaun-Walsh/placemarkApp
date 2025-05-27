<script>
  import { Gallery } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { currentVenues } from "$lib/runes.svelte";
  
  // https://flowbite-svelte.com/docs/components/gallery
  $: venueImages = currentVenues.venues
    .filter(venue => venue.imageUrl)
    .map(venue => ({
      alt: venue.title,
      src: venue.imageUrl
    }));

  // Split images into columns for masonry layout
  $: column1 = venueImages.filter((_, index) => index % 4 === 0);
  $: column2 = venueImages.filter((_, index) => index % 4 === 1);
  $: column3 = venueImages.filter((_, index) => index % 4 === 2);
  $: column4 = venueImages.filter((_, index) => index % 4 === 3);

  onMount(async () => {
    await placemarkService.restoreSession();
    await placemarkService.refreshVenueInfo();
  });
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-center mb-8">Venue Gallery</h1>
  {#if venueImages.length > 0}
    <Gallery class="grid-cols-2 gap-4 md:grid-cols-4">
      <Gallery items={column1} />
      <Gallery items={column2} />
      <Gallery items={column3} />
      <Gallery items={column4} />
    </Gallery>
  {:else}
    <div class="text-center py-8 text-gray-500">
      <p class="text-lg">No images yet!</p>
      <p class="text-sm mt-2">Add venues with images to see them here.</p>
    </div>
  {/if}
</div>