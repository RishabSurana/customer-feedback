import { NextResponse } from 'next/server';

const FEEDBACK_API = 'https://dev11-automations-cf-api.csnonprod.com/apiorchestration/adc941d504d341feafca51d7e2ebd931/feedbacks';


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
