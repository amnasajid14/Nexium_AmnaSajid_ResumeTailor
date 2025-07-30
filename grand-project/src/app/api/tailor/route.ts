import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch('http://localhost:5678/webhook/resume-tailor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    // Check if response has content
    const text = await response.text();
    const data = text ? JSON.parse(text) : { error: 'No response from backend' };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in tailor route:', error);
    return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 });
  }
}
