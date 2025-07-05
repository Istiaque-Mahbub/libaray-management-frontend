import App from "@/App";
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

        ]
    }
])

export default router