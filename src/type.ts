export interface IBook  {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean
  createdAt: string;
  updatedAt: string;
}