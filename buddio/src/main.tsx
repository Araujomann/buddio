import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { Welcome, Search, Feed, Profile, Register, Login, Post } from "./pages";
import "./main.css";
import {
    createBrowserRouter,
    RouterProvider,
    RouteObject,
} from "react-router-dom";
import { PhotoSelection } from "./components/index.ts";

const routes: RouteObject[] = [
    {
        element: <App />,
        errorElement: <div>error</div>,
        children: [
            { path: "/", element: <Welcome /> },
            { path: "/search", element: <Search /> },
            { path: "/profile/:userId", element: <Profile  /> },
            { path: "/feed", element: <Feed /> },
            { path: "/register", element: <Register /> },
            {path: "/login", element: <Login />},
            {path: "/post", element: <Post/>},
            {path: "/photo-selection", element: <PhotoSelection/>},
        ],
    },
];

const route = createBrowserRouter(routes);
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={route} />
    </StrictMode>
);
