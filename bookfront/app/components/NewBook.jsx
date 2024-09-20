'use client'
import { useState, useEffect } from "react"
import {Timestamp, serverTimestamp} from 'firebase/firestore';
import classes from "./new-book-styles.modules.css";

export default function BookForm({ onSubmit }) {
  const [book, setBook] = useState({
    author: "",
    bookName: "",
    isbn13: "",
    date:"",
    time:"",
    username:""
  });

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:8080/bookshelf");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);


  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const timestamp = serverTimestamp();
    const newBook = { ...book, timeAdded: Timestamp.now() };

    try {
        await fetch("http://localhost:8080/bookshelf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        });


        setBook({ author: "", bookName: "", isbn13: "" });
        refreshBooks();
    } catch (e) {
        console.error(e)
    }
  };

  return (
    <form onSubmit={handleSubmit} className = {classes.mainform}>
    <div>
        <label>Title: </label>
        <input
          type="text"
          name="bookName"
          value={book.bookName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Author: </label>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>ISBN-13: </label>
        <input
          type="text"
          name="isbn13"
          value={book.isbn13}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
}
