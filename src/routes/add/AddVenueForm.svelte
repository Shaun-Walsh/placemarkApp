<script lang="ts">
    import { placemarkService } from "$lib/services/placemark-service";
    import { loggedInUser, currentVenueTypes } from "$lib/runes.svelte";
    import type { Venue } from "$lib/types/placemark-types";
    import Coordinates from "$lib/ui/Coordinates.svelte";
    import ImageUploadTest from "$lib/ui/ImageUploadTest.svelte";
    import DOMPurify from "dompurify";

  // State variables to store form data
  let title = $state("");
  let type = $state("");
  let contact = $state("");
  let lat = $state(52.160858);
  let long = $state(-7.15242);
  let description = $state("");
  let payment = ["cash", "card"];
  let selectedMethod = $state("cash");
  let selectedVenueTypeId = $state("Public House");
  let imageUrl= $state("");
  let message = $state("Please add a venue");
  

  let { venueEvent = null } = $props();
  

 async function addVenue() {
    if (title && type && contact && description && lat && long && selectedVenueTypeId && payment) {
      const venueType = currentVenueTypes.venueTypes.find((venueType) => venueType._id === selectedVenueTypeId);
      if (venueType) {
        // Sanitize user input with stricter config
        const sanitizedTitle = DOMPurify.sanitize(title, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
        const sanitizedType = DOMPurify.sanitize(type, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
        const sanitizedContact = DOMPurify.sanitize(contact.toString(), { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
        const sanitizedDescription = DOMPurify.sanitize(description, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
        const sanitizedImageUrl = DOMPurify.sanitize(imageUrl || "", { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

        const venue: Venue = {
          title: sanitizedTitle.trim(),
          type: sanitizedType.trim(),
          contact: sanitizedContact.trim(),
          description: sanitizedDescription.trim(),
          payment: selectedMethod,
          lat: lat,
          long: long,
          venuetypeid: selectedVenueTypeId,
          imageUrl: sanitizedImageUrl,
        };

        const success = await placemarkService.addVenue(venue, selectedVenueTypeId, loggedInUser.token);
        if (!success) {
          message = "Venue not added - some error occurred";
          return;
        }

        if (venueEvent) venueEvent(venue);
        message = `Thanks! You added ${sanitizedTitle} to ${venueType.title}`;

        // Reset form
        title = "";
        type = "";
        contact = "";
        description = "";
        lat = 52.160858;
        long = -7.15242;
        selectedMethod = "cash";
        selectedVenueTypeId = currentVenueTypes.venueTypes[0]?._id || ""; // Better initialization
        imageUrl = "";
      }
    } else {
      message = "Please complete all required fields";
    }
  }
</script>
<div>
  <div class="field">
    <label class="label" for="title">Venue Title:</label>
    <input class="input" id="title" name="title" type="text" bind:value={title} />
  </div>
  
  <div class="field">
    <label class="label" for="type">Venue Type:</label>
    <input class="input" id="type" name="type" type="text" bind:value={type} />
  </div>
  
  <div class="field">
    <label class="label" for="contact">Contact Number:</label>
    <input class="input" id="contact" name="contact" type="number" bind:value={contact} />
  </div>
  
  <div class="field">
    <label class="label" for="description">Description:</label>
    <textarea class="textarea" id="description" name="description" bind:value={description}></textarea>
  </div>
  
  <div class="field">
    <div class="control">
      <label class="label" for="amount">Select Payment Method:</label>
      {#each payment as method}
        <input bind:group={selectedMethod} class="radio" type="radio" value={method} /> {method}
      {/each}
    </div>
  </div>

  <div class="field">
    <label class="label" for="venueType">Venue Category:</label>
    <div class="select">
      <select bind:value={selectedVenueTypeId}>
        {#each currentVenueTypes.venueTypes as venueType}
          <option value={venueType._id}>{venueType.title}</option>
        {/each}
      </select>
    </div>
  </div>

   <Coordinates bind:lat bind:long />

   <ImageUploadTest bind:imageUrl={imageUrl} />
  
  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth" onclick={() => addVenue()}> Add Venue</button>
    </div>
  </div>
</div>

<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>
