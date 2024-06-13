import Image from "next/image";
import React from "react";
import Paperbg from "../../../public/paper-bg.jpg";
import book from "../../../public/book.png";

const Banner = () => {
  return (
    <div>
      <div className="w-full rounded-md relative ">
        <Image
          src={Paperbg}
          width={0}
          height={0}
          className="h-72 rounded-md w-full"
          alt="banner"
        />

        <div className=" absolute inset-0 h-full w-full bg-gray-900 bg-opacity-30 rounded-md">
          <Image
            src={book}
            alt="logo"
            className="absolute  object-contain  bottom-0 right-1 h-[17rem] "
            sizes="100vw"
          />
        </div>
        <h1
          className="absolute left-10 max-w-3xl text-white 
           top-1/2 -translate-y-1/2 text-5xl
           "
        >
          Connect, Share and Trade Your Favourite Reads...
        </h1>
      </div>
    </div>
  );
};

export default Banner;
