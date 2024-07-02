'use client'

import React, { useEffect } from 'react'

export default function Error  ({
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
      <div  className='' style={{fontSize: '2.25rem'}} >Something went wrong!</div>
      
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

