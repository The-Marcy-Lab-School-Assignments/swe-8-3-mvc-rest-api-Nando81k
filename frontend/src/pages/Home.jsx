import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getAllBooks, createBook } from '../adapters/bookAdapters';
import '../styles/Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newlyAddedBook, setNewlyAddedBook] = useState({})

  useEffect(() => {
    const doFetch = async () => {
      const [allBooks, error] = await getAllBooks()
      setBooks(allBooks || []); // Fallback to empty array if null
    }
    doFetch();
  }, [newlyAddedBook])

  const handleCreateBook = async (e) => {
    e.preventDefault();
    const [newBook, error] = await createBook(newBookTitle, newBookAuthor)
    setNewlyAddedBook(newBook);
    setNewBookTitle('');
    setNewBookAuthor('');
  }

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={handleCreateBook}>
        <label htmlFor="title">Book Title</label>
        <input type="text" name="title" id="title" value={newBookTitle} onChange={(e) => setNewBookTitle(e.target.value)} />
        <label htmlFor="author">Author</label>
        <input type="text" name="author" id="author" value={newBookAuthor} onChange={(e) => setNewBookAuthor(e.target.value)} />
        <button type="submit">Add Book</button>
      </form>
      <ul>
        {
          books.map((book) => (
            <li key={book.id}>
              <div className="book-title">{book.title}</div>
              <div className="book-author">by {book.author}</div>
              <Link className="book-link" to={`/books/${book.id}`}>View Details</Link>
            </li>
          ))
        }
      </ul >
    </>
  )
}

export default Home;