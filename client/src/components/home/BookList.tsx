import { BookType } from "@/types";
import React from "react";
import BookCard from "./BookCard";

const BookList = async () => {
  // fetch book data
  const response = await fetch(`${process.env.BACK_END}/books/getBooks`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("An Error occurred while fetching the books!");
  }

  const books = await response.json();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
      {books.data.map((item: BookType) => (
        <BookCard item={item} key={item._id} />
      ))}
    </div>
  );
};

export default BookList;
