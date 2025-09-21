export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  accountType: string;
  createdAt: string;
  updatedAt: string;
  avatar?: IAvatar | null;
  number?: string
}

export interface IAvatar {
  url: string;
  publicId: string;
}
