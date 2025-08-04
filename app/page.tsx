'use client'

import { useState, useRef, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [selectedAudience, setSelectedAudience] = useState<'firm' | 'company'>('firm')
  const [isClient, setIsClient] = useState(false)

  // Integration logos array
  const logos = [
    { name: "Salesforce", file: "salesforce.svg" },
    { name: "HubSpot", file: "hubspot.svg" },
    { name: "NetSuite", file: "netsuite.svg" },
    { name: "QuickBooks", file: "quickbooks.svg" },
    { name: "Jira", file: "jira.svg" },
    { name: "Zendesk", file: "zendesk.svg" },
    { name: "Azure DevOps", file: "azuredevops.svg" },
    { name: "Workday", file: "workday.svg" },
    { name: "Gainsight", file: "gainsight.svg" },
    { name: "Mixpanel", file: "mixpanel.svg" }
  ]
  
  // Ensure client-side rendering for interactive elements
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Auto-scroll to content section when audience is selected
  useEffect(() => {
    if (selectedAudience) {
      const contentSection = document.getElementById('content-section')
      if (contentSection) {
        contentSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    }
  }, [selectedAudience])
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
      // Always use Netlify Function in production, mock in development
      const isDevelopment = typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      
      if (isDevelopment) {
        // Mock successful response for local development
        console.log('📝 Local Development: Mocking successful submission')
        console.log('Data:', data)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setSubmitMessage('Thank you! Your early access request has been submitted successfully. (Local development mode)')
        // Safely reset the form
        try {
          if (event.currentTarget) {
            event.currentTarget.reset()
          }
        } catch (resetError) {
          console.log('Form reset error (non-critical):', resetError)
        }
        setShowForm(false)
        return
      }
      
      // Production: Use Netlify Function
      console.log('🌐 Production: Sending to Netlify Function')
      const response = await fetch('/.netlify/functions/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log('🌐 Production: Response received:', result)

      if (response.ok && result.success) {
        setSubmitMessage('Thank you! Your early access request has been submitted successfully.')
        // Safely reset the form
        try {
          if (event.currentTarget) {
            event.currentTarget.reset()
          }
        } catch (resetError) {
          console.log('Form reset error (non-critical):', resetError)
        }
        setShowForm(false)
      } else {
        console.error('🌐 Production: API Error:', result)
        setSubmitError(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('🌐 Production: Network Error:', error)
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


            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isClient ? (
                <>
                  <button
                    onClick={() => {
                      setSelectedAudience('firm')
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
                      setSelectedAudience('company')
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
                </>
              ) : (
                <>
                  <div className="px-8 py-4 rounded-lg font-medium bg-[#231e5a] text-white shadow-lg">
                    I'm a PE/VC Firm
                  </div>
                  <div className="px-8 py-4 rounded-lg font-medium bg-gray-100 text-darkNavy">
                    I'm a Portfolio Company
                  </div>
                </>
              )}
            </div>
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
                        autoComplete="given-name"
                        data-form-type="other"
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
                        autoComplete="family-name"
                        data-form-type="other"
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
                      autoComplete="organization"
                      data-form-type="other"
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
                      autoComplete="email"
                      data-form-type="other"
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
      {selectedAudience === 'firm' && (
        <section id="content-section" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-4">
              <span className="inline-block bg-[#231e5a] text-white px-4 py-2 rounded-full text-sm font-medium">
                🎯 PE/VC Firms View
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-10">
              You Don't Get Answers—You Get Slide Fatigue
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
                    Every portfolio company reports differently, making comparisons impossible
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    Insights are outdated before the boardroom discussion even begins
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    Boards don't trust the numbers—because data is stitched together manually from tools like Salesforce, NetSuite, and Jira
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    You're spending hours building reports that no one fully believes
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      )}

      {selectedAudience === 'company' && (
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
      {selectedAudience === 'firm' && (
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

      {selectedAudience === 'company' && (
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
      {selectedAudience === 'firm' && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center mb-12">
              What You Get
            </h2>

            <ul className="space-y-6 max-w-4xl mx-auto">
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    <strong>Clarity across the portfolio</strong> — Standardized scorecards make comparisons consistent, fast, and trustworthy
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    <strong>Pre-built visual cards</strong> — Designed to tell the story behind the numbers, not just present them
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    <strong>Executive-level summaries</strong> — Focus attention on what matters: growth, risk, and ROI
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    <strong>Real-time confidence</strong> — Data is validated using AI across marketing plans, pipeline, product usage, and customer health
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    <strong>We know how to tell the story</strong> — Helping PE partners surface the signal, not just the noise—with visuals that delight and inform
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      )}

      {selectedAudience === 'company' && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center mb-12">
              What You Get
            </h2>

            <ul className="space-y-6 max-w-4xl mx-auto">
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    <strong>Faster prep, stronger outcomes</strong> — Cut hours of slide building and get time back for strategy
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    <strong>Pre-built visual cards</strong> — Purpose-built to align your updates with board expectations
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    <strong>Data you can trust</strong> — Machine learning validates your forecast, churn risk, and KPIs
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    <strong>Stay focused on impact</strong> — Spend less time formatting and more time executing
                  </p>
                </div>
              </li>

              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#231e5a] rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm font-bold">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-darkNavy leading-relaxed">
                    <strong>We know how to tell the story</strong> — Give your board confidence with compelling, simple visuals that make your message land
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* Integrations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center mb-12">
            Works With What You Already Use
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {logos.map(({ name, file }) => (
              <div key={name} className="bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                <img 
                  src={`/integrations/${file}`} 
                  alt={name} 
                  className="h-12 w-auto mb-3" 
                />
                <span className="text-sm text-darkNavy text-center">{name}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-darkNavy text-lg">
              And many more integrations coming soon...
            </p>
          </div>
        </div>
      </section>

      {/* Ready to Get Started Section */}
      <section id="ready-to-get-started" className="bg-gray-50 py-20">
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

      <Footer />
    </div>
  )
} 