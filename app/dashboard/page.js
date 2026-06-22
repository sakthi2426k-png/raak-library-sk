'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function StaffDashboard() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [bookNo, setBookNo] = useState(''); // Added state for book number
  const [books, setBooks] = useState([]);

  async function fetchBooks() {
    const { data } = await supabase.from('books').select('*');
    setBooks(data || []);
  }

  useEffect(() => { fetchBooks(); }, []);

  async function addBook() {
    // Construct the data object
    const newBook = {
      title: title,
      author: author,
      status: 'Available'
    };

    // Only include book_no if it contains actual numbers/text
    // This prevents sending the empty string "" that triggers the error
    if (bookNo && bookNo.trim() !== "") {
      newBook.book_no = bookNo;
    }

    const { error } = await supabase
      .from('books')
      .insert([newBook]);

    if (error) {
      alert("Error adding book: " + error.message);
      console.error(error);
    } else {
      alert("Book added successfully!");
      setTitle('');
      setAuthor('');
      setBookNo('');
      fetchBooks();
    }
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>
      
      <div className="flex gap-4 mb-10">
        <input 
          placeholder="Book Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input 
          placeholder="Author" 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input 
          placeholder="Book No (Optional)" 
          value={bookNo}
          onChange={(e) => setBookNo(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button 
          onClick={addBook}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Current Books in Database:</h2>
      <ul>
        {books.map(book => (
          <li key={book.id} className="mb-2">
            {book.title} by {book.author} - <strong>Status: {book.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}