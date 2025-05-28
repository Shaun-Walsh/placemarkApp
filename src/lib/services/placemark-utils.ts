import { currentDataSets, currentVenues, currentVenueTypes, loggedInUser } from "$lib/runes.svelte";
import type { Venue, VenueType } from "$lib/types/placemark-types";
import LeafletMap from "$lib/ui/LeafletMap.svelte";
import PaymentMap from "$lib/ui/PaymentMap.svelte";

// Function to compute total venues by payment method and by venue type
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
// Function to compute venues by venue type
export function computeByVenueType(venueList: Venue[], venueTypes: VenueType[]) {
  currentDataSets.venuesByVenueType.labels = [];
  currentDataSets.venuesByVenueType.datasets[0].values = [];
  venueTypes.forEach((venueType) => {
    currentDataSets.venuesByVenueType.labels.push(
      // @ts-expect-error red squiggle remover
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
//Function to refresh the venue map with current state
export async function refreshVenueMap(map: LeafletMap) {
  // Use venues from current state instead of making API calls
  const venues = currentVenues.venues;
  const venueTypes = currentVenueTypes.venueTypes;
  
  const venueTypeMap = new Map();
  venueTypes.forEach((venueType: VenueType) => {
    venueTypeMap.set(venueType._id, venueType.title.toLowerCase());
  });
  
  venues.forEach((venue: Venue) => {
    if (typeof venue.venuetypeid === "string") {
      const popup = `${venue.title}`;
      const venueTypeName = venueTypeMap.get(venue.venuetypeid);
      map.addMarker(venue.lat, venue.long, popup, venueTypeName);
    }
  });
  // Move the map to the last venue's location
  const lastVenue = venues[venues.length - 1];
  if (lastVenue) {
    map.moveTo(lastVenue.lat, lastVenue.long);
  }
}
// Function to refresh the payment map with current state
export async function refreshPaymentMap(map: PaymentMap) {
  // Use venues from current state instead of making API calls
  const venues = currentVenues.venues;
  const venueTypes = currentVenueTypes.venueTypes;
  
  const venueTypeMap = new Map();
  venueTypes.forEach((venueType: VenueType) => {
    venueTypeMap.set(venueType._id, venueType.title.toLowerCase());
  });
  
  venues.forEach((venue: Venue) => {
    if (typeof venue.venuetypeid === "string") {
      const popup = `${venue.title} ${venue.payment}`;
      map.addMarker(venue.lat, venue.long, popup, venue.payment);
    }
  });
  // Move the map to the last venue's location
  const lastVenue = venues[venues.length - 1];
  if (lastVenue) {
    map.moveTo(lastVenue.lat, lastVenue.long);
  }
}
// Function to refresh the placemark state with new venues and venue types
export async function refreshPlacemarkState(venues: Venue[], venueTypes:VenueType[]) {
  currentVenues.venues = venues;
  currentVenueTypes.venueTypes = venueTypes;
  computeByMethod(currentVenues.venues);
  computeByVenueType(currentVenues.venues, currentVenueTypes.venueTypes);
}
// Function to clear the placemark state
export function clearPlacemarkState() {
  currentVenues.venues = [];
  currentVenueTypes.venueTypes = [];
  loggedInUser.email = "";
  loggedInUser.name = "";
  loggedInUser.token = "";
  loggedInUser._id = "";
}

