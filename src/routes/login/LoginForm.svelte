<script lang="ts">
  import { goto } from "$app/navigation";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import DOMPurify from "dompurify";

  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function login() {
    const sanitizedEmail = DOMPurify.sanitize(email, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
    const sanitizedPassword = DOMPurify.sanitize(password, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();

    console.log(`attempting to log in email: ${sanitizedEmail} with password: ${sanitizedPassword}`);

    const session = await placemarkService.login(sanitizedEmail, sanitizedPassword);

    if (session) {
      goto("/add");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }
</script>

<div class="box">
  {#if message}
    <Message {message} />
  {/if}
  <UserCredentials bind:email bind:password />
  <button onclick={() => login()} class="button">Log In</button>
</div>