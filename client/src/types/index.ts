export type BookType = {
  _id: string;
  title: string;
  author: Author;
  coverImage: string;
  file: string;
  genre: string;

};

export type Author = {
  _id: string;
  name: string;
  email: string;
};
