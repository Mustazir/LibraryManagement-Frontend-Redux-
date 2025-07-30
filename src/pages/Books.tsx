"use client"

import { Button } from "@/components/ui/button"
import { useGetBooksQuery } from "@/redux/api/baseApi"
import type { IBook } from "@/type"
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from './../../node_modules/@tanstack/react-table/src/index';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";



// 1. Define your Book type


// 2. Table Columns
export const columns: ColumnDef<IBook>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },
  {
    accessorKey: "copies",
    header: "Copies",
  },
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
    cell: ({ row }) => {
      const book = row.original
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => console.log("Edit", book._id)}>📝</Button>
          <Button variant="destructive" size="sm" onClick={() => console.log("Delete", book._id)}>❌</Button>
          <Button variant="default" size="sm" onClick={() => console.log("Borrow", book._id)}>📦</Button>
        </div>
      )
    },
  },
]

// 3. Component
export function Books() {
  const { data, isLoading, error } = useGetBooksQuery(undefined, {
    pollingInterval: 10000,
  })

  const table = useReactTable({
    data: data?.data || [], // 👈 Your API returns `data: { data: [...] }`
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading books</p>

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24">
                  No books found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
