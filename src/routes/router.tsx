import App from "@/App";
import { createBrowserRouter } from "react-router";


const router=createBrowserRouter([
    {
        path: "/",
        element:<App />,
        children:[
            {
                path:"Books",
                element:<>
                <h1>Books</h1>
                </>

            }
        ]
    }
])


export default router;