import App from "@/App";
import Books from "@/pages/Books";
import { createBrowserRouter } from "react-router";


const router=createBrowserRouter([
    {
        path: "/",
        element:<App />,
        children:[
            {
                path:"books",
                element:<Books/>



            }
        ]
    }
])


export default router;