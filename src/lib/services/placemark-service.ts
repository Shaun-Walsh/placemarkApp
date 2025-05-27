import axios from "axios";
import type { Session, User, Venue, VenueType } from "$lib/types/placemark-types";
import { loggedInUser, currentVenueTypes, currentVenues } from "$lib/runes.svelte";
import { computeByMethod, computeByVenueType } from "./placemark-utils";

export const placemarkService = {
  baseUrl: "http://localhost:3000",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        this.saveSession(session, email);
        await this.refreshVenueInfo();
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  saveSession(session: Session, email: string) {
    loggedInUser.email = email;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;
    localStorage.placemark = JSON.stringify(loggedInUser);
  },

   
async getVenueTypes(token: string): Promise<VenueType[]> {
  try {
    if (!token) {
      console.error("No token provided");
      return [];
    }
    
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const response = await axios.get(`${this.baseUrl}/api/venueTypes`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
},


async addVenue(venue: Venue, venueTypeId: string, token: string): Promise<boolean> {
  try {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const response = await axios.post(`${this.baseUrl}/api/venueTypes/${venueTypeId}/venues`, venue);
        await this.refreshVenueInfo();
    return response.status == 200 || response.status == 201;
  } catch (error) {
    console.log(error);
    return false;
  }
},

  async getVenues(token: string): Promise<Venue[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(this.baseUrl + "/api/venues");
      return response.data;
    } catch (error) {
    console.log(error)
      return [];
    }
  }, 

   async refreshVenueInfo() {
    if (loggedInUser.token) {
    currentVenues.venues = await this.getVenues(loggedInUser.token);
    currentVenueTypes.venueTypes = await this.getVenueTypes(loggedInUser.token);
    computeByMethod(currentVenues.venues);
    computeByVenueType(currentVenues.venues, currentVenueTypes.venueTypes);
    }
  },

  async restoreSession() {
    const savedLoggedInUser = localStorage.placemark;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
    }
    await this.refreshVenueInfo();
  },

  clearSession() {
    currentVenues.venues = [];
    currentVenueTypes.venueTypes = [];
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    localStorage.removeItem("placemark");
  },

  async uploadImage(imageFile: File, token: string): Promise<string | null> {
  try {
    console.log("Service: Starting upload...");
    const formData = new FormData();
    formData.append("imagefile", imageFile);
    
    const response = await axios.post(`${this.baseUrl}/api/images/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    
    console.log("Service: Full response:", response.data);
    const imageUrl = response.data.url;
    console.log("Service: Extracted URL:", imageUrl);
    
    return imageUrl;
  } catch (error) {
    console.error("Service: Upload error:", error);
    return null;
  }
},

async deleteImage(imageId: string, token: string): Promise<boolean> {
  try {
    console.log("Service: Deleting image:", imageId);
    const response = await axios.delete(`${this.baseUrl}/api/images/${imageId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Service: Delete response:", response.status);
    return response.status === 204;
  } catch (error) {
    console.error("Service: Delete error:", error);
    return false;
  }
},

async updateVenue(venue: Venue, token: string): Promise<boolean> {
  try {
    console.log("Service: Updating venue:", venue._id);
    const response = await axios.put(`${this.baseUrl}/api/venues/${venue._id}`, venue, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Service: Update response:", response.status);
    await this.refreshVenueInfo();
    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error("Service: Update venue error:", error);
    return false;
  }
},

async clearVenueImage(venueId: string, token: string): Promise<boolean> {
  try {
    console.log("Service: Clearing venue image:", venueId);
    const response = await axios.delete(`${this.baseUrl}/api/venues/${venueId}/image`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Service: Clear image response:", response.status);
    return response.status === 200;
  } catch (error) {
    console.error("Service: Clear venue image error:", error);
    return false;
  }
}
};
