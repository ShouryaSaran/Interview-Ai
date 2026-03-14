import {createBrowserRouter} from "react-router"
import Register from "./Features/auth/pages/Register"
import Login from "./Features/auth/pages/Login"
import Protected from "./Features/auth/components/Protected"
import Home from './Features/interview/pages/Home'
import Dashboard from "./Features/interview/pages/dashboard.jsx"
export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element:<Register />
    },
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/dashboard",
        element: <Protected><Dashboard></Dashboard></Protected>
    }
])

