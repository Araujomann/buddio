import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { Login, Search, Feed, Profile } from "./pages";
import "./main.css";
import {
    createBrowserRouter,
    RouterProvider,
    RouteObject,
} from "react-router-dom";

const routes: RouteObject[] = [
    {
        element: <App />,
        errorElement: <div>error</div>,
        children: [
            { path: "/", element: <Login /> },
            { path: "/search", element: <Search /> },
            { path: "/profile", element: <Profile /> },
            { path: "/feed", element: <Feed /> },
        ],
    },
];

const route = createBrowserRouter(routes);
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={route} />
    </StrictMode>
);
