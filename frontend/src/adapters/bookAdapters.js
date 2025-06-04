import handleFetch from './handleFetch';

export const getAllBooks = async () => handleFetch('/api/books/');
export const getBookById = async (id) => handleFetch(`/api/books/${id}`);
export const createBook = async (title, author) => {
  return handleFetch(`/api/books/`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ title, author }),
  });
};
export const deleteBook = async (id) =>
  handleFetch(`/api/books/${id}`, { method: 'DELETE' });
export const updateBook = async (id, title, author) => {
  return handleFetch(`/api/books/${id}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ title, author }),
  });
};
