import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import {
  Welcome,
  Search,
  Feed,
  Profile,
  Register,
  Login,
  Post,
  EmailConfirmation,
  Chat,
  Conversations,
} from './pages';
import { UserProvider } from './context/UserContext.tsx';
import './main.css';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';
import { PhotoSelection } from './components/index.ts';

const routes: RouteObject[] = [
  {
    element: <App />,
    errorElement: <div>error</div>,
    children: [
      { path: '/', element: <Welcome /> },
      { path: '/search', element: <Search /> },
      { path: '/profile/:userId', element: <Profile /> },
      { path: '/feed', element: <Feed /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/post', element: <Post /> },
      { path: '/photo-selection', element: <PhotoSelection /> },
      { path: '/profile-photo-selection', element: <PhotoSelection /> },
      { path: '/email-confirmation', element: <EmailConfirmation /> },
      { path: '/chat/:receiverId', element: <Chat /> },
      { path: '/conversation/:userId', element: <Conversations /> },
    ],
  },
];

const route = createBrowserRouter(routes);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={route} />
    </UserProvider>
  </StrictMode>,
);
