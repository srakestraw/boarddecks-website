'use client';

import { useState } from 'react';

export default function EarlyAccessForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setErrorMessage('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setErrorMessage('Last name is required');
      return false;
    }
    if (!formData.company.trim()) {
      setErrorMessage('Company is required');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Determine if we're in development or production
      const isDevelopment = typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1'
      );

      let response;
      
      if (isDevelopment) {
        // Mock response for local development
        console.log('🌐 Development: Using mock response');
        response = { success: true };
      } else {
        // Production: Call Netlify Function
        console.log('🌐 Production: Sending to Netlify Function');
        response = await fetch('/.netlify/functions/early-access', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            company: formData.company.trim(),
            email: formData.email.trim()
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        response = await response.json();
        console.log('🌐 Production: Response received:', response);
      }

      if (response.success) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          email: ''
        });
        
        // Reset form
        try {
          if (e.currentTarget) {
            e.currentTarget.reset();
          }
        } catch (resetError) {
          console.log('⚠️ Form reset error (non-critical):', resetError);
        }
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('🌐 Production: Network Error:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {submitStatus === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-green-600 text-lg font-semibold mb-2">Thank you!</div>
          <p className="text-green-700">We've received your early access request. We'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                autoComplete="given-name"
                data-form-type="other"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-dark-navy"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                autoComplete="family-name"
                data-form-type="other"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-dark-navy"
                placeholder="Last Name"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Company *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              autoComplete="organization"
              data-form-type="other"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-dark-navy"
              placeholder="Company"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              data-form-type="other"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-dark-navy"
              placeholder="Email"
            />
          </div>

          {errorMessage && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Request Early Access'}
          </button>
        </form>
      )}
    </div>
  );
} 