"use client";

import { Button } from "@/components/ui/button";
import { useGetBooksQuery, useDeletBookMutation } from "@/redux/api/baseApi";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,

} from "@tanstack/react-table";

import type { IBook } from "@/type";
import { UpdateBooks } from "@/components/Books/UpdateBooks";
import { BorrowBook } from "@/components/Borrow/BorrowBook";

export function Books() {
  const { data, isLoading, error } = useGetBooksQuery(undefined);

  const [deleteBook] = useDeletBookMutation();


  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      console.log("Deleted:", id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };



  const columns: ColumnDef<IBook>[] = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "author", header: "Author" },
    { accessorKey: "genre", header: "Genre" },
    { accessorKey: "isbn", header: "ISBN" },
    { accessorKey: "copies", header: "Copies" },
    {
      accessorKey: "available",
      header: "Availability",
      cell: ({ row }) => (
        <span
          className={`font-medium ${
            row.original.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {row.original.available ? "Available" : "Unavailable"}
        </span>
      ),
    },
    {
  id: "actions",
  header: "Actions",
  cell: ({ row }) => {
    const book = row.original;
    return (
      <div className="flex flex-wrap gap-2">
        <UpdateBooks book={book} />
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDelete(book._id)}
        >
          DEL
        </Button>


          <BorrowBook book={book} />

      </div>
    );
  },
}
  ];

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <p className="text-center py-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-6">Error loading books</p>;

  return (
    <>
      <div className="flex justify-center p-4">

      </div>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-7xl overflow-x-auto">
          <div className="min-w-[700px] rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-sm md:text-base whitespace-nowrap">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-xs md:text-sm whitespace-nowrap">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-8">
                      No books found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
