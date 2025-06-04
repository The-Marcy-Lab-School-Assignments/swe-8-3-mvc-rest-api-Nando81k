const Book = require('../models/Book');

const getBooks = (req, res) => {
  try {
    const books = Book.findAll();
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Server error fetching books' });
  }
};

const getBook = (req, res) => {
  const book = Book.find(Number(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json(book);
};

const createBook = (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }
    const newBook = Book.create({ title, author });
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(500).json({ error: 'Server error creating book' });
  }
};

const updateBook = (req, res) => {
  const { title, author } = req.body;
  const updated = Book.edit(Number(req.params.id), title, author);
  if (!updated) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json(updated);
};

const deleteBook = (req, res) => {
  const deleted = Book.delete(Number(req.params.id));
  if (!deleted) return res.status(404).json({ message: 'Book not found' });
  res.sendStatus(204);
};

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };
