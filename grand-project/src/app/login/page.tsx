'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setMessage('❌ Failed to send magic link. Please try again.')
    } else {
      setMessage('✅ Magic link sent! Check your inbox.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#fdf0f0] via-[#f3e8ff] to-[#e0f2fe] px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 sm:p-12 max-w-lg w-full animate-fade-in">
        <h1 className="text-4xl font-bold text-center text-[#7c3aed] mb-2 tracking-tight drop-shadow-md">
          Tailor Your Future Today 
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Start crafting your dream career with just one click.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-purple-200 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none text-sm transition"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            Send Magic Link
          </button>
        </form>

        {message && (
          <p className="text-sm text-center mt-4 text-green-600 font-medium animate-pulse">
            {message}
          </p>
        )}

        <div className="text-center mt-8 text-gray-400 text-xs">
          🚀 Powered by <span className="font-semibold text-indigo-500">Resume Tailor</span>
        </div>
      </div>
    </div>
  )
}
