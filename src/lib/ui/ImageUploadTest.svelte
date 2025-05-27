<script lang="ts">
  import { placemarkService } from "$lib/services/placemark-service";
  import { loggedInUser } from "$lib/runes.svelte";

  let { imageUrl = $bindable("") } = $props();

  let selectedFile: File | null = $state(null);
  let isUploading = $state(false);
  let uploadMessage = $state("");

  function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      selectedFile = target.files[0];
      uploadMessage = `File selected: ${target.files[0].name}`;
    } else {
      selectedFile = null;
      uploadMessage = "";
    }
  }

  async function uploadImage() {
    if (!selectedFile) return;

    isUploading = true;
    uploadMessage = "Uploading...";

    try {
      const url = await placemarkService.uploadImage(selectedFile, loggedInUser.token);
      if (url) {
        imageUrl = url;
        uploadMessage = "Upload successful!";
        selectedFile = null;
      } else {
        uploadMessage = "Upload failed";
      }
    } catch (error) {
      uploadMessage = `Upload failed: ${error}`;
    }

    isUploading = false;
  }
</script>

<div class="field">
  <label class="label" for="image-upload">Choose Image (Optional - Please Upload Before Adding Venue)</label>
  
  <div class="field has-addons">
    <div class="control is-expanded">
      <input 
        id="image-upload"
        class="input" 
        type="file" 
        accept="image/*" 
        onchange={handleFileSelect}
        disabled={isUploading}
      />
    </div>
    <div class="control">
      <button 
        class="button is-primary" 
        onclick={uploadImage}
        disabled={!selectedFile || isUploading}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  </div>

  {#if uploadMessage}
    <p class="help">{uploadMessage}</p>
  {/if}
</div>