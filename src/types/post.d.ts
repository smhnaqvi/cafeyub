export interface IPostForm {
  title: string;
  content: string;
  cover: any;
}

export interface IPost {
  id: number;
  title: string;
  content: string | null;
  cover: string | null;
  createdAt: Date;
  updatedAt: Date;
  isActice: boolean;
  status: "draft" | "published";
}
