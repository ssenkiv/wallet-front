export interface Account {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updateAt: Date;
  profilePictureUrl?: string;
  password: string
}