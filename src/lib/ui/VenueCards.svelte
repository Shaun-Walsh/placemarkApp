<script lang="ts">
  import { currentVenues } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import { loggedInUser } from "$lib/runes.svelte";
  import type { Venue } from "$lib/types/placemark-types";
    import { refreshPlacemarkState } from "$lib/services/placemark-utils";

  async function deleteVenueImage(venue: Venue): Promise<void> {
  if (confirm(`Remove image from ${venue.title}?`)) {
    try {
        
      const imageId = extractImageId(venue.imageUrl);
      
      if (imageId) {
        // Delete from Cloudinary
        const deleted = await placemarkService.deleteImage(imageId, loggedInUser.token);
        
        if (deleted) {
          // Clear image URL from database
                // @ts-ignore
          const cleared = await placemarkService.clearVenueImage(venue._id, loggedInUser.token);
          
          if (cleared) {
            const updatedVenues = await placemarkService.getVenues(loggedInUser.token);
            const venueTypes = await placemarkService.getVenueTypes(loggedInUser.token);
            await refreshPlacemarkState(updatedVenues, venueTypes);
          } else {
            alert("Image deleted from cloud but failed to update database");
          }
        } else {
          alert("Failed to delete image");
        }
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete image");
    }
  }
}

  function extractImageId(url: string): string {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('.')[0];
  }
</script>

<div class="columns is-multiline">
  {#each currentVenues.venues as venue}
    <div class="column is-one-third">
      <div class="card">

        {#if venue.imageUrl}
          <div class="card-image">
            <figure class="image is-4by3">
              <img src={venue.imageUrl} alt={venue.title} />
            </figure>
            <div class="card-image-overlay">
              <button 
                class="button is-small is-danger is-rounded" 
                onclick={() => deleteVenueImage(venue)}
                title="Delete image"
              >
                ✕
              </button>
            </div>
          </div>
        {/if}

        <header class="card-header">
          <p class="card-header-title">
            {venue.title}
          </p>
        </header>

        <div class="card-content">
          <div class="content">
            <p><strong>Type:</strong> {venue.type}</p>
            <p><strong>Contact:</strong> {venue.contact}</p>
            <p><strong>Description:</strong> {venue.description}</p>
            <p><strong>Payment:</strong> {venue.payment}</p>
            <p><strong>Coordinates:</strong> {venue.lat}, {venue.long}</p>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
<style>
  .card-image {
    position: relative;
  }
  
  .card-image-overlay {
    position: absolute;
    top: 8px;
    right: 8px;
  }
</style>