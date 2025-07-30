'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleAuth = async () => {
      const { error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth error:', error.message);
        return;
      }

      // User is logged in, redirect to homepage
      router.replace('/dashboard');
    };

    handleAuth();
  }, [router]);

  return <p className="p-6 text-center">Logging you in...</p>;
}
