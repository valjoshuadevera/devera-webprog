import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import DashLayout from './layouts/DashLayout'; // New Layout

// Landing Pages
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import ArticlePage from './pages/LandingPages/ArticlePage';

// Auth Pages
import SignInPage from './pages/authPages/SignInPage';
import SignUpPage from './pages/authPages/SignUpPage';

// Dashboard Pages
import DashboardPage from './pages/DashboarPages/Dashboardpages'; // New Page
import ReportsPage from './pages/DashboarPages/ReportsPage';     // New Page
import UsersPage from './pages/DashboarPages/UsersPage';         // New Page

// Error Page
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  // --- Landing / Main Routes ---
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <HomePage /> }, // Using empty string for index
      { path: 'about', element: <AboutPage /> },
      { path: 'articles', element: <ArticleListPage /> },
      { path: 'articles/:name', element: <ArticlePage /> },
    ],
  },

  // --- Auth Routes ---
  {
    path: 'auth',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: 'signin', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage /> },
    ],
  },

  // --- Dashboard Routes ---
  {
    path: 'dashboard',
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <DashboardPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'users', element: <UsersPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;