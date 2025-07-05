import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-mu-six.vercel.app/api",
  }),
  tagTypes: ["books", "borrow", "borrowBooks"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    createBooks: builder.mutation({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["books"],
    }),
    getBookByID: builder.query({
      query: (id) => `books/${id}`,
    }),
    borrowBook: builder.mutation({
      query: (borrow) => ({
        url: "/borrow",
        method: "POST",
        body: borrow,
      }),
      invalidatesTags: ["books", "borrow", "borrowBooks"],
    }),

    getAllBorrowBooks: builder.query({
      query: () => "/borrow",
      providesTags: ["borrowBooks"],
    }),

    deleteBorrowBook: builder.mutation({
      query: (id) => ({
        url: `/borrow/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books", "borrow", "borrowBooks"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useCreateBooksMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGetBookByIDQuery,
  useBorrowBookMutation,
  useGetAllBorrowBooksQuery,
  useDeleteBorrowBookMutation,
} = baseApi;
