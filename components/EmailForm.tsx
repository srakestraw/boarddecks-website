import React from 'react'
import { useForm } from 'react-hook-form'
import Button from './Button'

interface EmailFormData {
  email: string
}

interface EmailFormProps {
  className?: string
  onSubmit?: (data: EmailFormData) => void
  placeholder?: string
  buttonText?: string
}

export default function EmailForm({
  className = '',
  onSubmit,
  placeholder = 'Enter your email',
  buttonText = 'Subscribe'
}: EmailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<EmailFormData>()

  const handleFormSubmit = (data: EmailFormData) => {
    if (onSubmit) {
      onSubmit(data)
    } else {
      console.log('Email submitted:', data.email)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <div className="flex-1">
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="sm:w-auto"
      >
        {isSubmitting ? 'Subscribing...' : buttonText}
      </Button>
    </form>
  )
} 