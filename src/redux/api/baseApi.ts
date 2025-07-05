import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
    reducerPath:"baseApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://library-management-mu-six.vercel.app/api"}),
    endpoints:(builder) =>({
        getAllBooks : builder.query({
            query:()=>'/books'
        }),
    })
})


export const { useGetAllBooksQuery } =baseApi