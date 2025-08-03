'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface EarlyAccessFormData {
  firstName: string
  lastName: string
  company: string
  email: string
}

interface EarlyAccessFormProps {
  className?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function EarlyAccessForm({ 
  className = '', 
  onSuccess, 
  onError 
}: EarlyAccessFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EarlyAccessFormData>()

  const onSubmit = async (data: EarlyAccessFormData) => {
    setIsSubmitting(true)
    setSubmitError('')

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
        reset()
        onSuccess?.()
      } else {
        throw new Error(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error. Please try again.'
      setSubmitError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            {...register('firstName', { 
              required: 'First name is required',
              minLength: { value: 2, message: 'First name must be at least 2 characters' }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            {...register('lastName', { 
              required: 'Last name is required',
              minLength: { value: 2, message: 'Last name must be at least 2 characters' }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Company *
        </label>
        <input
          id="company"
          type="text"
          {...register('company', { 
            required: 'Company name is required',
            minLength: { value: 2, message: 'Company name must be at least 2 characters' }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter your company name"
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {submitError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
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
  )
} 