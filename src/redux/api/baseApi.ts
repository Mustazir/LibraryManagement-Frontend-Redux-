import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Books", "BorrowSummary"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    updatedBook: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Books"],
    }),
    // ✅ Add optimistic updates to your API
    deletBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      // Optimistic update
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          baseApi.util.updateQueryData("getBooks", undefined, (draft) => {
            draft.data = draft.data.filter((book) => book._id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Books"],
    }),
    borrowBook: builder.mutation({
      query: (payload) => ({
        url: "/borrow",
        method: "POST",
        body: payload, // { book: bookId, quantity: number }
      }),
      invalidatesTags: ["Books", "BorrowSummary"],
    }),

    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["Books", "BorrowSummary"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useUpdatedBookMutation,
  useDeletBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = baseApi;
