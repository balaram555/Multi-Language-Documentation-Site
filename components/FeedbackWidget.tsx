'use client'
import { useState } from 'react'

export default function FeedbackWidget() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div>
      <textarea data-testid="feedback-input" />
      <button
        data-testid="feedback-submit"
        onClick={() => setSubmitted(true)}
      >
        Submit
      </button>

      {submitted && (
        <div data-testid="feedback-success-message">
          Thank you!
        </div>
      )}
    </div>
  )
}
