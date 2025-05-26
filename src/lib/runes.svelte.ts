import type { Venue } from "./types/placemark-types";
import type { VenueType } from "./types/placemark-types";

export const subTitle = $state({ text: "" });
export const loggedInUser = $state({ 
    email: "",
    name: "",
    token: "",
    _id: ""
 });

export function getUserId() {
  return loggedInUser._id;
}

export const currentVenues = $state({ venues: [] as Venue[] });
export const currentVenueTypes = $state({ venueTypes: [] as VenueType[] });

export const currentDataSets = $state({
 totalByMethod: {
    labels: ["cash", "card"],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  },

  venuesByVenueType: {
    labels: [],
    datasets: [
      {
        values: [0, 0]
      }
    ]
  }
})


