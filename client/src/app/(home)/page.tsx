import Banner from "@/components/home/Banner";
import BookList from "@/components/home/BookList";

export default async function Home() {
  // fetch book data
  const response = await fetch(`${process.env.BACK_END}/books/getBooks`);

  if (!response.ok) {
    throw new Error("An Error occurred while fetching the books!");
  }

  const books = await response.json();

  console.log("asds", books.data);

  return (
    <main>
      <div className="my-3">
        <Banner />
      </div>
      <div className="my-3">
        <BookList books={books.data} />
      </div>
    </main>
  );
}
