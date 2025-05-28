import { placemarkService } from "$lib/services/placemark-service";
import type { Session } from "$lib/types/placemark-types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const cookieStr = cookies.get("placemark-user") as string;
  if (cookieStr) {
    const session = JSON.parse(cookieStr) as Session;
    const venues = await placemarkService.getVenues(session.token);
    const venueTypes = await placemarkService.getVenueTypes(session.token);
    console.log(venues);
    console.log(venueTypes);
    return {
      venues, 
      venueTypes,
      session
    };
  }
};

export const actions = {
  addVenue: async ({ request, cookies }) => {
    const cookieStr = cookies.get("placemark-user") as string;
    if (cookieStr) {
      const session = JSON.parse(cookieStr) as Session;
      if (session) {
        const form = await request.formData();
        
        // Declare the variables to capture latitude and longitude, I had an issue here 
        const latStr = form.get("lat") as string;
        const longStr = form.get("long") as string;
        
        const venue = {
          title: form.get("title") as string,
          type: form.get("type") as string,
          contact: form.get("contact") as string,
          lat: parseFloat(latStr),
          long: parseFloat(longStr),
          description: form.get("description") as string,
          payment: form.get("payment") as string,
          venuetypeid: form.get("venuetypeid") as string,
          imageUrl: form.get("imageUrl") as string
        };
        
        console.log("Venue object:", venue); // Debug line
        
        const newVenue = await placemarkService.addVenue(venue, venue.venuetypeid, session.token);
        return newVenue;
      }
    }
  }
};