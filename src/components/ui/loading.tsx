// components/ui/loading.tsx

import React from 'react';

// Define types for better TypeScript support
type LoaderSize = 'small' | 'default' | 'large';

interface BookLoaderProps {
  size?: LoaderSize;
  message?: string;
}

interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading: boolean;
}

// Book-themed loader
export const BookLoader: React.FC<BookLoaderProps> = ({ size = 'default', message = 'Loading...' }) => {
  const sizeClasses: Record<LoaderSize, string> = {
    small: 'w-8 h-8',
    default: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} relative`}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md transform rotate-3 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-md transform -rotate-3 animate-pulse delay-150"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-md animate-pulse delay-300"></div>

          <div className="absolute inset-2 bg-white rounded-sm">
            <div className="absolute inset-1 space-y-1">
              <div className="h-1 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-1 bg-gray-300 rounded animate-pulse delay-100"></div>
              <div className="h-1 bg-gray-300 rounded animate-pulse delay-200"></div>
            </div>
          </div>
        </div>

        <div className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300"></div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 animate-pulse">{message}</p>
    </div>
  );
};

// Page loader
export const PageLoader: React.FC<PageLoaderProps> = ({ message = 'Loading...', fullScreen = false }) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center'
    : 'flex items-center justify-center py-12';

  return (
    <div className={containerClasses}>
      <BookLoader size="large" message={message} />
    </div>
  );
};

// Table skeleton
export const BookTableSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Header skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          </div>
        </div>

        {/* Search bar skeleton */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-full max-w-md animate-pulse"></div>

        {/* Filters skeleton */}
        <div className="flex gap-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>

        {/* Table skeleton */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px] border rounded-lg overflow-hidden">
            {/* Header skeleton */}
            <div className="border-b bg-gray-50 dark:bg-gray-800">
              <div className="flex">
                {['Title', 'Author', 'Genre', 'ISBN', 'Copies', 'Availability', 'Actions'].map((_, index) => (
                  <div key={`header-${index}`} className="flex-1 p-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row skeletons */}
            {Array.from({ length: 8 }).map((_, rowIndex) => (
              <div key={`row-${rowIndex}`} className="border-b last:border-b-0">
                <div className="flex">
                  {Array.from({ length: 7 }).map((_, cellIndex) => (
                    <div key={`cell-${rowIndex}-${cellIndex}`} className="flex-1 p-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Card skeleton
export const BorrowedBookCardSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-lg p-4 shadow-md rounded-xl border bg-white dark:bg-gray-800">
      <div className="space-y-3">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  );
};

// Button with loading
export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  isLoading,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={`${className} relative overflow-hidden transition-all duration-200 ${
        isLoading ? 'opacity-80 cursor-not-allowed' : ''
      }`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      )}
      <span className={isLoading ? 'invisible' : 'visible'}>
        {children}
      </span>
    </button>
  );
};