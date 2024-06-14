import DownloadBook from "@/components/DownloadBook";
import { BookType } from "@/types";
import Image from "next/image";
import React from "react";

const SingleBookDetails = async ({
  params,
}: {
  params: { bookId: string };
}) => {
  let book: BookType | null = null;
  try {
    let response = await fetch(
      `${process.env.BACK_END}/books/getBook/${params.bookId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get data");
    }

    let data = await response.json();
    book = data?.data[0];
  } catch (error) {
    console.log("Error Fetching book by id", error);
  }

  return (
    <div className="flex items-center justify-between max-w-5xl mx-auto">
      <div className="left flex flex-col gap-2 mt-3">
        <h1 className="text-3xl text-orange-600 font-semibold ">
          {book?.title}{" "}
        </h1>
        <h2 className="text-xl">by - {book?.author?.name} </h2>
        <h2 className="text-lg">Genre - {book?.genre} </h2>
        <DownloadBook fileUrl={book?.file} />
      </div>
      <div className="right">
        <Image
          src={book?.coverImage as string}
          width={0}
          height={200}
          sizes="100vw"
          alt="cover-image"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default SingleBookDetails;
