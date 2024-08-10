export interface IPostForm {
  title: string;
  content: string;
  cover: any;
  address: string;
  latitude: string;
  longitude: string;
  city: string;
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
  isActice: boolean;
  status: "draft" | "published";
}
