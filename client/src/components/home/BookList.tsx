import { BookType } from "@/types";
import React from "react";
import BookCard from "./BookCard";

const BookList = ({ books }: { books: BookType[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 ">
      {books.map((item) => (
        <BookCard item={item} key={item._id} />
      ))}
    </div>
  );
};

export default BookList;
