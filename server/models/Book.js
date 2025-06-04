const getId = require('../utils/getId');

const books = [
  { id: getId(), title: '1984', author: 'George Orwell' },
  { id: getId(), title: 'The Hobbit', author: 'J.R.R. Tolkien' },
];

class Book {
  static create({ title, author }) {
    const newBook = { id: getId(), title, author };
    books.push(newBook);
    return newBook;
  }
  static find(id) {
    return books.find((book) => book.id === id);
  }
  static findAll() {
    return [...books];
  }
  static edit(id, title, author) {
    const book = Book.find(id);
    if (!book) return null;
    if (title) book.title = title;
    if (author) book.author = author;
    return book;
  }
  static delete(id) {
    const idx = books.findIndex((book) => book.id === id);
    if (idx < 0) return false;
    books.splice(idx, 1);
    return true;
  }
}

module.exports = Book;
