'use client'

import { useState, useRef, useEffect } from 'react'
import Header from '@/components/Header'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [selectedAudience, setSelectedAudience] = useState<'firm' | 'company'>('firm')
  const [isClient, setIsClient] = useState(false)
  
  // Ensure client-side rendering for interactive elements
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Auto-scroll to content section when audience is selected
  useEffect(() => {
    if (isClient && selectedAudience) {
      const contentSection = document.getElementById('content-section')
      if (contentSection) {
        contentSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    }
  }, [selectedAudience, isClient])
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
          
          {/* Choose Your Path */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-darkNavy mb-6">
              Choose Your Path
            </h2>


            
            {isClient && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    console.log('Button clicked: Setting audience to firm')
                    setSelectedAudience('firm')
                    console.log('State updated to firm')
                    // Auto-scroll to content after a brief delay to ensure DOM update
                    setTimeout(() => {
                      const contentSection = document.getElementById('content-section')
                      if (contentSection) {
                        contentSection.scrollIntoView({ 
                          behavior: 'smooth', 
                          block: 'start' 
                        })
                      }
                    }, 100)
                  }}
                                                className={`px-8 py-4 rounded-lg font-medium transition-all duration-200 ${
                                selectedAudience === 'firm'
                                  ? 'bg-[#231e5a] text-white shadow-lg'
                                  : 'bg-gray-100 text-darkNavy hover:bg-gray-200'
                              }`}
                  aria-pressed={selectedAudience === 'firm'}
                  type="button"
                >
                  I'm a PE/VC Firm
                </button>
                <button
                  onClick={() => {
                    console.log('Button clicked: Setting audience to company')
                    setSelectedAudience('company')
                    console.log('State updated to company')
                    // Auto-scroll to content after a brief delay to ensure DOM update
                    setTimeout(() => {
                      const contentSection = document.getElementById('content-section')
                      if (contentSection) {
                        contentSection.scrollIntoView({ 
                          behavior: 'smooth', 
                          block: 'start' 
                        })
                      }
                    }, 100)
                  }}
                                                className={`px-8 py-4 rounded-lg font-medium transition-all duration-200 ${
                                selectedAudience === 'company'
                                  ? 'bg-[#231e5a] text-white shadow-lg'
                                  : 'bg-gray-100 text-darkNavy hover:bg-gray-200'
                              }`}
                  aria-pressed={selectedAudience === 'company'}
                  type="button"
                >
                  I'm a Portfolio Company
                </button>
              </div>
            )}
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
                    className="w-full bg-[#231e5a] text-white rounded-lg px-6 py-3 hover:bg-[#1a1645] transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Early Access'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>





      {/* The Problem Section - Conditional based on audience */}
      {isClient && selectedAudience === 'firm' && (
        <section id="content-section" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-4">
              <span className="inline-block bg-[#231e5a] text-white px-4 py-2 rounded-full text-sm font-medium">
                🎯 PE/VC Firms View
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-10">
              You don't get answers—just decks
            </h2>
            <p className="text-lg md:text-xl text-darkNavy text-center mb-16 max-w-3xl mx-auto">
              Board meetings are reactive, not strategic.
            </p>

            <ul className="space-y-8 max-w-4xl mx-auto">
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    Inconsistent reporting formats across portfolio companies
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    Manual data aggregation from dozens of different systems
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    No standardized KPIs across your portfolio
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    Spending hours on reports that are outdated by board meetings
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      )}

      {isClient && selectedAudience === 'company' && (
        <section id="content-section" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-4">
              <span className="inline-block bg-[#231e5a] text-white px-4 py-2 rounded-full text-sm font-medium">
                🏢 Portfolio Companies View
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-10">
              You lose time every month
            </h2>
            <p className="text-lg md:text-xl text-darkNavy text-center mb-16 max-w-3xl mx-auto">
              Building slides, reconciling numbers, and answering 'Can we trust this?'
            </p>

            <ul className="space-y-8 max-w-4xl mx-auto">
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    Manually pulling data from Salesforce, NetSuite, Jira, and more
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    Formatting dozens of slides from scratch every quarter
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    Explaining inconsistent or questionable numbers to your board
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    Spending hours on something that will be outdated in a week
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* Our Solution Section - Conditional based on audience */}
      {isClient && selectedAudience === 'firm' && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-10">
              A living board deck that aligns every company
            </h2>
            <p className="text-lg md:text-xl text-darkNavy text-center mb-16 max-w-3xl mx-auto">
              To your metrics, data, and operating model.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#231e5a] rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-darkNavy">Portfolio-wide metrics</h3>
                </div>
                <p className="text-darkNavy leading-relaxed">
                  Standardized KPIs and reporting formats across all portfolio companies.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#231e5a] rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-darkNavy">Standardized templates</h3>
                </div>
                <p className="text-darkNavy leading-relaxed">
                  Consistent board deck formats and operating models across your portfolio.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#231e5a] rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-darkNavy">Cross-company benchmarking</h3>
                </div>
                <p className="text-darkNavy leading-relaxed">
                  Compare performance and metrics across your entire portfolio in real-time.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#231e5a] rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-darkNavy">Real-time monitoring</h3>
                </div>
                <p className="text-darkNavy leading-relaxed">
                  Live dashboards with alerts and notifications across your portfolio.
                </p>
              </div>
            </div>


          </div>
        </section>
      )}

      {isClient && selectedAudience === 'company' && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-10">
              One place to sync data, validate metrics
            </h2>
            <p className="text-lg md:text-xl text-darkNavy text-center mb-16 max-w-3xl mx-auto">
              And automate the slide-building chaos.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#231e5a] rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-darkNavy">Integrations</h3>
                </div>
                <p className="text-darkNavy leading-relaxed">
                  Salesforce, HubSpot, NetSuite, and more. Your data flows automatically into beautiful, branded slides.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#231e5a] rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-darkNavy">AI-powered validation</h3>
                </div>
                <p className="text-darkNavy leading-relaxed">
                  Churn and forecast validation with ML models. Catch issues before your board does.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#231e5a] rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-darkNavy">Operational review automation</h3>
                </div>
                <p className="text-darkNavy leading-relaxed">
                  Automated slide generation and operational review processes. Focus on outcomes, not formatting.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#231e5a] rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-darkNavy">Trusted numbers</h3>
                </div>
                <p className="text-darkNavy leading-relaxed">
                  Cross-functional, real-time, and explainable. Every number has a story your board can trust.
                </p>
              </div>
            </div>

            {/* Secondary CTA */}
            <div className="text-center mt-12">
              <button className="bg-white text-[#231e5a] border-2 border-[#231e5a] rounded-lg px-8 py-3 hover:bg-[#231e5a] hover:text-white transition-colors duration-200 font-medium">
                Automate board prep and focus on outcomes. Request early access.
              </button>
            </div>
          </div>
        </section>
      )}

      {/* What You Get Section - Conditional based on audience */}
      {isClient && selectedAudience === 'firm' && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center mb-12">
              What You Get
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              <article className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center w-16 h-16 bg-[#231e5a] rounded-full mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-darkNavy text-center mb-3">
                  Portfolio Visibility
                </h3>
                <p className="text-darkNavy text-base leading-relaxed text-center">
                  Real-time insights across all portfolio companies in one unified dashboard.
                </p>
              </article>

              <article className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center w-16 h-16 bg-[#231e5a] rounded-full mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-darkNavy text-center mb-3">
                  Standardized KPIs
                </h3>
                <p className="text-darkNavy text-base leading-relaxed text-center">
                  Consistent metrics and reporting formats across your entire portfolio.
                </p>
              </article>

              <article className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center w-16 h-16 bg-[#231e5a] rounded-full mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-darkNavy text-center mb-3">
                  Early Warning System
                </h3>
                <p className="text-darkNavy text-base leading-relaxed text-center">
                  AI-powered alerts for portfolio risks and opportunities before they impact performance.
                </p>
              </article>

              <article className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center w-16 h-16 bg-[#231e5a] rounded-full mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-darkNavy text-center mb-3">
                  Time Back
                </h3>
                <p className="text-darkNavy text-base leading-relaxed text-center">
                  Automated data collection and reporting. Focus on value creation, not data wrangling.
                </p>
              </article>

              <article className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center w-16 h-16 bg-[#231e5a] rounded-full mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-darkNavy text-center mb-3">
                  Portfolio Company Health Card
                </h3>
                <p className="text-darkNavy text-base leading-relaxed text-center mb-2">
                  Instantly surface which businesses need your attention — based on product usage, financial performance, support trends, and engagement scores.
                </p>
                <p className="text-sm text-gray-600 text-center italic">
                  Know where you need to focus. No spreadsheets. No guesswork.
                </p>
              </article>
            </div>
          </div>
        </section>
      )}

      {isClient && selectedAudience === 'company' && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center mb-12">
              What You Get
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <article className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center w-16 h-16 bg-[#231e5a] rounded-full mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-darkNavy text-center mb-3">
                  Time Back
                </h3>
                <p className="text-darkNavy text-base leading-relaxed text-center">
                  No more slide formatting or last-minute updates. Focus on what matters most.
                </p>
              </article>

              <article className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center w-16 h-16 bg-[#231e5a] rounded-full mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-darkNavy text-center mb-3">
                  Trusted Forecasts
                </h3>
                <p className="text-darkNavy text-base leading-relaxed text-center">
                  Validated by cross-system ML models. Confident predictions your board can rely on.
                </p>
              </article>

              <article className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center w-16 h-16 bg-[#231e5a] rounded-full mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-darkNavy text-center mb-3">
                  Churn Visibility
                </h3>
                <p className="text-darkNavy text-base leading-relaxed text-center">
                  Proactive insight using NPS and usage data. Spot issues before they become problems.
                </p>
              </article>

              <article className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center w-16 h-16 bg-[#231e5a] rounded-full mb-4 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-darkNavy text-center mb-3">
                  Board Confidence
                </h3>
                <p className="text-darkNavy text-base leading-relaxed text-center">
                  Professional, data-driven presentations that build trust with your board.
                </p>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* Integrations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center mb-12">
            Works With What You Already Use
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-600 font-bold text-sm">SF</span>
              </div>
              <span className="text-sm text-darkNavy text-center">Salesforce</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-600 font-bold text-sm">HS</span>
              </div>
              <span className="text-sm text-darkNavy text-center">HubSpot</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-600 font-bold text-sm">NS</span>
              </div>
              <span className="text-sm text-darkNavy text-center">NetSuite</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-600 font-bold text-sm">QB</span>
              </div>
              <span className="text-sm text-darkNavy text-center">QuickBooks</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-600 font-bold text-sm">JR</span>
              </div>
              <span className="text-sm text-darkNavy text-center">Jira</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-600 font-bold text-sm">ZD</span>
              </div>
              <span className="text-sm text-darkNavy text-center">Zendesk</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-600 font-bold text-sm">AD</span>
              </div>
              <span className="text-sm text-darkNavy text-center">MS DevOps</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-600 font-bold text-sm">WD</span>
              </div>
              <span className="text-sm text-darkNavy text-center">Workday</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-600 font-bold text-sm">GS</span>
              </div>
              <span className="text-sm text-darkNavy text-center">Gainsight</span>
            </div>

            <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-gray-600 font-bold text-sm">MP</span>
              </div>
              <span className="text-sm text-darkNavy text-center">Mixpanel</span>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-darkNavy text-lg">
              And many more integrations coming soon...
            </p>
          </div>
        </div>
      </section>

      {/* Ready to Get Started Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-darkNavy">
              Request early access and be the first to use the living board deck built for modern PE-backed growth.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-darkNavy mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#231e5a] focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-darkNavy mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#231e5a] focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-darkNavy mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#231e5a] focus:border-transparent transition-colors duration-200"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-darkNavy mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#231e5a] focus:border-transparent transition-colors duration-200"
                  placeholder="Enter your email address"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#231e5a] text-white rounded-lg px-8 py-3 hover:bg-[#1a1645] transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Request Early Access'}
              </button>

              {submitMessage && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-center">
                    Thanks! We'll be in touch soon.
                  </p>
                </div>
              )}

              {submitError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-center">
                    {submitError}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

    </div>
  )
} 