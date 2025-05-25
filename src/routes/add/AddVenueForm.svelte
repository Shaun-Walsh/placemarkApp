<script lang="ts">
    import { placemarkService } from "$lib/services/placemark-service";
    import { loggedInUser, getUserId } from "$lib/runes.svelte";
    import type { Venue } from "$lib/types/placemark-types";
    import Coordinates from "$lib/ui/Coordinates.svelte";

  // State variables to store form data
  let title = $state("");
  let type = $state("");
  let contact = $state("");
  let lat = $state(52.160858);
  let long = $state(-7.15242);
  let description = $state("");
  let selectedVenueTypeId = $state("");
  let message = $state("Please add a venue");
  
  // Props to receive the list of venue types
  let { venueTypesList = [] } = $props();
  

  // Function to handle adding a venue
  async function addVenue() {
    if (title && type && contact && description && lat && long && selectedVenueTypeId) {
     const venueType = venueTypesList.find((venueType) => venueType._id === selectedVenueTypeId);
      if (venueType) {
        const venue: Venue = {
          title: title,
          type: type,
          contact: contact,
          description: description,
          lat: lat,
          long: long,
          venuetypeid: selectedVenueTypeId,
         // user: getUserId() || "6833813fc0d8fb43918e4e4a"
        };

        
        console.log("Submitting venue:", venue);

        const success = await placemarkService.addVenue(venue, selectedVenueTypeId, loggedInUser.token);
        if (!success) {
          message = "Venue not added - some error occurred";
          return;
        }
        message = `Thanks! You added ${title} to ${venueType.title}`;
        title = "";
        type = "";
        contact = "";
        description = "";
        selectedVenueTypeId = "";
      }
    } else {
      message = "Please all required fields";
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
    <label class="label" for="venueType">Venue Category:</label>
    <div class="select">
      <select bind:value={selectedVenueTypeId}>
        {#each venueTypesList as venueType}
          <option value={venueType._id}>{venueType.title}</option>
        {/each}
      </select>
    </div>
  </div>

   <Coordinates bind:lat bind:long />
  
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
