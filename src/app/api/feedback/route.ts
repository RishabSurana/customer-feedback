import { NextResponse } from 'next/server';

const FEEDBACK_API = 'https://dev11-app.csnonprod.com/automations-api/apiorchestration/89f2f276f3ab4983a0216dea6a8bee1b/feedbacks';

export async function GET() {
  try {
    const response = await fetch(FEEDBACK_API, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 } // Disable cache to always get fresh data
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
