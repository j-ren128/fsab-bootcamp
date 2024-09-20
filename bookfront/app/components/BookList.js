export default function BookList({ books, onDelete }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Book Name</th>
            <th>ISBN-13</th>
            <th>Date Added</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.author}</td>
              <td>{book.bookName}</td>
              <td>{book.isbn13}</td>
              <td>{new Date(book.timeAdded).toLocaleString()}</td>
              <td>
                <button onClick={() => onDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  