export interface IPostForm {
  title: string;
  content: string;
  cover: any; // File input for the cover image
  address: string;
  latitude: string;
  longitude: string;
  city: string;
  workingTime?: string; // Optional field for working hours
  contactNumber?: string; // Optional field for contact number
  instagramId?: string; // Optional field for Instagram ID
}

export interface IPost {
  city: string;
  id: number;
  title: string;
  content: string | null;
  cover: string | null;
  createdAt: Date;
  updatedAt: Date;
  address: string;
  latitude: string;
  longitude: string;
  isActive: boolean;
  status: "draft" | "published";
  workingTime?: string; // Optional field for working hours
  contactNumber?: string; // Optional field for contact number
  instagramId?: string; // Optional field for Instagram ID
}
