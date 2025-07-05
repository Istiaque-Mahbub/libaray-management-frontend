import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
    reducerPath:"baseApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://library-management-mu-six.vercel.app/api"}),
    endpoints:(builder) =>({
        getAllBooks : builder.query({
            query:()=>'/books'
        }),
        createBooks : builder.mutation({
            query:(book)=>({
                url:"/books",
                method:"POST",
                body:book
            })
        })
    })
})


export const { useGetAllBooksQuery,useCreateBooksMutation } =baseApi