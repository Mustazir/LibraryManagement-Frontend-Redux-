"use client";

import { BorrowedBookCard } from "@/components/Borrow/BorrowBookCard";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import { BorrowedBookCardSkeleton } from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { BookOpen, RefreshCw } from "lucide-react";

export function BorrowedBooksList() {
  const { data, isLoading, error, refetch } = useGetBorrowSummaryQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <BorrowedBookCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-red-500 text-6xl mb-6">📖</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Failed to load borrowed books
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
            We encountered an error while fetching your borrowed books. Please try again.
          </p>
          <Button onClick={() => refetch()} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const borrowedBooks = data?.data || [];

  if (borrowedBooks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            My Borrowed Books
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your borrowed books and due dates
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No borrowed books yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
            You haven't borrowed any books yet. Visit our library catalog to discover and borrow your next great read!
          </p>
          <Button className="gap-2">
            <BookOpen className="h-4 w-4" />
            Browse Books
          </Button>
        </div>
      </div>
    );
  }

  // Separate books by status for better organization
  const activeBooks = borrowedBooks.filter(borrow => borrow.status !== 'returned');
  const returnedBooks = borrowedBooks.filter(borrow => borrow.status === 'returned');
  const overdueBooks = activeBooks.filter(borrow => {
    const dueDate = new Date(borrow.dueDate);
    const today = new Date();
    return today > dueDate || borrow.status === 'overdue';
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              My Borrowed Books
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {borrowedBooks.length} {borrowedBooks.length === 1 ? 'book' : 'books'} total
              {activeBooks.length > 0 && (
                <span className="ml-2">
                  • {activeBooks.length} active
                  {overdueBooks.length > 0 && (
                    <span className="text-red-600 dark:text-red-400 ml-1">
                      • {overdueBooks.length} overdue
                    </span>
                  )}
                </span>
              )}
            </p>
          </div>
          <Button onClick={() => refetch()} variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Status Summary */}
        {activeBooks.length > 0 && (
          <div className="flex flex-wrap gap-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                {activeBooks.length} Active
              </span>
            </div>
            {overdueBooks.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-red-900 dark:text-red-100">
                  {overdueBooks.length} Overdue
                </span>
              </div>
            )}
            {returnedBooks.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-900 dark:text-green-100">
                  {returnedBooks.length} Returned
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Books Grid */}
      <div className="space-y-8">
        {/* Active Books Section */}
        {activeBooks.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Currently Borrowed
              {overdueBooks.length > 0 && (
                <span className="ml-2 text-sm font-normal text-red-600 dark:text-red-400">
                  ({overdueBooks.length} overdue)
                </span>
              )}
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {activeBooks.map((borrow) => (
                <BorrowedBookCard key={`${borrow._id}-${borrow.book.isbn}`} borrow={borrow} />
              ))}
            </div>
          </div>
        )}

        {/* Returned Books Section */}
        {returnedBooks.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Recently Returned
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {returnedBooks.slice(0, 8).map((borrow) => (
                <BorrowedBookCard key={`${borrow._id}-${borrow.book.isbn}`} borrow={borrow} />
              ))}
            </div>
            {returnedBooks.length > 8 && (
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm">
                  View All Returned Books ({returnedBooks.length})
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}