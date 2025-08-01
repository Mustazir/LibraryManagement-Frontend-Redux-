import App from "@/App";
import AddBookPage from "@/components/Books/AddBook";
import { Books } from "@/pages/Books";

import { createBrowserRouter } from "react-router";


const router=createBrowserRouter([
    {
        path: "/",
        element:<App />,
        children:[
            {
                path:"books",
                element:<Books/>
            },
            {
                path:"add-book",
                element:<AddBookPage/>
            }
        ]
    }
])


export default router;