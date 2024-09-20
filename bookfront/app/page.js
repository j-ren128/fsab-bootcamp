import BookShelf from "./components/BookShelf";
import BookForm from "./components/NewBook"


export default function Home() {
  
  return (
    <div>
      <BookShelf />
      <hr />
      <BookForm/>
    </div>
  );
}
