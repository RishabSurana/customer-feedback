'use client';

import React, { useState } from 'react';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    rating: 5
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          feedback: formData.message,
          rating: formData.rating
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setStatus({
        type: 'success',
        message: 'Thank you for your feedback!'
      });

      // Reset form
      setFormData({
        email: '',
        message: '',
        rating: 5
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to submit feedback. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  };

  const formContainerStyle = {
    width: '100%',
    maxWidth: '500px',
    padding: '32px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '24px',
    textAlign: 'center' as const
  };

  const inputContainerStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#374151'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.2s',
    outline: 'none'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical' as const
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    opacity: isSubmitting ? 0.7 : 1,
    transition: 'background-color 0.2s, opacity 0.2s'
  };

  const ratingContainerStyle = {
    display: 'flex',
    gap: '12px',
    marginTop: '8px'
  };

  const starButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '32px',
    cursor: 'pointer',
    padding: '0',
    lineHeight: '1',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none'
  };

  const statusMessageStyle = {
    padding: '12px',
    marginBottom: '20px',
    borderRadius: '8px',
    textAlign: 'center' as const,
    backgroundColor: status.type === 'success' ? '#ecfdf5' : '#fef2f2',
    color: status.type === 'success' ? '#065f46' : '#991b1b'
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>Customer Feedback</h1>
        
        {status.type && (
          <div style={statusMessageStyle}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={inputStyle}
              required
              placeholder="your@email.com"
              disabled={isSubmitting}
            />
          </div>

          <div style={inputContainerStyle}>
            <label style={labelStyle}>
              Rating
            </label>
            <div style={ratingContainerStyle}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  style={{
                    ...starButtonStyle,
                    color: star <= formData.rating ? '#fbbf24' : '#e5e7eb',
                  }}
                  aria-label={`Rate ${star} stars`}
                  disabled={isSubmitting}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div style={inputContainerStyle}>
            <label style={labelStyle}>
              Your Feedback
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={textareaStyle}
              required
              placeholder="Please share your thoughts..."
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            style={buttonStyle}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}
