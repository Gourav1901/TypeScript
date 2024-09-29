// src/FeedbackForm.tsx
import React, { useState } from 'react';

// Define the types for the form state
interface FeedbackFormState {
  name: string;
  email: string;
  rating: number;
  feedback: string;
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackFormState>({
    name: '',
    email: '',
    rating: 0,
    feedback: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!formData.name || !formData.email || !formData.rating || !formData.feedback) {
      setError('Please fill out all fields.');
      return;
    }

    // Show confirmation message
    setSubmitted(true);

    // Clear form after submission
    setFormData({ name: '', email: '', rating: 0, feedback: '' });
  };

  return (
    <div>
      <h1>Feedback Form</h1>
      {submitted ? (
        <div>
          <h2>Thank you for your feedback!</h2>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Rating: {formData.rating}</p>
          <p>Feedback: {formData.feedback}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Rating (1-5):</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={formData.rating || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Feedback:</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
