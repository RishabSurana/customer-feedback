import { NextResponse } from 'next/server';

const FEEDBACK_API = 'https://dev11-app.csnonprod.com/automations-api/apiorchestration/89f2f276f3ab4983a0216dea6a8bee1b/feedbacks';


export async function GET() {
  try {
    const url = `${FEEDBACK_API}?t=${new Date().getTime()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
      throw new Error('Failed to fetch feedbacks');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks' },
      { status: 500 }
    );
  }
}
