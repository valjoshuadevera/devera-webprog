import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout
import Layout from "./layouts/layout";

// Pages
import HomePage from "./pages/LandingPages/Homepage";
import AboutPage from "./pages/LandingPages/AboutPage";
import ArticlePage from "./pages/LandingPages/ArticlePage";
import ArticleListPage from "./pages/LandingPages/ArticleListPage";
import NotFoundPage from "./pages/NotFoundPage";

import SignInPage from "./pages/authPages/SignInPage";
import SignUpPage from "./pages/authPages/SignUpPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "articles",
        element: <ArticleListPage />,
      },
      {
        path: "articles/:name",
        element: <ArticlePage />,
      },

      // ✅ ADD AUTH ROUTES HERE
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;