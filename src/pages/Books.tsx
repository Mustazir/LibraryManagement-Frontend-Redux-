"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetBooksQuery, useDeletBookMutation } from "@/redux/api/baseApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown, X, Loader2, Trash2 } from "lucide-react";
import type { IBook } from "@/type";
import { UpdateBooks } from "@/components/Books/UpdateBooks";
import { BorrowBook } from "@/components/Borrow/BorrowBook";
import { BookTableSkeleton } from "@/components/ui/loading";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";

// Search Recommendations Component
const SearchRecommendations = ({
  books,
  searchTerm,
  onSelectBook,
  isVisible
}: {
  books: IBook[];
  searchTerm: string;
  onSelectBook: (book: IBook) => void;
  isVisible: boolean;
}) => {
  const recommendations = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];

    return books
      .filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 5); // Show max 5 recommendations
  }, [books, searchTerm]);

  if (!isVisible || recommendations.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
      {recommendations.map((book) => (
        <div
          key={book._id}
          className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b last:border-b-0"
          onClick={() => onSelectBook(book)}
        >
          <div className="font-medium text-sm">{book.title}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            by {book.author} • {book.genre} • ISBN: {book.isbn}
          </div>
        </div>
      ))}
    </div>
  );
};

// Filter Panel Component
const FilterPanel = ({
  genreFilter,
  setGenreFilter,
  availabilityFilter,
  setAvailabilityFilter,
  onClearFilters,
  books
}: {
  genreFilter: string;
  setGenreFilter: (value: string) => void;
  availabilityFilter: string;
  setAvailabilityFilter: (value: string) => void;
  onClearFilters: () => void;
  books: IBook[];
}) => {
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(books.map(book => book.genre))];
    return uniqueGenres.sort();
  }, [books]);

  const hasActiveFilters = genreFilter !== "" || availabilityFilter !== "";

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <Select value={genreFilter || "all"} onValueChange={(value) => setGenreFilter(value === "all" ? "" : value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Genres" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={availabilityFilter || "all"} onValueChange={(value) => setAvailabilityFilter(value === "all" ? "" : value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All Books" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Books</SelectItem>
          <SelectItem value="available">Available Only</SelectItem>
          <SelectItem value="unavailable">Unavailable Only</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4 mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export function Books() {
  const { data, isLoading, error, refetch } = useGetBooksQuery(undefined);
  const [deleteBook, { isLoading: isDeleting }] = useDeletBookMutation();

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);

  // Table States
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setDeletingBookId(id);
      try {
        await deleteBook(id).unwrap();
        toast.success("Book deleted successfully!");
        // Optionally refetch data to ensure UI is updated
        refetch();
      } catch (err: any) {
        console.error("Delete failed:", err);
        toast.error(err?.data?.message || "Failed to delete book. Please try again.");
      } finally {
        setDeletingBookId(null);
      }
    }
  };

  // Filter books based on search and filters
  const filteredBooks = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((book: IBook) => {
      // Search filter
      const matchesSearch = searchTerm === "" ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Genre filter
      const matchesGenre = genreFilter === "" || book.genre === genreFilter;

      // Availability filter
      const matchesAvailability = availabilityFilter === "" ||
        (availabilityFilter === "available" && book.available) ||
        (availabilityFilter === "unavailable" && !book.available);

      return matchesSearch && matchesGenre && matchesAvailability;
    });
  }, [data?.data, searchTerm, genreFilter, availabilityFilter]);

  const columns: ColumnDef<IBook>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Title
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "author",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Author
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
    },
    {
      accessorKey: "genre",
      header: "Genre",
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {row.getValue("genre")}
        </span>
      ),
    },
    { accessorKey: "isbn", header: "ISBN" },
    {
      accessorKey: "copies",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold hover:bg-transparent"
        >
          Copies
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
    },
    {
      accessorKey: "available",
      header: "Availability",
      cell: ({ row }) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.original.available
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
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
        const isCurrentlyDeleting = deletingBookId === book._id;

        return (
          <div className="flex gap-2 whitespace-nowrap">
            <UpdateBooks book={book} />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(book._id, book.title)}
              disabled={isCurrentlyDeleting || isDeleting}
            >
              {isCurrentlyDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </>
              )}
            </Button>
            <BorrowBook book={book} />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredBooks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleSelectBook = (book: IBook) => {
    setSelectedBook(book);
    setSearchTerm(book.title);
    setShowRecommendations(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedBook(null);
  };

  const clearAllFilters = () => {
    setGenreFilter("");
    setAvailabilityFilter("");
    setSearchTerm("");
    setSelectedBook(null);
  };

  // Close recommendations when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-container')) {
        setShowRecommendations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) return <BookTableSkeleton />;

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">📚</div>
          <p className="text-red-500 text-lg">Error loading books</p>
          <p className="text-gray-500 text-sm">Please try refreshing the page</p>
          <Button
            onClick={() => refetch()}
            className="mt-4"
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Library Books
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredBooks.length} of {data?.data?.length || 0} books
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container relative max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search books by title, author, or ISBN..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowRecommendations(true);
                setSelectedBook(null);
              }}
              onFocus={() => setShowRecommendations(true)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <SearchRecommendations
            books={data?.data || []}
            searchTerm={searchTerm}
            onSelectBook={handleSelectBook}
            isVisible={showRecommendations}
          />
        </div>

        {/* Filters */}
        <FilterPanel
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
          availabilityFilter={availabilityFilter}
          setAvailabilityFilter={setAvailabilityFilter}
          onClearFilters={clearAllFilters}
          books={data?.data || []}
        />

        {/* Selected Book Highlight */}
        {selectedBook && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Selected: {selectedBook.title}
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  by {selectedBook.author} • {selectedBook.genre}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedBook(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px] rounded-md border">
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
                    <TableRow
                      key={row.id}
                      className={
                        selectedBook && row.original._id === selectedBook._id
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : ""
                      }
                    >
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
                      {searchTerm || genreFilter || availabilityFilter ? (
                        <div className="space-y-2">
                          <p>No books found matching your criteria.</p>
                          <Button variant="outline" size="sm" onClick={clearAllFilters}>
                            Clear all filters
                          </Button>
                        </div>
                      ) : (
                        "No books found."
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              filteredBooks.length
            )}{" "}
            of {filteredBooks.length} results
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}