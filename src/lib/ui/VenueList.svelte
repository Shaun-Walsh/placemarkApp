<script lang="ts">
  export let venues = [
    {
      title: "St. Patrick's Cathedral",
      type: "Historic",
      contact: "0517654321",
      description: "Beautiful cathedral in the city center",
      venueType: "Church",
      lat: 52.160858,
      long: -7.15242
    },
    {
      title: "Grand Theatre",
      type: "Entertainment",
      contact: "0527894561",
      description: "Modern theatre with excellent acoustics",
      venueType: "Theatre",
      lat: 52.261290,
      long: -7.231540
    },
    {
      title: "The Old Oak",
      type: "Social",
      contact: "0537891234",
      description: "Traditional Irish pub with live music",
      venueType: "Public House",
      lat: 52.361290,
      long: -7.241540
    }
  ];
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Title</th>
      <th>Type</th>
      <th>Contact</th>
      <th>Venue Category</th>
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
          {venue.venueType}
        </td>
        <td>
          {venue.lat}, {venue.long}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
