import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 px-4 text-center">
      <div className="space-y-4 mb-8">
        <svg
          className="w-16 h-16 text-white mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <h1 className="text-4xl font-bold text-white">Event Manager</h1>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">404 - Page Not Found</h2>
        <p className="text-gray-600 mb-6">Oops! It seems the event you&apos;re looking for has been cancelled or rescheduled.</p>
        
        <div className="flex flex-col space-y-4">
          <Button variant={'outline'} asChild>
            <Link href="/" className="flex items-center justify-center">
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return to Homepage
            </Link>
          </Button>
         
        </div>
      </div>
      
      <p className="mt-8 text-white text-sm">
        Need help? <Link href="/contact" className="underline hover:text-gray-200">Contact our support team</Link>
      </p>
    </div>
  )
}