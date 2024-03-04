'use client'

import React, { useEffect } from 'react'

export default function NotFound  ({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
      }, [error])

  return (
    <div className='bg-[#fcfcfc]'>
      <h1 >not-found</h1>
      
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}

