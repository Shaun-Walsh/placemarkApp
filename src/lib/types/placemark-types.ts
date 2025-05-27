export interface Session {
  name: string;
  _id: string;
  token: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
}

export interface VenueType {
  title: string;
  _id?: string;
  userid?: string;  // ID of the user who created this venue type
  __v?: number;     // MongoDB's internal version field
}

export interface Venue {
  title: string;
  type: string;
  contact: string | number;
  lat: number;
  long: number;
  description: string;
  payment: string;
  imageUrl: string;
  venuetypeid: string;  // Changed from venueType
  _id?: string;
  _v?: number;
}

export interface DataSet {
  labels: string[];
  datasets: [{ values: number[] }];
}

