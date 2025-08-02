import App from "@/App";
import AddBookPage from "@/pages/AddBook";
import { Books } from "@/pages/Books";
import { BorrowedBooksList } from "@/pages/BorrowedBooksList";
import HomePage from "@/pages/HomePage";

import { createBrowserRouter } from "react-router";


const router=createBrowserRouter([
    {
        path: "/",
        element:<App />,
        children:[
            {
                path:"/",
                element:<HomePage/>
            },
            {
                path:"books",
                element:<Books/>
            },
            {
                path:"add-book",
                element:<AddBookPage/>
            },
            {
                path:"borrow-summary",
                element: <BorrowedBooksList/>
            }
        ]
    }
])


export default router;