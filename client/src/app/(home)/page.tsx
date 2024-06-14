import Banner from "@/components/home/Banner";
import BookList from "@/components/home/BookList";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <div className="my-3">
        <Banner />
      </div>

      <div className="my-3">
        <Suspense
          fallback={<div className="container mx-auto my-10">Loading...</div>}
        >
          <BookList />
        </Suspense>
      </div>
    </main>
  );
}
