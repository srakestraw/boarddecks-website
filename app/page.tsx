'use client'

import { useState, useRef } from 'react'
import Header from '@/components/Header'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const formRef = useRef<HTMLDivElement>(null)

  const handleRequestAccess = () => {
    setShowForm(true)
    setSubmitMessage('')
    setSubmitError('')
    // Auto-scroll to form after a brief delay
    setTimeout(() => {
      formRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }, 100)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    setSubmitError('')

    const formData = new FormData(event.currentTarget)
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string
    }

    try {
      const response = await fetch('/.netlify/functions/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitMessage('Thank you! Your early access request has been submitted successfully.')
        event.currentTarget.reset()
        setShowForm(false)
      } else {
        setSubmitError(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-8">
            Turn Hours of Board Prep into Instant Confidence
          </h1>
          <p className="text-xl md:text-2xl text-darkNavy max-w-3xl mx-auto mb-12">
            A living board deck that syncs your systems, validates your numbers, and gives your team time back.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button
              onClick={handleRequestAccess}
              aria-expanded={showForm}
              aria-controls="early-access-form"
              className="bg-[#6C2BD9] text-white rounded-lg px-6 py-3 hover:bg-[#5B24B8] transition-colors duration-200 font-medium"
            >
              Request Early Access
            </button>
            <button
              className="border border-[#6C2BD9] text-[#6C2BD9] bg-white hover:bg-[#F3EBFF] transition-colors duration-200 rounded-lg px-6 py-3 font-medium"
            >
              Book a Demo
            </button>
          </div>

          {/* Early Access Form - Hidden initially */}
          {showForm && (
            <div 
              ref={formRef}
              className="mt-8 transition-all duration-300 ease-in-out opacity-100 transform translate-y-0"
              id="early-access-form"
              role="region"
              aria-label="Early access signup form"
            >
              <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        minLength={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your first name"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        minLength={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company *
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      minLength={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Success Message */}
                  {submitMessage && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg" role="alert" aria-live="polite">
                      <p className="text-sm text-green-600">{submitMessage}</p>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="polite">
                      <p className="text-sm text-red-600">{submitError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#6C2BD9] text-white rounded-lg px-6 py-3 hover:bg-[#5B24B8] transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Early Access'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 