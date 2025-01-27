'use client';

import React, { useState } from 'react';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    rating: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '8px'
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

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>Customer Feedback</h1>
        
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
                    color: star <= formData.rating ? '#fbbf24' : '#e5e7eb'
                  }}
                  aria-label={`Rate ${star} stars`}
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
            />
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#1d4ed8';
            }}
            onMouseOut={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = '#2563eb';
            }}
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
