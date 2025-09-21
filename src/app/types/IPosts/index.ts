export interface IAuthor {
  _id: string;
  fullName?: string;
  image?: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
}
export interface IPosts {
  _id: string;
  content: string;
  title: string;
  views: number;
  summary: string;
  slug: string;
  thumbnail: string;
  category: ICategory;
  author: IAuthor;
  publishedAt: Date;
}

export interface RecentPostProps {
  posts: IPosts[];
}