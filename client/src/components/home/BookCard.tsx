import { BookType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BookCard = ({ item }: { item: BookType }) => {
  return (
    <div className="flex  gap-2 border p-2 shadow-md">
      <Image
        src={item.coverImage}
        alt={item.title}
        width={0}
        height={0}
        sizes="100vw "
        priority
        className="w-auto h-42"
      />
      <div className=" flex  flex-col">
        <h3 className="text-orange-600 text-lg truncate text-balance font-semibold line-clamp-2">
          {item.title}
        </h3>
        <h3 className="text-md">{item.author.name}</h3>
        <Link
          href={`/book/${item._id}`}
          className="hover:bg-orange-600/15
         text-orange-600
         p-1
         text-sm
          rounded-sm
        w-fit
        mt-2
         "
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
