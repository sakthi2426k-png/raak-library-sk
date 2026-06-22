'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Login failed: " + error.message);
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Staff Login</h1>
      <form onSubmit={handleLogin}>
        <input className="border p-2 w-full mb-2" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input className="border p-2 w-full mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-blue-600 text-white p-2 rounded w-full">Sign In</button>
      </form>
    </div>
  );
}