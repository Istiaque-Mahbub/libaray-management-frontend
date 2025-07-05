import App from "@/App";
import BookDetails from "@/modules/books/BookDetails";
import { UpdateBookModal } from "@/modules/books/UpdateBookModal";
import AddBooks from "@/pages/AddBooks";
import AllBooks from "@/pages/AllBooks";
import BorrowBooks from "@/pages/BorrowBooks";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
        children: [
            {
                index: true,
                element: <AllBooks></AllBooks>
            },

            {
                path: "allBooks",
                element: <AllBooks></AllBooks>
            },
            {
                path: "addBooks",
                element: <AddBooks></AddBooks>
            },

            {
                path: "borrowBooks",
                element: <BorrowBooks></BorrowBooks>
            },
            {
                path: "/edit-book/:id",
                element: <UpdateBookModal></UpdateBookModal>
            },
            {
                path: "/books/:id",
                element: <BookDetails></BookDetails>
            },

        ]
    }
])

export default router