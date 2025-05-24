<script lang="ts">
    import Coordinates from "$lib/ui/Coordinates.svelte";
  // State variables to store form data
  let title = $state("");
  let type = $state("");
  let contact = $state("");
  let lat = $state(52.160858);
  let long = $state(-7.15242);
  let description = $state("");
  let venueType = $state("");
  
  // For venue types - these would ideally be fetched from your API
  const venueTypesList = $state([
    { name: "Church" },
    { name: "Theatre" },
    { name: "Public House" }
  ]);
  
  
  function addVenue() {
    // Here you would implement the API call to add the venue
    console.log({ title, type, contact, lat, long, description, venueType });
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
      <select bind:value={venueType}>
        <option value="">Select a venue category</option>
        {#each venueTypesList as venueType}
          <option>{venueType.name}</option>
        {/each}
      </select>
    </div>
  </div>

   <Coordinates bind:lat bind:long />
  
  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth" onclick={addVenue}>Add Venue</button>
    </div>
  </div>
</div>
