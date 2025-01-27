import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Call your API orchestration endpoint
    const response = await fetch('YOUR_API_ORCHESTRATION_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to submit feedback to API orchestration');
    }

    const data = await response.json();

    return NextResponse.json(
      { message: 'Feedback submitted successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { message: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}
