import axios from "axios";
import type { Session, User, Venue, VenueType } from "$lib/types/placemark-types";
import { loggedInUser, currentVenueTypes, currentVenues } from "$lib/runes.svelte";

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

};
