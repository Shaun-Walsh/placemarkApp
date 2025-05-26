import { currentDataSets, loggedInUser } from "$lib/runes.svelte";
import type { Venue, VenueType } from "$lib/types/placemark-types";
import LeafletMap from "$lib/ui/LeafletMap.svelte";
import { placemarkService } from "./placemark-service";

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

export async function refreshVenueMap(map: LeafletMap) {
  if (!loggedInUser.token) placemarkService.restoreSession();
  const venues = await placemarkService.getVenues(loggedInUser.token);
  // DEBUG: Check what venue types you actually have
  const venueTypes = await placemarkService.getVenueTypes(loggedInUser.token);
  // Create ID to name mapping
  const venueTypeMap = new Map();
  venueTypes.forEach((venueType: VenueType) => {
    venueTypeMap.set(venueType._id, venueType.title.toLowerCase());
  });
  venues.forEach((venue: Venue) => {
    if (typeof venue.venuetypeid === "string") {
      const popup = `${venue.title}`;
      const venueTypeName = venueTypeMap.get(venue.venuetypeid) || 'unknown';
      map.addMarker(venue.lat, venue.long, popup, venueTypeName);
    }
  });
  
  const lastVenue = venues[venues.length - 1];
  if (lastVenue) {
    map.moveTo(lastVenue.lat, lastVenue.long);
  }
}

