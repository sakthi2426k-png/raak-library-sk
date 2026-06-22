'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function StudentPortal() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState(''); // New state for search input

  async function fetchBooks() {
    const { data } = await supabase.from('books').select('*');
    setBooks(data || []);
  }

  useEffect(() => { fetchBooks(); }, []);

  // Filter books based on search input
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  async function requestBorrow(book) {
    const studentName = prompt("Enter your Name:");
    if (!studentName) return;
    const department = prompt("Enter your Department:");
    if (!department) return;
    const year = prompt("Enter your Year:");
    if (!year) return;

    const { error: transError } = await supabase.from('transactions').insert([{ 
      book_id: book.id, student_name: studentName, department, year, status: 'Borrowed' 
    }]);

    const { error: updateError } = await supabase.from('books').update({ status: 'Borrowed' }).eq('id', book.id);

    if (transError || updateError) alert("Error borrowing book.");
    else { alert("Book borrowed!"); fetchBooks(); }
  }

  async function returnBook(bookId) {
    const { error: updateError } = await supabase.from('books').update({ status: 'Available' }).eq('id', bookId);
    const { error: deleteError } = await supabase.from('transactions').delete().eq('book_id', bookId);

    if (updateError || deleteError) alert("Error returning book.");
    else { alert("Book returned!"); fetchBooks(); }
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Student Book Catalog</h1>
      
      {/* Search Input */}
      <input 
        type="text"
        placeholder="Search for a book..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-6"
      />

      <div className="grid gap-4">
        {filteredBooks.map(book => (
          <div key={book.id} className="border p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold">{book.title}</h3>
              <p>Status: {book.status}</p>
            </div>
            {book.status === 'Available' ? (
              <button onClick={() => requestBorrow(book)} className="bg-green-600 text-white px-4 py-2 rounded">Borrow</button>
            ) : (
              <button onClick={() => returnBook(book.id)} className="bg-red-600 text-white px-4 py-2 rounded">Return</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}