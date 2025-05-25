<script lang="ts">
  let { venues = [] } = $props();
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Title</th>
      <th>Type</th>
      <th>Contact</th>
      <th>Description</th>
      <th>Coordinates</th>
    </tr>
  </thead>
  <tbody>
    {#each venues as venue}
      <tr>
        <td>
          {venue.title}
        </td>
        <td>
          {venue.type}
        </td>
        <td>
          {venue.contact}
        </td>
        <td>
          {venue.description}
        </td>
        <td>
          {venue.lat}, {venue.long}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
