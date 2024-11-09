export function ImageSection() {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 bg-cover bg-center"
      style={{
        backgroundImage: "url(/login-bg.avif)",
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Manage Your Events
          </h2>
          <p className="text-xl text-white/80">
            Streamline your event planning process
          </p>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FormSection({ Form }:any) {
  return (
    <div className="flex flex-col justify-center items-center w-full p-4 sm:p-8 lg:w-1/2 lg:p-12 bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <h1 className="text-4xl font-bold text-white">Event Manager</h1>
          <p className="text-xl text-white/80">
            Plan, organize, and execute with ease
          </p>
        </div>
        <Form />
      </div>
    </div>
  );
}
