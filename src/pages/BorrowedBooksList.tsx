"use client";

import { BorrowedBookCard } from "@/components/Borrow/BorrowBookCard";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";

export function BorrowedBooksList() {
  const { data, isLoading, error } = useGetBorrowSummaryQuery();

  if (isLoading) return <p>Loading borrowed books...</p>;
  if (error)
    return <p className="text-red-500">Failed to load borrowed books.</p>;

  return (
   <div className="flex items-center justify-center px-4  my-4 lg:my-8">
     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.data?.map((borrow) => (
        <BorrowedBookCard key={borrow.book.isbn} borrow={borrow} />
      ))}
    </div>
   </div>
  );
}
