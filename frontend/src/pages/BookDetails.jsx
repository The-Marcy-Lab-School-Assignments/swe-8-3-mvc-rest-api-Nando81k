import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBookById, updateBook, deleteBook } from '../adapters/bookAdapters';
import '../styles/BookDetails.css';

const BookDetails = () => {
  const [book, setBook] = useState({})
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      const [foundBook, error] = await getBookById(id);
      setBook(foundBook);
    };
    doFetch();
  }, [id])

  const handleDeleteBook = async () => {
    await deleteBook(id);
    navigate('/');
  }

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    const [updatedBook, error] = await updateBook(id, newBookTitle, newBookAuthor);
    setBook(updatedBook);
    setNewBookTitle('');
    setNewBookAuthor('');
  }

  return (
    <div className="book-details-outer">
      <div className="book-details-card">
        <div className="book-details-header">
          <Link to="/" className="book-details-link-btn">
            ← Back to Home
          </Link>
          <h2 className="book-details-title">{book.title}</h2>
          <div className="book-details-author">by {book.author}</div>
          <div className="book-details-id">ID: {book.id}</div>
        </div>
        <form className="book-details-form" onSubmit={handleUpdateBook}>
          <label htmlFor="title">Update Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            placeholder='New Title'
          />
          <label htmlFor="author">Update Author</label>
          <input
            type="text"
            name="author"
            id="author"
            value={newBookAuthor}
            onChange={(e) => setNewBookAuthor(e.target.value)}
            placeholder='New Author'
          />
          <button type="submit">Update</button>
        </form>
        <button onClick={handleDeleteBook} className='book-details-delete'>Delete Book</button>
      </div>
    </div>
  )
}

export default BookDetails;