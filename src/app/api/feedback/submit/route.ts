import { NextResponse } from 'next/server';

const ORCHESTRATION_API = 'https://dev11-automations-cf-api.csnonprod.com/apiorchestration/a7ca0ce01da2473eae9960deffc40996/feedback/submit';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(ORCHESTRATION_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to submit feedback');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}
