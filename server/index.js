const express = require('express');
const path = require('path');
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('./controllers/bookControllers');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/api/books', getBooks);
app.get('/api/books/', getBooks); // Handles trailing slash
app.get('/api/books/:id', getBook);
app.post('/api/books', createBook);
app.patch('/api/books/:id', updateBook);
app.delete('/api/books/:id', deleteBook);

app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
