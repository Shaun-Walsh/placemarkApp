import { currentDataSets } from "$lib/runes.svelte";
import type { Venue, VenueType } from "$lib/types/placemark-types";

export function computeByMethod(venueList: Venue[]) {
  currentDataSets.totalByMethod.datasets[0].values = [0, 0];
  venueList.forEach((venue) => {
    if (venue.payment == "cash") {
      currentDataSets.totalByMethod.datasets[0].values[0] += 1;
    } else if (venue.payment == "card") {
      currentDataSets.totalByMethod.datasets[0].values[1] += 1;
    }
  });
}

export function computeByVenueType(venueList: Venue[], venueTypes: VenueType[]) {
  currentDataSets.venuesByVenueType.labels = [];
  currentDataSets.venuesByVenueType.datasets[0].values = [];
  venueTypes.forEach((venueType) => {
    currentDataSets.venuesByVenueType.labels.push(
      // @ts-ignore
      `${venueType.title}`
    );
    currentDataSets.venuesByVenueType.datasets[0].values.push(0);
  });

  venueTypes.forEach((venueType, i) => {
    venueList.forEach((venue) => {
      if (venue.venuetypeid == venueType._id) {
          currentDataSets.venuesByVenueType.datasets[0].values[i] += 1;
        }
    });
  });
}