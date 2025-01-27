'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Feedback {
  email: string;
  feedback: string;
  rating: number;
}

interface ApiResponse {
  statusCode: number;
  data: Feedback[];
}

export default function FeedbacksPage() {
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeedbacks();

    // Refresh data every 5 seconds
    const interval = setInterval(() => {
      fetchFeedbacks();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedback', {
        cache: 'no-store',
        next: { revalidate: 0 }
      });
      const data: ApiResponse = await response.json();

      if (data.statusCode === 200) {
        setFeedbacks(data.data);
      } else {
        throw new Error('Failed to fetch feedbacks');
      }
    } catch (err) {
      setError('Failed to load feedbacks. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatRating = (rating: number) => '⭐'.repeat(rating);

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          border: '4px solid #f3f4f6',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          width: '3rem',
          height: '3rem',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #ef4444',
          color: '#b91c1c',
          padding: '1rem',
          borderRadius: '0.5rem',
          maxWidth: '24rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '3rem 1rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Customer Feedbacks
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280'
          }}>
            All the valuable feedback we've received from our customers
          </p>
        </div>

        <div style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 24rem), 1fr))'
        }}>
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s ease',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#4f46e5',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {feedback.email}
                  </div>
                  <div style={{ fontSize: '1.25rem' }}>
                    {formatRating(feedback.rating)}
                  </div>
                </div>
                <p style={{
                  color: '#374151',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap'
                }}>
                  {feedback.feedback}
                </p>
              </div>
            </div>
          ))}
        </div>

        {feedbacks.length === 0 && (
          <div style={{
            textAlign: 'center',
            marginTop: '3rem',
            color: '#6b7280',
            fontSize: '1.125rem'
          }}>
            No feedbacks received yet.
          </div>
        )}
      </div>
    </div>
  );
}
