import axios from "axios";
import type { Session, User, Venue, VenueType } from "$lib/types/placemark-types";

export const placemarkService = {
 // baseUrl: "http://localhost:3000",
  baseUrl: "https://placemark-sl2m.onrender.com",

  // Function to sign up a new user
  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  // Function to log in a user
  async login(email: string, password: string): Promise<Session | null> {
  try {
    const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
    
    if (response.data.success) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      const session: Session = {
        name: response.data.name || response.data.user?.name || "User", 
        token: response.data.token,
        email: response.data.email || response.data.user?.email || email,
        _id: response.data._id || response.data.user?._id || response.data.id
      };

      return session;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
},

// Function to get the venue types
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

//Function to add a new venue
async addVenue(venue: Venue, venueTypeId: string, token: string): Promise<boolean> {
  try {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        const response = await axios.post(`${this.baseUrl}/api/venueTypes/${venueTypeId}/venues`, venue);
    return response.status == 200 || response.status == 201;
  } catch (error) {
    console.log(error);
    return false;
  }
},

// Function to get venues
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

  //Funnction to upload an image
  async uploadImage(imageFile: File, token: string): Promise<string | null> {
  try {
    console.log("Service: Starting upload...");
    console.log("File details:", {
      name: imageFile.name,
      size: imageFile.size,
      type: imageFile.type
    });
    
    const formData = new FormData();
    formData.append("imagefile", imageFile);
    
    const response = await axios.post(`${this.baseUrl}/api/images/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    
    const imageUrl = response.data.url;
    
    if (!imageUrl) {
      console.error("No URL in response data:", response.data);
    }
    
    return imageUrl;
  } catch (error) {
    console.error("Service: Upload error:", error);
    // @ts-expect-error remove squiggle
    if (error.response) {
      // @ts-expect-error remove squiggle
      console.error("Error response data:", error.response.data);
    }
    return null;
  }
},

//Function to delete an image
async deleteImage(imageId: string, token: string): Promise<boolean> {
  try {
    console.log("Service: Deleting image:", imageId);
    const response = await axios.delete(`${this.baseUrl}/api/images/${imageId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.status === 204;
  } catch (error) {
    console.error("Service: Delete error:", error);
    return false;
  }
},

// Function to update a venue
async updateVenue(venue: Venue, token: string): Promise<boolean> {
  try {
    const response = await axios.put(`${this.baseUrl}/api/venues/${venue._id}`, venue, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error("Service: Update venue error:", error);
    return false;
  }
},

//Function do clear the image of a venue
async clearVenueImage(venueId: string, token: string): Promise<boolean> {
  try {
    const response = await axios.delete(`${this.baseUrl}/api/venues/${venueId}/image`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.status === 200;
  } catch (error) {
    console.error("Service: Clear venue image error:", error);
    return false;
  }
}
};
