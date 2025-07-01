import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AllProducts from "../Pages/AllProducts";
import PrivateRouter from "./PrivateRouter";
import AddProduct from "../Pages/AddProduct";
import MyProducts from "../Pages/MyProducts";
import HomePage from "../Pages/HomePage";
import About from "../Pages/About";
import ProductDetails from "../Pages/ProductDetails";
import Loading from "../Components/Loading";
import CartPage from "../Pages/CartPage";
import MyOrders from "../Pages/MyOrders";
import Profile from "../Pages/Profile";
import Dashboard from "../Pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>
            },
            {
                path: '/category/:categoryName',
                hydrateFallbackElement: <Loading></Loading>,
                loader: () => fetch('https://assignment-11-server-lake-three.vercel.app/products'),
                element: <PrivateRouter><AllProducts></AllProducts></PrivateRouter>
            },
            {
                path: '/productDetails/:id',
                hydrateFallbackElement: <Loading></Loading>,
                element: <PrivateRouter><ProductDetails></ProductDetails></PrivateRouter>,
                loader: ({ params }) => fetch(`https://assignment-11-server-lake-three.vercel.app/product/${params.id}`)
            },
            {
                path: '/addProduct',
                element: <PrivateRouter><AddProduct></AddProduct></PrivateRouter>
            },
            {
                path: '/myProducts',
                element: <PrivateRouter><MyProducts></MyProducts></PrivateRouter>
            },
            {
                path: '/aboutUs',
                element: <About></About>
            },
            {
                path: '/cart',
                element: <PrivateRouter><CartPage></CartPage></PrivateRouter>
            },
            {
                path: '/myOrders',
                element: <PrivateRouter><MyOrders></MyOrders></PrivateRouter>
            },
            {
                path: '/profile',
                element: <PrivateRouter><Profile></Profile></PrivateRouter>
            },
            {
                path: '/dashboard',
                element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>
            }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    }
])