'use client'
import { useEffect, useState } from "react"
import classes from "./book-shelf-styles-module.css"

function BookShelf(){
    const [books, setBooks] = useState([])
    async function getAllBooks(){
        const bookinfo = await fetch ("http://localhost:8080/bookshelf")
        const bookinfoJSON = await bookinfo.json()
        setBooks(bookinfoJSON)
    }


    useEffect(() => {
        getAllBooks()
    }, [])

    return (
        <div>
            <h2>Book Shelf</h2>
            <button onClick = {getAllBooks}>
                Refresh
            </button>
            <br/>
            <br/>
            <table className={classes.table}>
                <tbody >
                <tr className={classes.row}>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>From</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            {
                books.map((book) =>
                    <tr key={book.id} className={classes.row}>
                        <td>{book.bookName}</td>
                        <td>{book.author}</td>
                        <td>{book.isbn13}</td>
                        <td>{book.username}</td>
                        <td>{book.date}</td>
                        <td>{book.time}</td>
                    </tr>
                )
            }
                </tbody>
            </table>
        </div>
    )
}

export default BookShelf;