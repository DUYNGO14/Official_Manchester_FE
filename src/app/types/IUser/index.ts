export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  age: number;
  gender: string;
  accountType: string;
  createdAt: string;
  updatedAt: string;
  avatar?: IAvatar | null;
  number?: string
}

export interface IUserUpdatePayload {
  fullname?: string;
  age?: number;
  gender?: string;
  avatar?: File | null;
}

export interface IAvatar {
  url: string;
  publicId: string;
}
